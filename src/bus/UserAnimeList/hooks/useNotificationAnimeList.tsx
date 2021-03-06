import React from "react";
import { notification } from "antd";
import { BaseButton } from "stories/BaseButton";

export const useNotificationAnimeList = (
  notify: boolean,
  type?: "update" | "review"
) => {
  const isUpdate = type === "update";
  const message = isUpdate
    ? "You added or changed status anime to your list!"
    : "You added review on your anime!";
  const description = isUpdate
    ? "You can add a rating or write your own review about this anime."
    : "";
  if (notify || !isUpdate) {
    const key = `open${Date.now()}`;
    const btn = (
      <BaseButton onClick={() => notification.close(key)}>Ok</BaseButton>
    );
    notification.open({
      message,
      description,
      btn: isUpdate ? btn : <div> </div>,
      key,
      duration: 8,
    });
  }
};
