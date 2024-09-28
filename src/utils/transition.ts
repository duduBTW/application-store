export function viewTransition<T extends () => void>(callBack: T) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!document.startViewTransition) {
    callBack();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  document.startViewTransition(callBack);
}
