import {
	Children,
	cloneElement,
	ReactElement,
	useCallback,
	useId,
	useMemo,
} from "react";

import { NeoInputWrapper, Tooltip } from "components";

import "./RadioGroup_shim.css";

export interface RadioGroupProps {
	children: ReactElement | ReactElement[];
	groupName: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id?: string;
	disabled?: boolean;
	selected?: string;
	label?: boolean;
	inline?: boolean;
	helperText?: string;
	error?: boolean;
	required?: boolean;
}

/**
 * A RadioGroup is a group of radio buttons that allows the user to select one option from a set.
 *
 * @example
 * <RadioGroup
    groupName="Example Radio Group"
    onChange={(e) => console.log(e.target.value)}
  >
    <Radio value="Radio 1">Radio 1</Radio>
    <Radio value="Radio 2" disabled>
      Radio 2
    </Radio>
    <Radio value="Radio 3">Radio 3</Radio>
    <Tooltip label="Radio 4" position="right">
      <Radio value="Radio 4">Radio 4</Radio>
    </Tooltip>
  </RadioGroup>
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-radio-group
 * @see https://design.avayacloud.com/components/web/radio-web
 */
export const RadioGroup = ({
	children,
	groupName,
	onChange,
	id,
	disabled,
	selected,
	label,
	inline,
	helperText,
	error,
	required,
}: RadioGroupProps) => {
	const generatedId = useId();
	id = id || generatedId;
	const helperTextId = `${id}-helper-text`;

	const onChangeHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (onChange) {
				onChange(e);
			}
		},
		[onChange],
	);

	const radios = useMemo(
		() =>
			Children.map(children, (child) => {
				let radio;

				const propsToPass = {
					name: groupName,
					"aria-describedby": helperText ? helperText : "",
					onChange: onChangeHandler,
					disabled,
				};

				// NOTE: The below seems kind of hacky, but I was unable to find a better way to make sure
				// that the correct props are passed to child Radios even when wrapped in a Tooltip

				if (child.type === Tooltip) {
					radio = child.props.children as ReactElement;

					const childprops = {
						...radio.props,
						...propsToPass,
						disabled: disabled ? disabled : radio.props.disabled,
						checked: radio.props.value === selected,
					};

					const radioWithProps = cloneElement(radio, childprops);

					return cloneElement(child, child.props, radioWithProps);
				} else {
					const childprops = {
						...child.props,
						...propsToPass,
						disabled: disabled ? disabled : child.props.disabled,
						checked: child.props.value === selected,
					};

					return cloneElement(child, childprops);
				}
			}),
		[children, selected, groupName, helperText, onChangeHandler, disabled],
	);

	return (
		<NeoInputWrapper
			data-testid="RadioGroup-root"
			required={required}
			error={error}
		>
			{label && (
				<label id={id} htmlFor={groupName}>
					{groupName}
				</label>
			)}

			<div
				className={inline ? "neo-input-group--inline" : "neo-radio-group"}
				role="radiogroup"
				aria-labelledby={label ? id : ""}
				aria-label={!label ? groupName : ""}
				aria-describedby={helperText ? helperTextId : ""}
			>
				{radios}
			</div>

			{helperText && (
				<div className="neo-input-hint" id={helperTextId}>
					{helperText}
				</div>
			)}
		</NeoInputWrapper>
	);
};

RadioGroup.displayName = "RadioGroup";
