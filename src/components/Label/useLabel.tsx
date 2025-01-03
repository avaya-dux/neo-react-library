import { Icon, Tooltip } from "components";
import { useMemo } from "react";
import { type ExternalLabelProps, Label, type LabelIconProps } from "./Label";

export const useLabel = (
	label: string | ExternalLabelProps,
	htmlFor: string,
) => {
	const labelProps = useMemo(() => {
		if (typeof label === "string") {
			return {
				text: label,
				htmlFor,
			};
		}
		return { ...label, htmlFor };
	}, [label, htmlFor]);
	return useMemo(() => <Label {...labelProps} />, [labelProps]);
};

export const useTooltip = (icon?: LabelIconProps) => {
	return useMemo(() => {
		if (icon === undefined) return null;
		return (
			<>
				<span className="neo-form__label-with-icon__spacer" />
				<Tooltip
					label={icon.iconTooltipText}
					position={icon.iconTooltipPosition}
				>
					<Icon
						tabIndex={0}
						icon={icon.iconType}
						aria-label={icon.iconAriaLabel}
						size="sm"
					/>
				</Tooltip>
			</>
		);
	}, [icon]);
};
