// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function icon(name: string): any {
  return {
    [name]: name,
    $$css: true,
  };
}
