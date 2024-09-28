import { useEffect, useRef } from "react";

export function FocusTrap(
  props: React.ComponentProps<"div"> & {
    focusTarget: React.MutableRefObject<HTMLElement | null>;
  }
) {
  const trapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trapElement = trapRef.current;
    const focusTargetElement = props.focusTarget.current;

    if (trapElement === null || focusTargetElement === null) {
      return;
    }

    const handleFocus = (focusEvent: FocusEvent) => {
      if (trapElement.contains(focusEvent.target as Node)) {
        return;
      }
      console.log(focusTargetElement);
      focusTargetElement.focus();
    };

    document.addEventListener("focusin", handleFocus);

    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);

  return <div ref={trapRef} {...props} />;
}
