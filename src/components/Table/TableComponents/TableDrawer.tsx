import { Button, Drawer, type DrawerProps } from "components";
import type { TableInstance } from "react-table";
import { forwardRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
type BaseTableDrawerProps<T extends Record<string, any>> = {
	disableApply?: boolean;
	handleCancel?: () => void;
	handleApply?: () => void;
	tableInstance?: TableInstance<T>;
}

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export type TableDrawerProps<T extends Record<string, any>> = DrawerProps &
	BaseTableDrawerProps<T>;

export const TableDrawer = forwardRef(
	// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
	<T extends Record<string, any>>(
		{
			children,
			className,
			"aria-label": ariaLabel = "Filter",
			id,
			onBack,
			disableApply = false,
			handleApply,
			handleCancel,
			closeOnScrimClick = false,
			open = false,
			title,

			...rest
		}: TableDrawerProps<T>,
		ref: React.Ref<HTMLDivElement>,
	) => {
		const actionButtons = [
			<Button
				form={id}
				aria-label="cancel"
				variant="secondary"
				onClick={handleCancel}
				key="table-filter-cancel-button"
			>
				Cancel
			</Button>,
			<Button
				aria-label={"Apply"}
				onClick={handleApply}
				disabled={disableApply}
				key="table-filter-apply-button"
			>
				Apply
			</Button>,
		];

		return (
			<Drawer
				ref={ref}
				className={className}
				id={id}
				aria-label={ariaLabel}
				onBack={onBack}
				closeOnScrimClick={closeOnScrimClick}
				open={open}
				title={title}
				actions={actionButtons}
				{...rest}
			>
				{children}
			</Drawer>
		);
	},
);
TableDrawer.displayName = "TableDrawer";
