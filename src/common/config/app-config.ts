/**
 * Đọc cấu hình từ biến môi trường (.env ở local, Environment trên Render khi deploy).
 * Xem danh sách biến trong .env.example.
 */

const trimSlash = (url: string) => url.replace(/\/+$/, '');

/** Lấy biến bắt buộc — thiếu thì dừng app với thông báo rõ ràng thay vì chạy sai. */
export const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Thiếu biến môi trường ${key}. Hãy khai báo trong .env (local) hoặc Environment của server deploy.`);
  }
  return value;
};

/** URL public của BE, ví dụ http://localhost:5003 hoặc https://prolaptop-server.onrender.com */
export const getServerUrl = (): string =>
  trimSlash(process.env.SERVER_URL || process.env.DEPLOY_SERVICE_LINK || `http://localhost:${getPort()}`);

/** URL của FE (dùng cho redirect sau login Google). Nếu khai báo nhiều URL, lấy URL đầu tiên. */
export const getClientUrl = (): string => getClientOrigins()[0] || 'http://localhost:5173';

/**
 * Danh sách origin FE được phép gọi API / socket.
 * CLIENT_URL có thể chứa nhiều URL, phân tách bằng dấu phẩy.
 */
export const getClientOrigins = (): string[] =>
  (process.env.CLIENT_URL || '')
    .split(',')
    .map((s) => trimSlash(s.trim()))
    .filter(Boolean);

/** Giá trị cors origin: danh sách CLIENT_URL nếu có, nếu không thì cho phép mọi origin (như trước đây). */
export const getCorsOrigin = (): string[] | boolean => {
  const origins = getClientOrigins();
  return origins.length ? origins : true;
};

export const getPort = (): number => Number(process.env.PORT) || 5003;
