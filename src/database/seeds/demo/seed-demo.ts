import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cart } from 'src/entities/cart.entity';
import { Category } from 'src/entities/category.entity';
import { Message } from 'src/entities/chatbox.entity';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { Orders } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/user.entity';
import { GenderEnum, PaymentMethod, RoleEnum, StatusDelivery } from 'src/common/enum/enum';
import {
  DEMO_CATEGORIES,
  DEMO_CONVERSATIONS,
  DEMO_CUSTOMERS,
  DEMO_PRODUCTS,
  DEMO_REVIEWS,
  DEMO_STREETS,
  DEMO_AVATARS,
} from './demo-data';

const DAY = 24 * 60 * 60 * 1000;
const HISTORY_DAYS = 180; // Đơn hàng trải dài 6 tháng gần nhất

export const DEMO_ACCOUNTS = {
  admin: { userName: 'admin', password: '12344' },
  customer: { userName: 'Loc', password: '123' },
  otherCustomers: { password: '123456', note: 'Các khách hàng còn lại (vd: nguyenvanan) dùng chung mật khẩu này' },
};

/** Random có seed cố định: chạy lại luôn ra cùng một bộ dữ liệu → demo ổn định */
function createRandom(seed: number) {
  let a = seed;
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1));
  const pick = <T>(arr: T[]) => arr[Math.floor(next() * arr.length)];
  const weighted = <T>(items: T[], weight: (x: T) => number) => {
    const total = items.reduce((s, x) => s + weight(x), 0);
    let r = next() * total;
    for (const x of items) {
      r -= weight(x);
      if (r <= 0) return x;
    }
    return items[items.length - 1];
  };
  return { next, int, pick, weighted, chance: (p: number) => next() < p };
}

const phoneFor = (i: number) => `09${String(12345678 + i * 7919).slice(-8)}`;

/** Trạng thái đơn theo "tuổi" đơn: đơn cũ phần lớn đã giao xong, đơn mới còn đang xử lý */
function statusForAge(ageDays: number, rnd: ReturnType<typeof createRandom>): StatusDelivery {
  const r = rnd.next();
  if (ageDays > 10) return r < 0.88 ? StatusDelivery.SUCCESS : StatusDelivery.CANCELLED;
  if (ageDays > 3) {
    if (r < 0.6) return StatusDelivery.SUCCESS;
    if (r < 0.88) return StatusDelivery.DELIVERING;
    return StatusDelivery.CANCELLED;
  }
  if (r < 0.45) return StatusDelivery.PENDING;
  if (r < 0.75) return StatusDelivery.DELIVERING;
  if (r < 0.95) return StatusDelivery.SUCCESS;
  return StatusDelivery.CANCELLED;
}

/** Xoá toàn bộ dữ liệu theo thứ tự khoá ngoại (bảng con trước, bảng cha sau) */
async function clearAll(manager: EntityManager) {
  for (const entity of [Message, Review, Cart, OrderDetail, Orders, Product, Category, User]) {
    await manager.createQueryBuilder().delete().from(entity).execute();
  }
}

export async function seedDemo(manager: EntityManager) {
  const rnd = createRandom(20241108);
  const now = Date.now();

  await clearAll(manager);

  // ---------- Danh mục & sản phẩm ----------
  const categories = await manager.save(
    DEMO_CATEGORIES.map((c) => manager.create(Category, { name: c.name, iconUrl: c.iconUrl })),
  );
  const categoryIdByKey = Object.fromEntries(DEMO_CATEGORIES.map((c, i) => [c.key, categories[i].id]));

  const products = await manager.save(
    DEMO_PRODUCTS.map(({ category, popularity, ...p }) =>
      manager.create(Product, { ...p, categoryId: categoryIdByKey[category] }),
    ),
  );
  const popularity = new Map(products.map((p, i) => [p.id, DEMO_PRODUCTS[i].popularity]));

  // ---------- Người dùng ----------
  const hash = (pw: string) => bcrypt.hash(pw, 10);
  const customerPassword = await hash(DEMO_ACCOUNTS.otherCustomers.password);

  const admin = manager.create(User, {
    userName: DEMO_ACCOUNTS.admin.userName,
    password: await hash(DEMO_ACCOUNTS.admin.password),
    email: 'doanthuthao091203@gmail.com',
    gender: GenderEnum.FEMALE,
    address: '135 Nguyễn Phước Nguyên, Thanh Khê, Đà Nẵng',
    phoneNumber: '0905123456',
    avatar: DEMO_AVATARS.admin,
    role: RoleEnum.ADMIN,
  });
  const loc = manager.create(User, {
    userName: DEMO_ACCOUNTS.customer.userName,
    password: await hash(DEMO_ACCOUNTS.customer.password),
    email: 'huynhngochoangloc0211102@gmail.com',
    gender: GenderEnum.MALE,
    address: '135 Nguyễn Phước Nguyên, Thanh Khê, Đà Nẵng',
    phoneNumber: '0905654321',
    avatar: DEMO_AVATARS.male[0],
    role: RoleEnum.USER,
  });
  const others = DEMO_CUSTOMERS.map(([userName, , gender, city], i) =>
    manager.create(User, {
      userName,
      password: customerPassword,
      email: `${userName}@gmail.com`,
      gender: gender === 'male' ? GenderEnum.MALE : GenderEnum.FEMALE,
      address: `${rnd.pick(DEMO_STREETS)}, ${city}`,
      phoneNumber: phoneFor(i),
      // Mỗi khách một avatar 3D khác nhau, theo giới tính
      avatar: DEMO_AVATARS[gender][(i + 1) % DEMO_AVATARS[gender].length],
      role: RoleEnum.USER,
      // Ngày đăng ký rải đều trong 7 tháng
      createdAt: new Date(now - rnd.int(5, HISTORY_DAYS + 30) * DAY),
    }),
  );
  // Khoá 5 tài khoản (khách "bom hàng") để demo chức năng block / unblock user
  others.slice(-5).forEach((u) => (u.isBlock = true));

  const [savedAdmin, ...customers] = await manager.save([admin, loc, ...others]);
  const fullNameOf = new Map<string, string>([[customers[0].id, 'Huỳnh Ngọc Hoàng Lộc']]);
  DEMO_CUSTOMERS.forEach(([, fullName], i) => fullNameOf.set(customers[i + 1].id, fullName));
  const activeCustomers = customers.filter((c) => !c.isBlock);
  const blockedCustomers = customers.filter((c) => c.isBlock);

  // ---------- Đơn hàng ----------
  // Ngày tạo đơn: nhiều hơn ở giai đoạn gần đây (doanh số tăng trưởng),
  // và mỗi ngày trong 14 ngày gần nhất đều có đơn để biểu đồ tuần luôn có số liệu.
  const orderTimes: Array<{ t: number; forceSuccess?: boolean }> = [];
  for (let i = 0; i < 170; i++) {
    const age = Math.floor(HISTORY_DAYS * Math.pow(rnd.next(), 1.6));
    orderTimes.push({ t: now - age * DAY - rnd.int(0, 12) * 60 * 60 * 1000 });
  }
  for (let d = 0; d < 14; d++) {
    const perDay = rnd.int(1, 3);
    for (let k = 0; k < perDay; k++) {
      // Đơn đầu tiên mỗi ngày luôn "Success" để biểu đồ doanh thu tuần không có ngày trống
      // Giờ đặt đơn nằm trong chính ngày đó (8h–21h); riêng hôm nay thì từ 0h tới thời điểm seed
      const dayStart = new Date(now - d * DAY);
      dayStart.setHours(0, 0, 0, 0);
      const from = d === 0 ? dayStart.getTime() : dayStart.getTime() + 8 * 60 * 60 * 1000;
      const to = d === 0 ? now - 60 * 1000 : dayStart.getTime() + 21 * 60 * 60 * 1000;
      orderTimes.push({ t: from + Math.floor(rnd.next() * (to - from)), forceSuccess: k === 0 });
    }
  }
  orderTimes.sort((a, b) => a.t - b.t);

  const orders: Orders[] = [];
  for (const { t, forceSuccess } of orderTimes) {
    const createdAt = new Date(Math.min(t, now - 60 * 1000));
    const ageDays = (now - createdAt.getTime()) / DAY;
    // Khách quen (đầu danh sách) mua nhiều hơn
    // Tài khoản bị khoá chỉ có đơn cũ (trước khi bị khoá) và phần lớn là đơn bị huỷ
    const isBlockedBuyer = ageDays > 20 && !forceSuccess && rnd.chance(0.12);
    const customer = isBlockedBuyer
      ? rnd.pick(blockedCustomers)
      : rnd.weighted(activeCustomers, (c) => (activeCustomers.indexOf(c) < 8 ? 3 : 1));

    const itemCount = rnd.weighted([1, 2, 3], (n) => ({ 1: 78, 2: 18, 3: 4 })[n]);
    const chosen = new Set<Product>();
    while (chosen.size < itemCount) chosen.add(rnd.weighted(products, (p) => popularity.get(p.id)));

    const details = [...chosen].map((p) =>
      manager.create(OrderDetail, { productId: p.id, price: p.price, quantity: rnd.chance(0.1) ? 2 : 1, createdAt }),
    );

    orders.push(
      manager.create(Orders, {
        userId: customer.id,
        date: createdAt,
        name: fullNameOf.get(customer.id),
        email: customer.email,
        phoneNumber: String(customer.phoneNumber),
        shippingAddress: customer.address,
        price: details.reduce((s, d) => s + d.price * d.quantity, 0),
        paymentMethod: rnd.chance(0.35) ? PaymentMethod.ZALOPAY : PaymentMethod.CASH_ON_DELIVERY,
        statusDelivery: forceSuccess
          ? StatusDelivery.SUCCESS
          : isBlockedBuyer
            ? rnd.chance(0.75) ? StatusDelivery.CANCELLED : StatusDelivery.SUCCESS
            : statusForAge(ageDays, rnd),
        orderDetail: details,
        createdAt,
      }),
    );
  }
  const savedOrders = await manager.save(orders, { chunk: 50 });

  // ---------- Đánh giá (chỉ cho đơn đã giao thành công) ----------
  const reviews: Review[] = [];
  for (const order of savedOrders) {
    if (order.statusDelivery !== StatusDelivery.SUCCESS) continue;
    for (const detail of order.orderDetail) {
      if (!rnd.chance(0.7)) continue;
      const rating = rnd.weighted([5, 4, 3, 2], (r) => ({ 5: 58, 4: 29, 3: 10, 2: 3 })[r]);
      const date = new Date(Math.min(order.createdAt.getTime() + rnd.int(3, 12) * DAY, now - 60 * 60 * 1000));
      reviews.push(
        manager.create(Review, {
          productId: detail.productId,
          orderDetailId: detail.id,
          rating,
          comment: rnd.pick(DEMO_REVIEWS[rating]),
          date,
          createdAt: date,
        }),
      );
    }
  }
  await manager.save(reviews, { chunk: 100 });

  // ---------- Giỏ hàng (mỗi sản phẩm chỉ nằm trong 1 giỏ do ràng buộc OneToOne) ----------
  const cartProducts = [...products].sort(() => rnd.next() - 0.5);
  const carts: Cart[] = [];
  activeCustomers.slice(0, 10).forEach((customer) => {
    for (let k = 0; k < rnd.int(1, 3) && cartProducts.length; k++) {
      carts.push(manager.create(Cart, { userId: customer.id, productId: cartProducts.pop().id, quantity: rnd.int(1, 2) }));
    }
  });
  await manager.save(carts);

  // ---------- Tin nhắn chat với admin ----------
  const messages: Message[] = [];
  DEMO_CONVERSATIONS.forEach((conversation, i) => {
    const customer = activeCustomers[i];
    let t = now - rnd.int(1, 20) * DAY - rnd.int(0, 8) * 60 * 60 * 1000;
    conversation.forEach(([role, content], j) => {
      t += rnd.int(1, 15) * 60 * 1000;
      const fromUser = role === 'user';
      messages.push(
        manager.create(Message, {
          content,
          senderRole: role,
          sender: fromUser ? customer : savedAdmin,
          receiver: fromUser ? savedAdmin : customer,
          timestamp: new Date(t),
          // Tin cuối của một vài cuộc hội thoại chưa được đọc → demo badge "tin mới"
          isRead: !(j === conversation.length - 1 && fromUser && i % 3 === 0),
        }),
      );
    });
  });
  await manager.save(messages);

  const countBy = (s: StatusDelivery) => savedOrders.filter((o) => o.statusDelivery === s).length;
  return {
    message: 'Seed dữ liệu demo thành công',
    accounts: DEMO_ACCOUNTS,
    summary: {
      categories: categories.length,
      products: products.length,
      users: customers.length + 1,
      blockedUsers: blockedCustomers.length,
      orders: savedOrders.length,
      ordersByStatus: Object.fromEntries(Object.values(StatusDelivery).map((s) => [s, countBy(s)])),
      orderDetails: savedOrders.reduce((s, o) => s + o.orderDetail.length, 0),
      revenueSuccess: savedOrders
        .filter((o) => o.statusDelivery === StatusDelivery.SUCCESS)
        .reduce((s, o) => s + o.price, 0),
      reviews: reviews.length,
      carts: carts.length,
      messages: messages.length,
    },
  };
}
