/**
 * Dữ liệu tĩnh cho bộ seed demo (POST /api/seeding/demo).
 * Giá tính theo cùng đơn vị với seed cũ (USD).
 */

export interface DemoCategory {
  key: 'macbook' | 'asus' | 'hp' | 'msi' | 'dell' | 'lenovo' | 'acer';
  name: string;
  iconUrl: string;
}

export const DEMO_CATEGORIES: DemoCategory[] = [
  { key: 'macbook', name: 'MacBook', iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1732190362/wyvz4lj3asea5j2tif00.png' },
  { key: 'asus', name: 'Asus', iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1727524639/spd49ftufgkc9lwnsiel.png' },
  { key: 'hp', name: 'Hp', iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1727524919/ah4ez7dkbeprmmnedx2t.png' },
  { key: 'msi', name: 'Msi', iconUrl: 'https://res.cloudinary.com/dh6dvndzn/image/upload/v1727525068/duzfdgrrfbyybf55y8hu.png' },
  { key: 'dell', name: 'Dell', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/960px-Dell_logo_2016.svg.png' },
  { key: 'lenovo', name: 'Lenovo', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/960px-Lenovo_logo_2015.svg.png' },
  { key: 'acer', name: 'Acer', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/960px-Acer_2011.svg.png' },
];

/** Ảnh sản phẩm (lấy từ seed cũ), theo hãng */
const IMAGES: Record<DemoCategory['key'], string[]> = {
  macbook: [
    'https://macone.vn/wp-content/uploads/2021/10/macbook-pro-spacegray-m1-2020.jpeg',
    'https://bizweb.dktcdn.net/100/444/581/products/1-jpeg-82ff66f9-3112-4142-a1ec-9515781ecbf9.jpg?v=1656323109783',
    'https://tse2.mm.bing.net/th?id=OIP.tFzJeqA6Oa9DAeYXmY_L0wHaHa&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.XlofPo8jwWzBY9fad4y9CgHaHa&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.gu12Qc0V-k4m-AZDfs0nAwHaFs&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.TzhgK1fRrlyrvpb0nrGP4wHaHa&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.TZU90gTrHVtRMjRNJ2OgJgHaEK&pid=Api&P=0&h=180',
    'http://cdn.mos.cms.futurecdn.net/YmkgfXJZPhKHx3r4tr5ZoC.jpg',
    'https://tse4.mm.bing.net/th?id=OIP.vSaIq8LpxvA38QEfMiJVzQHaDk&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.-_nkYJsfcfec4foklF6bmAHaFs&pid=Api&P=0&h=180',
  ],
  asus: [
    'https://tse4.mm.bing.net/th?id=OIP.oxoxd5ungCm42DcxjbA1MgHaE7&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.vewfenftbHKrLMt4yaq72wHaHa&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.cHBliSRfqC8P73O-j5_rQgHaE4&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.TSID-7jtQvh0nKgqqJFeaQHaHL&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.z-ZT0RMPWi2YJAbUKyP2NwHaHa&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.WFErKkuWBk7qsHUe2wZxfgHaE0&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.s9kXjrptGFlhMZqfKZqFhwHaHa&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.FRvn4RT6RVM57E_RnyaChQHaFj&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.zd1qKn5D8kAW42LGEMMy5QHaFh&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.jS0ZSTUH-wN89t1xbH-oZgHaHa&pid=Api&P=0&h=180',
  ],
  hp: [
    'https://tse1.mm.bing.net/th?id=OIP.88ixC6iwX0GMGYzABXVZzQHaFI&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.6Qi8e9z7kH5Plxzk2uQxYAHaGL&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.OWw5CaaL53n_1UXd1SH08gHaFl&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.m6WYTR_3OBjZMT9FxREwBwHaFF&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.u2Ps3kpEONj-lAMUsOmPxgHaGS&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.fsZxYgUduDeY_ycmC0rq7wHaEr&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.Kny2ps3_iGF-eCeKG9Zr8AHaFj&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.NYqPwrwNYDqKT5WHaFnTzAHaEu&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.i9YNEfDyNV8TK1GbzMIksAHaEg&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.TmdVZty6FfKab0vUeFwvaAHaEm&pid=Api&P=0&h=180',
  ],
  msi: [
    'https://tse1.mm.bing.net/th?id=OIP.Y5GTOLzlUcUlJrhLfqI13gHaHa&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.4IWtb2QDxa6atL3xXvFzGgHaE7&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.RPJWLY48iO1l11_1mS_HpwHaFj&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.O08LCJMBR2XyShED_X_psQHaFC&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.pM4GF1f-VFDfqN3XpA_GxgHaD_&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.tx_1X0LYUthLM7r150G-7wHaEw&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.1Pq5hQCK1uF_xbMEefV5wgHaFh&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.a3G1CzQEdd8HHmhPC1rsPgHaGE&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.9JwdyYEYxUzQ8-PXudvg1gHaFj&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.Gh4a-GK59O3T2wSija9YLwHaF7&pid=Api&P=0&h=180',
  ],
  dell: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/DELL_XPS_13_and_15_%2837080596413%29.jpg/960px-DELL_XPS_13_and_15_%2837080596413%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dell_XPS_L702X.jpg/960px-Dell_XPS_L702X.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Dell_Latitude_e6220.jpg/960px-Dell_Latitude_e6220.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dell_XPS_L401X.JPG/960px-Dell_XPS_L401X.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/d/d2/Dell_Inspiron_E1405.jpg',
  ],
  lenovo: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Lenovo_ThinkPad_X1_Carbon_014_%2810774123843%29.jpg/960px-Lenovo_ThinkPad_X1_Carbon_014_%2810774123843%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Lenovo_Legion_Y7000P_Eclipse_Gray_Laptop.jpg/960px-Lenovo_Legion_Y7000P_Eclipse_Gray_Laptop.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Lenovo_YOGA_3_Pro_%2814922206083%29.jpg/960px-Lenovo_YOGA_3_Pro_%2814922206083%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lenovo_ThinkPad_X1_Carbon_Ultrabook.jpg/960px-Lenovo_ThinkPad_X1_Carbon_Ultrabook.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Lenovo_Legion_Y520_%281%29.jpg/960px-Lenovo_Legion_Y520_%281%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Lenovo_Yoga_3_Pro_hybrid-laptop_in_tent_mode.jpg/960px-Lenovo_Yoga_3_Pro_hybrid-laptop_in_tent_mode.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/92/Lenovo-ThinkPad_X1_Carbon_%287900573876%29.jpg',
  ],
  acer: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Acer_Aspire_A515-51.jpg/960px-Acer_Aspire_A515-51.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Acer_Predator_laptop_and_promotional_model_at_Computex_20160531.jpg/960px-Acer_Predator_laptop_and_promotional_model_at_Computex_20160531.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Acer_Aspire_V3-772G-54208G50Makk.jpg/960px-Acer_Aspire_V3-772G-54208G50Makk.jpg',
  ],
};

/** Ảnh đại diện 3D (Microsoft Fluent Emoji — giấy phép MIT) */
const fluent3d = (name: string) =>
  `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${encodeURIComponent(name)}/Default/3D/${name.toLowerCase().replace(/ /g, '_')}_3d_default.png`;

const AVATAR_ROLES = [
  'technologist', 'office worker', 'student', 'teacher', 'artist', 'cook', 'scientist',
  'mechanic', 'singer', 'farmer', 'health worker', 'pilot', 'astronaut', 'firefighter', 'judge',
];

export const DEMO_AVATARS = {
  male: AVATAR_ROLES.map((r) => fluent3d(`Man ${r}`)),
  female: AVATAR_ROLES.map((r) => fluent3d(`Woman ${r}`)),
  admin: fluent3d('Woman office worker'),
  default: fluent3d('Person'),
};

export interface DemoProduct {
  category: DemoCategory['key'];
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  ram: string;
  cpu: string;
  card: string;
  chip: string;
  hardDrive: string;
  imageUrl: string;
  /** Độ "hot" — sản phẩm càng hot càng được đặt mua nhiều trong đơn demo */
  popularity: number;
}

type P = Omit<DemoProduct, 'category' | 'imageUrl'>;

const mac: P[] = [
  { name: 'MacBook Air 13" M1 2020', price: 899, stockQuantity: 25, popularity: 9, ram: '8GB Unified Memory', cpu: 'Apple M1 8-core CPU', card: 'Apple 7-core GPU', chip: 'Apple M1', hardDrive: '256GB SSD',
    description: 'Mẫu MacBook quốc dân: mỏng nhẹ 1.29kg, không quạt tản nhiệt, pin tới 18 giờ. Màn hình Retina 13.3" True Tone, lựa chọn tuyệt vời cho sinh viên và dân văn phòng.' },
  { name: 'MacBook Air 13" M2 2022', price: 1099, stockQuantity: 20, popularity: 10, ram: '8GB Unified Memory', cpu: 'Apple M2 8-core CPU', card: 'Apple 8-core GPU', chip: 'Apple M2', hardDrive: '256GB SSD',
    description: 'Thiết kế vuông vức mới, màn hình Liquid Retina 13.6" có tai thỏ, sạc MagSafe 3 và camera 1080p. Hiệu năng mạnh hơn M1 khoảng 18%.' },
  { name: 'MacBook Air 15" M2 2023', price: 1299, stockQuantity: 14, popularity: 7, ram: '8GB Unified Memory', cpu: 'Apple M2 8-core CPU', card: 'Apple 10-core GPU', chip: 'Apple M2', hardDrive: '512GB SSD',
    description: 'Màn hình lớn 15.3" nhưng chỉ dày 11.5mm, hệ thống 6 loa với âm thanh không gian. Phù hợp người cần không gian làm việc rộng mà vẫn di động.' },
  { name: 'MacBook Air 13" M3 2024', price: 1199, stockQuantity: 18, popularity: 9, ram: '16GB Unified Memory', cpu: 'Apple M3 8-core CPU', card: 'Apple 10-core GPU', chip: 'Apple M3', hardDrive: '512GB SSD',
    description: 'Chip M3 3nm hỗ trợ ray tracing phần cứng, xuất được 2 màn hình ngoài khi gập máy. Wi-Fi 6E, pin 18 giờ.' },
  { name: 'MacBook Air 15" M3 2024', price: 1499, stockQuantity: 10, popularity: 6, ram: '16GB Unified Memory', cpu: 'Apple M3 8-core CPU', card: 'Apple 10-core GPU', chip: 'Apple M3', hardDrive: '512GB SSD',
    description: 'Phiên bản 15 inch của Air M3, màn hình Liquid Retina 500 nits, bàn phím Magic Keyboard có Touch ID.' },
  { name: 'MacBook Pro 14" M3 2023', price: 1599, stockQuantity: 12, popularity: 7, ram: '8GB Unified Memory', cpu: 'Apple M3 8-core CPU', card: 'Apple 10-core GPU', chip: 'Apple M3', hardDrive: '512GB SSD',
    description: 'Màn hình Liquid Retina XDR 14.2" 120Hz ProMotion, độ sáng HDR 1600 nits, có quạt tản nhiệt giữ hiệu năng ổn định khi render lâu.' },
  { name: 'MacBook Pro 14" M3 Pro 2023', price: 1999, stockQuantity: 9, popularity: 6, ram: '18GB Unified Memory', cpu: 'Apple M3 Pro 11-core CPU', card: 'Apple 14-core GPU', chip: 'Apple M3 Pro', hardDrive: '512GB SSD',
    description: 'Dành cho lập trình viên và designer chuyên nghiệp: build Xcode nhanh, dựng video 4K mượt, pin 18 giờ.' },
  { name: 'MacBook Pro 16" M3 Pro 2023', price: 2499, stockQuantity: 7, popularity: 5, ram: '18GB Unified Memory', cpu: 'Apple M3 Pro 12-core CPU', card: 'Apple 18-core GPU', chip: 'Apple M3 Pro', hardDrive: '512GB SSD',
    description: 'Màn hình 16.2" XDR lớn nhất dòng Mac, 6 loa hi-fi, cổng HDMI và khe thẻ SD đầy đủ cho dân sáng tạo nội dung.' },
  { name: 'MacBook Pro 14" M4 Pro 2024', price: 1999, stockQuantity: 11, popularity: 8, ram: '24GB Unified Memory', cpu: 'Apple M4 Pro 12-core CPU', card: 'Apple 16-core GPU', chip: 'Apple M4 Pro', hardDrive: '512GB SSD',
    description: 'Thế hệ M4 Pro với Thunderbolt 5, camera Center Stage 12MP, tùy chọn màn hình nano-texture chống chói.' },
  { name: 'MacBook Pro 16" M4 Max 2024', price: 3999, stockQuantity: 4, popularity: 3, ram: '48GB Unified Memory', cpu: 'Apple M4 Max 16-core CPU', card: 'Apple 40-core GPU', chip: 'Apple M4 Max', hardDrive: '1TB SSD',
    description: 'Cỗ máy mạnh nhất của Apple cho dựng phim 8K, 3D và chạy mô hình AI cục bộ. Băng thông bộ nhớ 546GB/s.' },
];

const asus: P[] = [
  { name: 'ASUS Vivobook 15 OLED A1505', price: 649, stockQuantity: 30, popularity: 9, ram: '16GB DDR4', cpu: 'Intel Core i5-1235U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i5 Gen 12', hardDrive: '512GB NVMe SSD',
    description: 'Màn hình OLED 15.6" Full HD chuẩn màu 100% DCI-P3, bản lề mở 180°, giá dễ tiếp cận cho học sinh, sinh viên.' },
  { name: 'ASUS Vivobook S14 OLED S5406', price: 899, stockQuantity: 20, popularity: 7, ram: '16GB LPDDR5X', cpu: 'Intel Core Ultra 5 125H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 5', hardDrive: '512GB NVMe SSD',
    description: 'Mỏng 15.9mm, màn OLED 3K 120Hz, có NPU hỗ trợ tác vụ AI và phím Copilot. Pin 75Wh dùng cả ngày.' },
  { name: 'ASUS Zenbook 14 OLED UX3405', price: 1099, stockQuantity: 16, popularity: 8, ram: '16GB LPDDR5X', cpu: 'Intel Core Ultra 7 155H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 7', hardDrive: '1TB NVMe SSD',
    description: 'Ultrabook cao cấp chỉ 1.2kg, vỏ nhôm nguyên khối, màn OLED 3K 120Hz cảm ứng, pin 75Wh lên tới 15 giờ.' },
  { name: 'ASUS Zenbook S 16 UM5606', price: 1499, stockQuantity: 8, popularity: 5, ram: '32GB LPDDR5X', cpu: 'AMD Ryzen AI 9 HX 370', card: 'AMD Radeon 890M', chip: 'AMD Ryzen AI 300', hardDrive: '1TB NVMe SSD',
    description: 'Vỏ Ceraluminum độc quyền, màn 16" OLED 3K, NPU 50 TOPS chuẩn Copilot+ PC. Mỏng 1.1cm.' },
  { name: 'ASUS TUF Gaming F15 FX507', price: 899, stockQuantity: 22, popularity: 10, ram: '16GB DDR4', cpu: 'Intel Core i5-12500H', card: 'NVIDIA GeForce RTX 3050 4GB', chip: 'Intel Core i5 Gen 12', hardDrive: '512GB NVMe SSD',
    description: 'Laptop gaming bền bỉ chuẩn quân đội MIL-STD-810H, màn 15.6" 144Hz, chiến mượt Valorant, LOL, GTA V.' },
  { name: 'ASUS TUF Gaming A15 FA507', price: 1049, stockQuantity: 18, popularity: 8, ram: '16GB DDR5', cpu: 'AMD Ryzen 7 7735HS', card: 'NVIDIA GeForce RTX 4050 6GB', chip: 'AMD Ryzen 7000', hardDrive: '512GB NVMe SSD',
    description: 'RTX 4050 hỗ trợ DLSS 3, màn 144Hz, pin 90Wh lớn bất ngờ cho một máy gaming tầm trung.' },
  { name: 'ASUS ROG Strix G16 G614', price: 1599, stockQuantity: 10, popularity: 6, ram: '16GB DDR5', cpu: 'Intel Core i7-13650HX', card: 'NVIDIA GeForce RTX 4060 8GB', chip: 'Intel Core i7 Gen 13', hardDrive: '1TB NVMe SSD',
    description: 'Màn 16" QHD+ 240Hz, tản nhiệt keo kim loại lỏng, LED RGB Aura Sync. Chiến mọi game AAA ở thiết lập cao.' },
  { name: 'ASUS ROG Zephyrus G14 GA403', price: 1999, stockQuantity: 6, popularity: 5, ram: '32GB LPDDR5X', cpu: 'AMD Ryzen 9 8945HS', card: 'NVIDIA GeForce RTX 4070 8GB', chip: 'AMD Ryzen 8000', hardDrive: '1TB NVMe SSD',
    description: 'Gaming 14" cao cấp nhất: vỏ nhôm CNC 1.5kg, màn ROG Nebula OLED 3K 120Hz, dải LED Slash ở mặt lưng.' },
  { name: 'ASUS ROG Strix SCAR 18 G834', price: 3299, stockQuantity: 3, popularity: 2, ram: '32GB DDR5', cpu: 'Intel Core i9-14900HX', card: 'NVIDIA GeForce RTX 4090 16GB', chip: 'Intel Core i9 Gen 14', hardDrive: '2TB NVMe SSD',
    description: 'Quái vật gaming 18" với RTX 4090, màn Mini-LED 240Hz. Dành cho game thủ và streamer chuyên nghiệp.' },
  { name: 'ASUS ExpertBook B9 OLED B9403', price: 1399, stockQuantity: 9, popularity: 4, ram: '32GB LPDDR5', cpu: 'Intel Core i7-1355U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i7 Gen 13', hardDrive: '1TB NVMe SSD',
    description: 'Laptop doanh nhân nhẹ nhất thế giới 14" (chỉ 990g), bảo mật vân tay + nhận diện khuôn mặt, chuẩn độ bền quân đội.' },
  { name: 'ASUS Vivobook Go 15 E1504', price: 399, stockQuantity: 35, popularity: 8, ram: '8GB LPDDR5', cpu: 'AMD Ryzen 5 7520U', card: 'AMD Radeon 610M', chip: 'AMD Ryzen 7000', hardDrive: '512GB NVMe SSD',
    description: 'Laptop giá rẻ nhất cửa hàng, màn 15.6" Full HD, bản lề 180°, đủ cho học online và soạn thảo văn bản.' },
  { name: 'ASUS ProArt P16 H7606', price: 2299, stockQuantity: 5, popularity: 3, ram: '32GB LPDDR5X', cpu: 'AMD Ryzen AI 9 HX 370', card: 'NVIDIA GeForce RTX 4070 8GB', chip: 'AMD Ryzen AI 300', hardDrive: '2TB NVMe SSD',
    description: 'Dành cho nhà sáng tạo: màn OLED 4K 120Hz chuẩn Pantone, núm xoay ASUS Dial, touchpad hỗ trợ bút stylus.' },
];

const hp: P[] = [
  { name: 'HP 15s-fq5229TU', price: 549, stockQuantity: 28, popularity: 8, ram: '8GB DDR4', cpu: 'Intel Core i3-1215U', card: 'Intel UHD Graphics', chip: 'Intel Core i3 Gen 12', hardDrive: '512GB NVMe SSD',
    description: 'Laptop học tập giá tốt, màn 15.6" Full HD viền mỏng, bàn phím có phím số, đủ cho Office, học online.' },
  { name: 'HP Pavilion 15-eg3000', price: 749, stockQuantity: 22, popularity: 8, ram: '16GB DDR4', cpu: 'Intel Core i5-1335U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i5 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Vỏ nhôm sang trọng, loa B&O, webcam 1080p chống nhiễu. Cân bằng giữa hiệu năng và giá cho dân văn phòng.' },
  { name: 'HP Envy x360 14-fc0000', price: 1049, stockQuantity: 12, popularity: 6, ram: '16GB LPDDR5', cpu: 'Intel Core Ultra 7 155U', card: 'Intel Graphics', chip: 'Intel Core Ultra 7', hardDrive: '1TB NVMe SSD',
    description: 'Laptop 2-in-1 xoay gập 360°, màn OLED cảm ứng hỗ trợ bút, camera 5MP có AI tự căn khung hình.' },
  { name: 'HP Victus 15-fa1000', price: 799, stockQuantity: 24, popularity: 9, ram: '16GB DDR4', cpu: 'Intel Core i5-12450H', card: 'NVIDIA GeForce RTX 2050 4GB', chip: 'Intel Core i5 Gen 12', hardDrive: '512GB NVMe SSD',
    description: 'Gaming nhập môn thiết kế tối giản, màn 144Hz, phù hợp vừa chơi game vừa học đồ họa cơ bản.' },
  { name: 'HP Victus 16-r1000', price: 1149, stockQuantity: 15, popularity: 7, ram: '16GB DDR5', cpu: 'Intel Core i7-14700HX', card: 'NVIDIA GeForce RTX 4060 8GB', chip: 'Intel Core i7 Gen 14', hardDrive: '1TB NVMe SSD',
    description: 'Màn 16.1" 165Hz, tản nhiệt 4 hướng, RTX 4060 140W cho hiệu năng mạnh trong tầm giá.' },
  { name: 'HP OMEN 16-xf0000', price: 1499, stockQuantity: 9, popularity: 5, ram: '32GB DDR5', cpu: 'AMD Ryzen 7 7840HS', card: 'NVIDIA GeForce RTX 4070 8GB', chip: 'AMD Ryzen 7000', hardDrive: '1TB NVMe SSD',
    description: 'Dòng gaming cao cấp của HP: màn QHD 240Hz, OMEN Tempest Cooling, bàn phím RGB 4 vùng.' },
  { name: 'HP Spectre x360 14-eu0000', price: 1599, stockQuantity: 7, popularity: 5, ram: '32GB LPDDR5X', cpu: 'Intel Core Ultra 7 155H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 7', hardDrive: '1TB NVMe SSD',
    description: 'Flagship 2-in-1 với viền cắt kim cương, màn OLED 2.8K 120Hz, kèm bút HP Rechargeable MPP2.0.' },
];

const msi: P[] = [
  { name: 'MSI Modern 14 C12M', price: 499, stockQuantity: 26, popularity: 7, ram: '8GB DDR4', cpu: 'Intel Core i5-1235U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i5 Gen 12', hardDrive: '512GB NVMe SSD',
    description: 'Laptop văn phòng 14" nhẹ 1.4kg, giá mềm, đủ dùng cho học tập và làm việc hằng ngày.' },
  { name: 'MSI GF63 Thin 12VE', price: 799, stockQuantity: 24, popularity: 9, ram: '16GB DDR4', cpu: 'Intel Core i5-12450H', card: 'NVIDIA GeForce RTX 4050 6GB', chip: 'Intel Core i5 Gen 12', hardDrive: '512GB NVMe SSD',
    description: 'Laptop gaming mỏng nhẹ giá tốt nhất nhà MSI, RTX 4050 cho trải nghiệm game eSports mượt mà.' },
  { name: 'MSI Cyborg 15 A12VF', price: 949, stockQuantity: 18, popularity: 8, ram: '16GB DDR5', cpu: 'Intel Core i7-12650H', card: 'NVIDIA GeForce RTX 4060 8GB', chip: 'Intel Core i7 Gen 12', hardDrive: '512GB NVMe SSD',
    description: 'Thiết kế mặt đáy trong suốt phong cách cyberpunk, màn 144Hz, RTX 4060 trong tầm giá dưới 1000.' },
  { name: 'MSI Katana 15 B13VFK', price: 1099, stockQuantity: 16, popularity: 8, ram: '16GB DDR5', cpu: 'Intel Core i7-13620H', card: 'NVIDIA GeForce RTX 4060 8GB', chip: 'Intel Core i7 Gen 13', hardDrive: '1TB NVMe SSD',
    description: 'Lấy cảm hứng từ thanh katana, bàn phím RGB 4 vùng, Cooler Boost 5 với 2 quạt và 6 ống đồng.' },
  { name: 'MSI Sword 16 HX B14V', price: 1299, stockQuantity: 12, popularity: 6, ram: '16GB DDR5', cpu: 'Intel Core i7-14700HX', card: 'NVIDIA GeForce RTX 4060 8GB', chip: 'Intel Core i7 Gen 14', hardDrive: '1TB NVMe SSD',
    description: 'CPU HX 20 nhân hiệu năng desktop, màn 16" 165Hz tỷ lệ 16:10, thiết kế trắng xanh trẻ trung.' },
  { name: 'MSI Raider GE78 HX 14V', price: 3199, stockQuantity: 4, popularity: 2, ram: '32GB DDR5', cpu: 'Intel Core i9-14900HX', card: 'NVIDIA GeForce RTX 4080 12GB', chip: 'Intel Core i9 Gen 14', hardDrive: '2TB NVMe SSD',
    description: 'Dải LED Matrix ánh sáng toàn thân, màn 17" QHD+ 240Hz, bàn phím SteelSeries cơ quang học.' },
];

const dell: P[] = [
  { name: 'Dell Inspiron 15 3530', price: 579, stockQuantity: 30, popularity: 9, ram: '8GB DDR4', cpu: 'Intel Core i5-1335U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i5 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Laptop phổ thông bền bỉ, màn 15.6" Full HD 120Hz, bàn phím full-size có phím số, bảo hành chính hãng 12 tháng.' },
  { name: 'Dell Inspiron 14 5440', price: 749, stockQuantity: 22, popularity: 8, ram: '16GB DDR5', cpu: 'Intel Core 7 150U', card: 'Intel Graphics', chip: 'Intel Core 7 Series 1', hardDrive: '512GB NVMe SSD',
    description: 'Thiết kế gọn nhẹ 1.5kg, màn 14" 16:10, webcam Full HD, phù hợp sinh viên và nhân viên văn phòng.' },
  { name: 'Dell Vostro 3520', price: 529, stockQuantity: 25, popularity: 7, ram: '8GB DDR4', cpu: 'Intel Core i3-1215U', card: 'Intel UHD Graphics', chip: 'Intel Core i3 Gen 12', hardDrive: '256GB NVMe SSD',
    description: 'Dòng máy dành cho doanh nghiệp nhỏ, chi phí thấp, bảo mật TPM 2.0, dễ nâng cấp RAM và ổ cứng.' },
  { name: 'Dell Latitude 7440', price: 1399, stockQuantity: 10, popularity: 4, ram: '16GB LPDDR5', cpu: 'Intel Core i7-1365U vPro', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i7 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Laptop doanh nhân cao cấp, vỏ nhôm tái chế, camera hồng ngoại đăng nhập khuôn mặt, quản trị từ xa bằng vPro.' },
  { name: 'Dell XPS 13 9340', price: 1299, stockQuantity: 12, popularity: 7, ram: '16GB LPDDR5X', cpu: 'Intel Core Ultra 7 155H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 7', hardDrive: '512GB NVMe SSD',
    description: 'Biểu tượng ultrabook: viền màn siêu mỏng, touchpad kính liền mạch, hàng phím chức năng cảm ứng.' },
  { name: 'Dell XPS 14 9440', price: 1799, stockQuantity: 7, popularity: 5, ram: '32GB LPDDR5X', cpu: 'Intel Core Ultra 7 155H', card: 'NVIDIA GeForce RTX 4050 6GB', chip: 'Intel Core Ultra 7', hardDrive: '1TB NVMe SSD',
    description: 'Màn OLED 3.2K cảm ứng, RTX 4050 cho dựng video và đồ họa, thiết kế nhôm CNC nguyên khối.' },
  { name: 'Dell G15 5530', price: 1049, stockQuantity: 18, popularity: 8, ram: '16GB DDR5', cpu: 'Intel Core i7-13650HX', card: 'NVIDIA GeForce RTX 4050 6GB', chip: 'Intel Core i7 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Laptop gaming của Dell với tản nhiệt lấy cảm hứng từ Alienware, màn 165Hz, phím Game Shift tăng tốc quạt.' },
  { name: 'Alienware m16 R2', price: 2199, stockQuantity: 4, popularity: 3, ram: '32GB DDR5', cpu: 'Intel Core Ultra 9 185H', card: 'NVIDIA GeForce RTX 4070 8GB', chip: 'Intel Core Ultra 9', hardDrive: '1TB NVMe SSD',
    description: 'Dòng gaming cao cấp nhất của Dell: màn QHD+ 240Hz, LED AlienFX, thiết kế mỏng hơn 20% so với đời trước.' },
];

const lenovo: P[] = [
  { name: 'Lenovo IdeaPad Slim 3 15IRU8', price: 549, stockQuantity: 32, popularity: 9, ram: '16GB LPDDR5', cpu: 'Intel Core i5-1335U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i5 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Laptop bán chạy cho sinh viên: mỏng 17.9mm, màn 15.6" Full HD, sạc nhanh Rapid Charge 1 giờ đầy 80%.' },
  { name: 'Lenovo IdeaPad Slim 5 14IMH9', price: 799, stockQuantity: 20, popularity: 8, ram: '16GB LPDDR5X', cpu: 'Intel Core Ultra 5 125H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 5', hardDrive: '512GB NVMe SSD',
    description: 'Màn OLED 1.9K, vỏ nhôm, pin 57Wh. Cân bằng tốt giữa thiết kế, hiệu năng và giá thành.' },
  { name: 'Lenovo ThinkPad E14 Gen 5', price: 849, stockQuantity: 18, popularity: 6, ram: '16GB DDR4', cpu: 'Intel Core i5-1335U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i5 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Bàn phím ThinkPad gõ sướng nhất phân khúc, TrackPoint đỏ huyền thoại, độ bền chuẩn quân đội.' },
  { name: 'Lenovo ThinkPad T14 Gen 4', price: 1249, stockQuantity: 11, popularity: 5, ram: '16GB DDR5', cpu: 'Intel Core i7-1355U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i7 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Lựa chọn tiêu chuẩn của doanh nghiệp: bảo mật vân tay, camera che vật lý, dễ sửa chữa và nâng cấp.' },
  { name: 'Lenovo ThinkPad X1 Carbon Gen 12', price: 1899, stockQuantity: 6, popularity: 4, ram: '32GB LPDDR5X', cpu: 'Intel Core Ultra 7 155H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 7', hardDrive: '1TB NVMe SSD',
    description: 'Flagship doanh nhân chỉ 1.09kg, vỏ sợi carbon, màn 2.8K OLED, micro khử tiếng ồn cho họp online.' },
  { name: 'Lenovo Yoga Slim 7i 14IMH9', price: 1099, stockQuantity: 13, popularity: 6, ram: '32GB LPDDR5X', cpu: 'Intel Core Ultra 7 155H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 7', hardDrive: '1TB NVMe SSD',
    description: 'Ultrabook thời trang mỏng 14.9mm, màn OLED 2.8K 120Hz, loa Dolby Atmos.' },
  { name: 'Lenovo Yoga 7 2-in-1 14AHP9', price: 949, stockQuantity: 12, popularity: 5, ram: '16GB LPDDR5X', cpu: 'AMD Ryzen 7 8840HS', card: 'AMD Radeon 780M', chip: 'AMD Ryzen 8000', hardDrive: '1TB NVMe SSD',
    description: 'Gập xoay 360°, màn OLED cảm ứng hỗ trợ bút, dùng như tablet để ghi chú và vẽ phác thảo.' },
  { name: 'Lenovo LOQ 15IRX9', price: 999, stockQuantity: 24, popularity: 9, ram: '16GB DDR5', cpu: 'Intel Core i5-13450HX', card: 'NVIDIA GeForce RTX 4050 6GB', chip: 'Intel Core i5 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Gaming giá tốt kế thừa tản nhiệt Legion, màn 144Hz, chip AI LA1 tự tối ưu hiệu năng.' },
  { name: 'Lenovo Legion Pro 5 16IRX9', price: 1699, stockQuantity: 9, popularity: 6, ram: '32GB DDR5', cpu: 'Intel Core i9-14900HX', card: 'NVIDIA GeForce RTX 4070 8GB', chip: 'Intel Core i9 Gen 14', hardDrive: '1TB NVMe SSD',
    description: 'Được đánh giá là laptop gaming đáng mua nhất: màn 16" WQXGA 240Hz, RTX 4070 full công suất 140W.' },
];

const acer: P[] = [
  { name: 'Acer Aspire 5 A515-58', price: 599, stockQuantity: 20, popularity: 6, ram: '16GB DDR4', cpu: 'Intel Core i5-1335U', card: 'Intel Iris Xe Graphics', chip: 'Intel Core i5 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Laptop đa dụng màn 15.6" Full HD, nhiều cổng kết nối kể cả LAN RJ45, phù hợp văn phòng và học tập.' },
  { name: 'Acer Swift Go 14 SFG14', price: 849, stockQuantity: 12, popularity: 4, ram: '16GB LPDDR5', cpu: 'Intel Core Ultra 5 125H', card: 'Intel Arc Graphics', chip: 'Intel Core Ultra 5', hardDrive: '512GB NVMe SSD',
    description: 'Ultrabook OLED 2.8K giá mềm, vỏ nhôm 1.3kg, webcam QHD với hiệu ứng AI.' },
  { name: 'Acer Nitro V 15 ANV15', price: 849, stockQuantity: 22, popularity: 8, ram: '16GB DDR5', cpu: 'Intel Core i5-13420H', card: 'NVIDIA GeForce RTX 4050 6GB', chip: 'Intel Core i5 Gen 13', hardDrive: '512GB NVMe SSD',
    description: 'Gaming nhập môn với RTX 4050, màn 144Hz, phần mềm NitroSense điều chỉnh quạt và hiệu năng.' },
  { name: 'Acer Predator Helios Neo 16', price: 1399, stockQuantity: 8, popularity: 5, ram: '16GB DDR5', cpu: 'Intel Core i7-14700HX', card: 'NVIDIA GeForce RTX 4060 8GB', chip: 'Intel Core i7 Gen 14', hardDrive: '1TB NVMe SSD',
    description: 'Màn 16" WQXGA 165Hz, quạt AeroBlade 3D thế hệ 5, bàn phím RGB 4 vùng cho game thủ.' },
];

const withImages = (category: DemoCategory['key'], list: P[]): DemoProduct[] =>
  list.map((p, i) => ({ ...p, category, imageUrl: IMAGES[category][i % IMAGES[category].length] }));

export const DEMO_PRODUCTS: DemoProduct[] = [
  ...withImages('macbook', mac),
  ...withImages('asus', asus),
  ...withImages('hp', hp),
  ...withImages('msi', msi),
  ...withImages('dell', dell),
  ...withImages('lenovo', lenovo),
  ...withImages('acer', acer),
];

/** Khách hàng demo: [userName, họ tên, giới tính, tỉnh/thành] */
export const DEMO_CUSTOMERS: Array<[string, string, 'male' | 'female', string]> = [
  ['nguyenvanan', 'Nguyễn Văn An', 'male', 'Hà Nội'],
  ['tranthibinh', 'Trần Thị Bình', 'female', 'TP. Hồ Chí Minh'],
  ['lehoangcuong', 'Lê Hoàng Cường', 'male', 'Đà Nẵng'],
  ['phamthidung', 'Phạm Thị Dung', 'female', 'Hải Phòng'],
  ['hoangminhduc', 'Hoàng Minh Đức', 'male', 'Cần Thơ'],
  ['vuthuha', 'Vũ Thu Hà', 'female', 'Hà Nội'],
  ['dangquochuy', 'Đặng Quốc Huy', 'male', 'TP. Hồ Chí Minh'],
  ['buithikhanh', 'Bùi Thị Khánh', 'female', 'Huế'],
  ['dothanhlong', 'Đỗ Thành Long', 'male', 'Đà Nẵng'],
  ['ngothimai', 'Ngô Thị Mai', 'female', 'Nha Trang'],
  ['duongvannam', 'Dương Văn Nam', 'male', 'Biên Hòa'],
  ['lythioanh', 'Lý Thị Oanh', 'female', 'TP. Hồ Chí Minh'],
  ['trinhminhphuc', 'Trịnh Minh Phúc', 'male', 'Vũng Tàu'],
  ['maithiquynh', 'Mai Thị Quỳnh', 'female', 'Hà Nội'],
  ['phanvanson', 'Phan Văn Sơn', 'male', 'Quy Nhơn'],
  ['caothitam', 'Cao Thị Tâm', 'female', 'Đà Lạt'],
  ['vothanhtung', 'Võ Thành Tùng', 'male', 'TP. Hồ Chí Minh'],
  ['huynhngocuyen', 'Huỳnh Ngọc Uyên', 'female', 'Cần Thơ'],
  ['tavanviet', 'Tạ Văn Việt', 'male', 'Bắc Ninh'],
  ['lamthixuan', 'Lâm Thị Xuân', 'female', 'Đà Nẵng'],
  ['nguyenducthang', 'Nguyễn Đức Thắng', 'male', 'Hà Nội'],
  ['tranngoclinh', 'Trần Ngọc Linh', 'female', 'TP. Hồ Chí Minh'],
  ['levankhoa', 'Lê Văn Khoa', 'male', 'Huế'],
  ['phamngocthao', 'Phạm Ngọc Thảo', 'female', 'Hải Phòng'],
  ['hoangtuananh', 'Hoàng Tuấn Anh', 'male', 'Thái Nguyên'],
  ['nguyenthihuong', 'Nguyễn Thị Hương', 'female', 'Nghệ An'],
  ['dinhcongminh', 'Đinh Công Minh', 'male', 'TP. Hồ Chí Minh'],
  ['truongmylinh', 'Trương Mỹ Linh', 'female', 'Đà Nẵng'],
];

export const DEMO_STREETS = [
  '12 Nguyễn Huệ', '45 Lê Lợi', '78 Trần Hưng Đạo', '102 Hai Bà Trưng', '23 Lý Thường Kiệt',
  '56 Phan Chu Trinh', '89 Nguyễn Trãi', '134 Điện Biên Phủ', '7 Hoàng Diệu', '210 Cách Mạng Tháng 8',
  '66 Bạch Đằng', '31 Quang Trung', '15 Nguyễn Văn Linh', '98 Võ Văn Tần', '40 Pasteur',
];

/** Bình luận theo số sao */
export const DEMO_REVIEWS: Record<number, string[]> = {
  5: [
    'Máy chạy cực mượt, giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!',
    'Màn hình đẹp xuất sắc, pin trâu, đáng đồng tiền bát gạo.',
    'Shop tư vấn nhiệt tình, máy nguyên seal, kích hoạt bảo hành đầy đủ.',
    'Hiệu năng vượt mong đợi, chơi game và làm đồ họa đều ổn áp.',
    'Mua tặng con đi học, cháu rất thích. Sẽ ủng hộ shop dài dài.',
    'Thiết kế sang, nhẹ, mang đi làm cả ngày không mỏi vai. 10 điểm!',
    'Lần thứ 2 mua ở ProLaptop, vẫn uy tín như lần đầu.',
  ],
  4: [
    'Máy tốt, chạy ổn định. Trừ 1 sao vì giao hàng hơi chậm 1 ngày.',
    'Cấu hình mạnh so với giá, chỉ có điều quạt hơi ồn khi chơi game nặng.',
    'Màn hình đẹp, loa hay. Pin không được lâu như quảng cáo nhưng vẫn ổn.',
    'Hàng chính hãng, đóng gói kỹ. Mong shop có thêm quà tặng kèm.',
    'Dùng được 2 tuần thấy ổn, bàn phím gõ êm.',
  ],
  3: [
    'Máy dùng tạm ổn, nhưng hơi nóng khi chạy tác vụ nặng.',
    'Giao hàng chậm, nhân viên hỗ trợ nhiệt tình nên vẫn cho 3 sao.',
    'Cấu hình ổn nhưng màn hình không sáng lắm khi dùng ngoài trời.',
  ],
  2: [
    'Máy bị lỗi điểm chết màn hình, shop đã hỗ trợ đổi nhưng mất thời gian.',
  ],
};

/** Các đoạn hội thoại mẫu giữa khách và admin: [role, nội dung] */
export const DEMO_CONVERSATIONS: Array<Array<['user' | 'admin', string]>> = [
  [
    ['user', 'Chào shop, MacBook Air M2 còn màu Midnight không ạ?'],
    ['admin', 'Dạ chào anh/chị, hiện bên em còn 5 máy màu Midnight bản 8GB/256GB ạ.'],
    ['user', 'Mua trả góp được không shop?'],
    ['admin', 'Dạ được ạ, bên em hỗ trợ trả góp 0% qua thẻ tín dụng trong 6 hoặc 12 tháng.'],
    ['user', 'Ok để mình đặt online luôn nhé, cảm ơn shop.'],
  ],
  [
    ['user', 'Mình là sinh viên IT, ngân sách khoảng 900$ thì nên lấy máy nào ạ?'],
    ['admin', 'Dạ với nhu cầu lập trình, bạn có thể tham khảo ASUS TUF Gaming F15 hoặc HP Victus 15, RAM 16GB dư sức chạy IDE và Docker ạ.'],
    ['user', 'TUF F15 có nâng cấp RAM được không ạ?'],
    ['admin', 'Dạ có 2 khe RAM, nâng tối đa 32GB. Bên em hỗ trợ nâng cấp miễn phí công lắp đặt ạ.'],
  ],
  [
    ['user', 'Đơn hàng của mình đặt hôm qua khi nào giao vậy shop?'],
    ['admin', 'Dạ đơn của anh đã được bàn giao cho đơn vị vận chuyển, dự kiến giao trong 1-2 ngày tới ạ.'],
    ['user', 'Cảm ơn shop nhé!'],
  ],
  [
    ['user', 'Laptop MSI Katana bảo hành bao lâu vậy ạ?'],
    ['admin', 'Dạ MSI Katana 15 được bảo hành chính hãng 24 tháng, 1 đổi 1 trong 30 ngày nếu lỗi nhà sản xuất ạ.'],
  ],
  [
    ['user', 'Shop ơi thanh toán ZaloPay có được giảm giá gì không?'],
    ['admin', 'Dạ hiện đang có ưu đãi giảm thêm 2% tối đa 20$ khi thanh toán qua ZaloPay ạ.'],
    ['user', 'Tuyệt vời, mình đặt luôn đây.'],
  ],
  [
    ['user', 'Mình muốn đổi địa chỉ giao hàng cho đơn mới đặt được không?'],
    ['admin', 'Dạ được ạ, anh/chị gửi giúp em địa chỉ mới, em cập nhật ngay ạ.'],
    ['user', '45 Lê Lợi, quận 1, TP. Hồ Chí Minh nhé.'],
    ['admin', 'Dạ em đã cập nhật xong, cảm ơn anh/chị ạ.'],
  ],
  [
    ['user', 'Zenbook 14 OLED có bản 32GB RAM không shop?'],
    ['admin', 'Dạ hiện bên em mới có bản 16GB, bản 32GB dự kiến về hàng tuần sau ạ. Em báo anh khi có hàng nhé.'],
  ],
  [
    ['user', 'Máy mình mua bị lỗi sạc không vào, shop hỗ trợ giúp mình với.'],
    ['admin', 'Dạ em rất xin lỗi về sự cố. Anh/chị mang máy qua cửa hàng hoặc gửi bưu điện, bên em kiểm tra và đổi mới trong 24h ạ.'],
    ['user', 'Ok mình mang qua chiều nay.'],
  ],
];
