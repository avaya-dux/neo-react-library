import type { HeaderProps } from "./WidgetTypes";

export const Header = ({ children }: HeaderProps) => {
	return <div className="neo-widget__header-left">{children}</div>;
};

Header.displayName = "Header";
