import clsx from "clsx";
import {
	type InputHTMLAttributes,
	type ReactNode,
	type RefObject,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import {
	ConditionalWrapper,
	type IconNamesType,
	dispatchInputOnChangeEvent,
	handleAccessbilityError,
} from "utils";

import "./TextInput_shim.css";
import { type ExternalLabelProps, useLabel } from "components/Label";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	ariaLabelPasswordHide?: string;
	ariaLabelPasswordShow?: string;
	children?: ReactNode;
	clearable?: boolean;
	disabled?: boolean;
	endAddon?: ReactNode;
	endIcon?: IconNamesType;
	error?: boolean;
	helperText?: string;
	inline?: boolean;
	label?: string | ExternalLabelProps;
	placeholder?: string;
	readOnly?: boolean;
	required?: boolean;
	startAddon?: ReactNode;
	startIcon?: IconNamesType;
	isSmall?: boolean;
	value?: number | string;
}

/**
 * Text fields give users a way to enter and edit information.
 * They’re used in forms, modal dialogs, tables, and other
 * surfaces where text input is required.
 *
 * IMPORTANT: The TextInput component is designed to be contained within a
 * <Form> component in order for all the styles to render correctly.
 *
 * @example
 * <Form>
 *  <TextInput label="Just a Label" />
 *  <TextInput label="Password" type="password" />
 *  <TextInput label="Email" type="email" />
 *  <TextInput label="Search" startIcon="search" clearable={true} />
 * </Form>
 *
 * @see https://design.avayacloud.com/components/web/input-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-text-input
 */
export const TextInput = ({
	ariaLabelPasswordHide = "Hide Password",
	ariaLabelPasswordShow = "Show Password",
	clearable = true,
	disabled,
	endAddon,
	endIcon,
	error,
	helperText,
	inline,
	label,
	placeholder,
	readOnly,
	required,
	startAddon,
	startIcon,
	isSmall = false,
	type = "text",
	id,
	value,
	...rest
}: TextInputProps) => {
	const generatedId = useId();
	id = id || generatedId;

	if (!label && !rest["aria-label"]) {
		handleAccessbilityError("You must provide a `label` or `aria-label`.");
	}

	const inputRef = useRef<HTMLInputElement>(null);

	const [eyeIcon, setEyeIcon] = useState("view-on");
	const [inputType, setInputType] = useState(type);
	const [ariaPressed, setAriaPressed] = useState(false);
	const [ariaLabel, setAriaLabel] = useState(ariaLabelPasswordShow);

	useEffect(() => {
		setInputType(type);
		if (type === "password") {
			setEyeIcon("view-on");
		}
	}, [type]);

	const toggleIcon = () => {
		if (eyeIcon === "view-on") {
			setEyeIcon("view-off");
			setInputType("text");
			setAriaLabel(ariaLabelPasswordHide);
			setAriaPressed(true);
		} else {
			setEyeIcon("view-on");
			setInputType("password");
			setAriaLabel(ariaLabelPasswordShow);
			setAriaPressed(false);
		}
	};
	return (
		<NeoInputWrapper
			wrapperClassName={startIcon || endIcon ? "neo-input-icon" : ""}
			disabled={disabled}
			error={error}
			required={required}
			inline={inline}
		>
			{label && useLabel(label, id)}

			{readOnly ? (
				<InternalTextInputElement
					disabled={disabled}
					hasHelperText={!!helperText}
					id={id}
					inputRef={inputRef}
					placeholder={placeholder}
					readOnly={readOnly}
					value={value}
					required={required}
					{...rest}
				/>
			) : (
				<ConditionalWrapper
					condition={!!startAddon || !!endAddon}
					wrapper={(child) => (
						<div className="neo-input-group--addons">{child}</div>
					)}
				>
					<>
						{!!startAddon && (
							<div className="neo-input-group__addon">{startAddon}</div>
						)}

						<div
							className={clsx(
								"neo-input-editable__wrapper",
								isSmall && "neo-input-editable__wrapper--small",
								startIcon || endIcon ? "neo-input-icon__wrapper" : undefined,
							)}
						>
							{startIcon && <span className={`neo-icon-${startIcon}`} />}

							<InternalTextInputElement
								disabled={disabled}
								hasHelperText={!!helperText}
								id={id}
								inputRef={inputRef}
								placeholder={placeholder}
								readOnly={readOnly}
								type={inputType}
								value={value}
								required={required}
								{...rest}
							/>

							{/* BUG: `clearable` icon overrides `endIcon` */}
							{endIcon && <span className={`neo-icon-${endIcon}`} />}

							{!!clearable && (
								<button
									aria-label="clear input"
									className="neo-input-edit__icon neo-icon-end"
									disabled={disabled}
									type="button"
									onClick={() => {
										dispatchInputOnChangeEvent(
											inputRef.current as HTMLInputElement,
											"",
										);
									}}
								/>
							)}
							{type === "password" && (
								<button
									aria-label={ariaLabel}
									aria-pressed={ariaPressed}
									className={clsx(
										`neo-icon-${eyeIcon}`,
										isSmall && "neo-icon--small",
									)}
									onClick={toggleIcon}
									type="button"
								/>
							)}
						</div>

						{!!endAddon && (
							<div className="neo-input-group__addon">{endAddon}</div>
						)}
					</>
				</ConditionalWrapper>
			)}

			{!!helperText && (
				<div className="neo-input-hint" id={`${id}-description`}>
					{helperText}
				</div>
			)}
		</NeoInputWrapper>
	);
};

export const InternalTextInputElement = ({
	disabled,
	hasHelperText,
	id,
	inputRef,
	placeholder,
	readOnly,
	type,
	value,
	className,
	...rest
}: Pick<
	TextInputProps,
	| "readOnly"
	| "disabled"
	| "placeholder"
	| "value"
	| "type"
	| "className"
	| "required"
> & {
	id: string;
	inputRef: RefObject<HTMLInputElement>;
	hasHelperText: boolean;
}) => (
	<input
		aria-describedby={hasHelperText ? `${id}-description` : undefined}
		className={clsx("neo-input", className, readOnly && "neo-input-readonly")}
		disabled={disabled}
		id={id}
		placeholder={placeholder}
		readOnly={readOnly}
		ref={inputRef}
		tabIndex={readOnly ? -1 : 0}
		value={value}
		type={type}
		{...rest}
	/>
);

TextInput.displayName = "TextInput";
