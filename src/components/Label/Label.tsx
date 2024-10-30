import { Icon } from "components";
import { Tooltip, type TooltipPosition } from "components";
import type { IconNamesType } from "utils";
// import "./Label_shim.css";
import { useMemo } from "react";
import { useTooltip } from "./useLabel";
export type LabelIconProps = {
	iconType: IconNamesType;
	iconAriaLabel: string;
	iconTooltipPosition: TooltipPosition;
	iconTooltipText: string;
};

export type LabelProps = {
	htmlFor: string;
	text?: string;
	className?: string;
	children?: React.ReactNode;
	icon?: LabelIconProps;
};

export type ExternalLabelProps = Omit<LabelProps, "htmlFor">;

export const Label = ({
	text: label,
	htmlFor: id,
	className,
	children,
	icon,
}: LabelProps) => {
	const tooltip = useTooltip(icon);

	const justLabel = useMemo(() => {
		return (
			<label htmlFor={id} className={className}>
				{label || children}
			</label>
		);
	}, [id, label, className, children]);

	// children is used by the Switch component only
	// And switch already renders the tooltip itself
	// so we don't need to render it below
	return icon === undefined ? (
		justLabel
	) : (
		<div className="neo-form__label-with-icon">
			{justLabel}
			{children ? null : tooltip}
		</div>
	);
};
