import React from "react";
import { notification } from "antd";
import { BaseButton } from "Elements/Base/Button/BaseButton";

export const useNotificationAnimeList = (notify: boolean) => {
  if (notify) {
    const key = `open${Date.now()}`;
    const btn = (
      <BaseButton onClick={() => notification.close(key)}>Edit</BaseButton>
    );
    notification.open({
      message: "You added anime to your list!",
      description:
        "You can add a rating or write your own review about this anime.",
      btn,
      key,
      duration: 8,
    });
  }
};
