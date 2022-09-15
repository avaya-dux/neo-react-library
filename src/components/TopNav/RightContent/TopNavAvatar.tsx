import { cloneElement } from "react";

import { TopNavAvatarProps } from "../TopNavTypes";

export const TopNavAvatar = ({ avatar, dropdown }: TopNavAvatarProps) => {
  return dropdown
    ? cloneElement(dropdown, {
        menuRootElement: cloneElement(avatar, {
          className: "neo-dropdown__link-header neo-avatar--medium",
        }),
      })
    : avatar;
};
