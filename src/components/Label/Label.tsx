import { Icon } from "components";
import { Tooltip, type TooltipPosition } from "components";
import type { IconNamesType } from "utils";
import "./Label_shim.css";
import { useMemo } from "react";
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
			<Tooltip label={icon.iconTooltipText} position={icon.iconTooltipPosition}>
				<Icon
					tabIndex={0}
					icon={icon.iconType}
					aria-label={icon.iconAriaLabel}
					size="sm"
				/>
			</Tooltip>
		</div>
	);
};
