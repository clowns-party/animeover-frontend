import { useEffect, useMemo } from "react";

type Params = {
  element?: any;
  disabled: boolean;
};
export const useImperativeDisableScroll = ({ element, disabled }: Params) => {
  const el = process.browser ? element || document.body : null;
  const visible = useMemo(() => disabled, [disabled]);

  useEffect(() => {
    if (!el || !process.browser) {
      return;
    }
    el.style.overflowY = visible ? "hidden" : "scroll";

    // eslint-disable-next-line consistent-return
    return () => {
      el.style.overflowY = "scroll";
    };
  }, [disabled]);
};
