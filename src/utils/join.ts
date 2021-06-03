export const join = (...paths: string[]) =>
  paths
    .filter(ch => !!ch)
    // 用/连接url
    .join('/')
    // 转换//、///为/
    .replace(/\/+/g, '/');
