export function debounce(f: any, ms: number) {
  let timer: NodeJS.Timeout;

  return (...arg: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      f(...arg);
    }, ms);
  };
}
