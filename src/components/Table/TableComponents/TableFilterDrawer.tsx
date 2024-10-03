import { Button, Drawer, type DrawerProps } from "components";
import { forwardRef } from "react";
import type { ITableFilterTranslations } from "../types";

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
			open = false,
			title,
			translations,

			...rest
		}: TableFilterDrawerProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		// translations for button labels
		const applyLabel = translations?.apply || "Apply";
		const cancelLabel = translations?.cancel || "Cancel";

		const actionButtons = [
			<Button
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
