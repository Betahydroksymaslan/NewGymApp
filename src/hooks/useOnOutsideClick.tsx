import { useEffect, MutableRefObject } from "react";

interface HookType {
  ref: MutableRefObject<HTMLElement | null>;
  handler: (val: Event) => void;
}

export function useOnOutsideClic(fn: HookType) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        // Do nothing if clicking ref's element or descendent elements
        const { current } = fn.ref;
        if (!current || current.contains(event.target as HTMLElement)) {
          return;
        }
        fn.handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [fn.ref, fn.handler]
  );
}
