import type { TooltipPosition } from "components";
// import "./Label_shim.css";
import { useMemo } from "react";
import type { IconNamesType } from "utils";
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
	generateTooltip?: boolean;
};

export type ExternalLabelProps = Omit<LabelProps, "htmlFor">;

export const Label = ({
	text: label,
	htmlFor: id,
	className,
	children,
	icon,
	generateTooltip = true,
}: LabelProps) => {
	const justLabel = useMemo(() => {
		return (
			<label htmlFor={id} className={className}>
				{label || children}
			</label>
		);
	}, [id, label, className, children]);

	return icon === undefined ? (
		justLabel
	) : (
		<div className="neo-form__label-with-icon">
			{justLabel}
			{generateTooltip && useTooltip(icon)}
		</div>
	);
};
