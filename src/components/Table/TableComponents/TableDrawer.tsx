import { Drawer, type DrawerProps } from "components";

export const TableDrawer = ({
	children,
	className,
	id,
	onBack,
	onClose,
	closeOnScrimClick = false,
	open = false,
	title,
	style,
	actions,

	...rest
}: DrawerProps) => {
	return (
		<Drawer
			className={className}
			id={id}
			onBack={onBack}
			onClose={undefined}
			closeOnScrimClick={closeOnScrimClick}
			open={open}
			title={title}
			style={style}
			actions={actions}
			{...rest}
		>
			{children}
		</Drawer>
	);
};
