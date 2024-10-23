import { Icon } from "components";
import { Tooltip, type TooltipPosition } from "components";
import type { IconNamesType } from "utils";
import "./Label_shim.css";
type IconProps = {
	iconType: IconNamesType;
	iconAriaLabel: string;
	iconTooltipPosition: TooltipPosition;
	iconTooltipText: string;
};

export type LabelProps = {
	htmlFor: string;
	text: string;
	icon?: IconProps;
};

export type ExternalLabelProps = Omit<LabelProps, "htmlFor">;

export const Label = ({ text: label, htmlFor: id, icon }: LabelProps) => {
	return icon === undefined ? (
		<label htmlFor={id}>{label}</label>
	) : (
		<div className="neo-form__label-with-icon">
			<label htmlFor={id}>{label}</label>
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
