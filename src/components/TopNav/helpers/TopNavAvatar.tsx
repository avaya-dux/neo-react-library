import { cloneElement } from "react";

import { TopNavAvatarProps } from "../TopNavTypes";

/**
 *
 * Is used to show the user's avatar in the top navigation bar.
 *
 * @example
 * <TopNav>
    <TopNav.Avatar
      avatar={<Avatar initials="MD" />}
      dropdown={
        <Menu
          itemAlignment="right"
          menuRootElement={
            <MenuButton onClick={() => console.log("Functional Menu opened")}>
              Functional Menu
            </MenuButton>
          }
        >
          <MenuItem>Item1</MenuItem>
          <SubMenu menuRootElement={<MenuItem>Sub Menu</MenuItem>}>
            <MenuItem>Sub Item1</MenuItem>
            <MenuItem>Sub Item2</MenuItem>
          </SubMenu>
          <MenuItem>Item3</MenuItem>
        </Menu>
      }
    />
  </TopNav>
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-top-navigation--avatar-example
 */
export const TopNavAvatar = ({ avatar, dropdown }: TopNavAvatarProps) => {
	return dropdown
		? cloneElement(dropdown, {
				menuRootElement: cloneElement(avatar, {
					className: "neo-dropdown__link-header neo-avatar--medium",
				}),
			})
		: avatar;
};
