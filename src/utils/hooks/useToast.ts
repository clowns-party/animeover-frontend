import { message } from "antd";

import React from "react";

type NoticeType = "info" | "success" | "error" | "warning" | "loading";

export const useToast = (
  content: string,
  duration: number,
  type: NoticeType
) => {
  React.useEffect(() => {
    if (content) {
      message[type]({
        content,
        duration,
      });
    }
  }, [content]);
};
