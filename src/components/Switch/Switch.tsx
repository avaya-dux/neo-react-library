import clsx from "clsx";
import { useId } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";

import { Label, useTooltip } from "components/Label";
import type { SwitchProps } from "./SwitchTypes";

/**
 * A `Switch` consists of a checkbox and some text as label. Thus it allows end-users to toggle between a true/false state.
 * Switch label is passed in as children.  Label placement can be on either side of the checkbox.
 * By default, the checkbox is placed to the left of the label.  To place label to the left of the checkbox,
 * set dir to "rtl" on the parent of a Switch or on the Switch itself.
 *
 * @example
 * <Switch
 *   disabled
 *   defautlChecked
 * >Label</Switch>
 *
 * <Switch
 *   checked={checked}
 *   dir="rtl"
 *   onChange={(event, checked) => setChecked(checked)}
 * />Label on left</Switch>
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-switch--default
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
 */
export const Switch = ({
	children,
	error,
	id,
	multiline,
	onChange,
	dir,
	labelIcon,
	readonly,
	...rest
}: SwitchProps) => {
	const generatedId = useId();
	id = id || generatedId;
	if (!children && !rest["aria-label"]) {
		throw new Error("Switch must be passed children or an aria-label");
	}

	const { disabled, required } = rest;
	const childrenWithTooltip = (
		<>
			{children}
			{useTooltip(labelIcon)}
		</>
	);
	return (
		<NeoInputWrapper
			disabled={disabled}
			error={error}
			required={required}
			dir={dir}
		>
			<Label
				className={clsx(
					"neo-switch",
					multiline && "neo-switch--multiline",
					disabled && "neo-switch--disabled",
					readonly && "neo-switch--readonly",
				)}
				htmlFor={id}
				icon={labelIcon}
				generateTooltip={false}
			>
				<input
					id={id}
					type="checkbox"
					role="switch"
					aria-checked={rest.checked}
					aria-readonly={readonly}
					readOnly={readonly}
					onChange={(event) => {
						if (!readonly) {
							onChange?.(event, event.target.checked);
						} else {
							event.preventDefault();
						}
					}}
					{...rest}
				/>
				<i className="neo-switch__icon" />
				{multiline ? (
					<span className="neo-switch-children">{childrenWithTooltip}</span>
				) : (
					childrenWithTooltip
				)}
			</Label>
		</NeoInputWrapper>
	);
};

Switch.displayName = "Switch";
