import { Button, Drawer, type DrawerProps } from "components";
import type { TableInstance } from "react-table";
import { forwardRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
type BaseTableFilterDrawerProps<T extends Record<string, any>> = {
	disableApply?: boolean;
	handleCancel?: () => void;
	handleApply?: () => void;
	tableInstance?: TableInstance<T>;
}

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export type TableFilterDrawerProps<T extends Record<string, any>> = DrawerProps &
	BaseTableFilterDrawerProps<T>;

export const TableFilterDrawer = forwardRef(
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
		}: TableFilterDrawerProps<T>,
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
TableFilterDrawer.displayName = "TableFilterDrawer";
