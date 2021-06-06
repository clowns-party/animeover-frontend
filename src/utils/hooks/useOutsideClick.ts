import { useEffect } from "react";

export const useOutsideClick = (ref, handler, root?: any) => {
  const container = root || document;
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    container.addEventListener("mousedown", listener);
    container.addEventListener("touchstart", listener);
    return () => {
      container.removeEventListener("mousedown", listener);
      container.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
