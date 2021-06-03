export type Value = string | number | boolean | undefined | null;
export type Mapping = { [key: string]: any };
export type Argument = Value | Mapping | Argument[];

export const classnames = (...args: Argument[]): string => {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    // 过滤null、undefind、false等
    if (!arg) continue;

    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      // 如果是数组则递归，直到args扁平化
      if (arg.length) {
        const inner = classnames(...arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        // 遍历obj，放入值为true的key
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};
