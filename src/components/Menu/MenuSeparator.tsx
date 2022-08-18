import { MenuSeparatorProps } from "./MenuTypes";

export const MenuSeparator = (props: MenuSeparatorProps) => {
  return <hr {...props} className="neo-dropdown__separator" />;
};
