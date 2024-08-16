import { Button, Drawer, type DrawerProps } from "components";
import type { ITableFilterTranslations } from "../types";
import { forwardRef } from "react";

type BaseTableFilterDrawerProps = {
	disableApply?: boolean;
	handleCancel?: () => void;
	handleApply?: () => void;
	translations?: ITableFilterTranslations;
};

export type TableFilterDrawerProps = DrawerProps & BaseTableFilterDrawerProps;

export const TableFilterDrawer = forwardRef(
	(
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
			translations,

			...rest
		}: TableFilterDrawerProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		// translations
		const applyLabel = translations?.apply || "Apply";
		const cancelLabel = translations?.cancel || "Cancel";

		const actionButtons = [
			<Button
				form={id}
				aria-label={cancelLabel}
				variant="secondary"
				onClick={handleCancel}
				key="table-filter-cancel-button"
			>
				{cancelLabel}
			</Button>,
			<Button
				aria-label={applyLabel}
				onClick={handleApply}
				disabled={disableApply}
				key="table-filter-apply-button"
			>
				{applyLabel}
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
