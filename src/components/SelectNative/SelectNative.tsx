import clsx from "clsx";
import { type HTMLAttributes, useId, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { handleAccessbilityError } from "utils/accessibilityUtils";

export interface SelectNativeProps extends HTMLAttributes<HTMLSelectElement> {
	disabled?: boolean;
	errorList?: string[];
	helperText?: string;
	label?: string;
	loading?: boolean;
	multiple?: boolean;
	required?: boolean;
}

/**
 * The `SelectNative` gives Neo styling to a native `<select>` element
 * and enforces basic accessibility standards.
 *
 * @example
 * <SelectNative label="Choose a car:" required>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </SelectNative>
 *
 * @see https://design.avayacloud.com/components/web/tables-web
 */
export const SelectNative = ({
	children,
	disabled = false,
	errorList = [],
	helperText,
	id,
	label,
	loading,
	multiple = false,
	required,
	...rest
}: SelectNativeProps) => {
	const generatedId = useId();
	id = id || generatedId;
	if (!label && !rest["aria-label"]) {
		handleAccessbilityError("SelectNative requires a label prop");
	}

	const helperId = useMemo(() => `helper-text-${id}`, [id]);

	return (
		<NeoInputWrapper
			disabled={disabled || loading}
			error={errorList.length > 0}
			required={required}
		>
			<label htmlFor={id}>{label}</label>

			<div className={clsx("neo-select", loading && "neo-select__spinner")}>
				<select
					aria-describedby={helperId}
					disabled={disabled || loading}
					id={id}
					multiple={multiple}
					required={required}
					{...rest}
				>
					{children}
				</select>
			</div>

			{helperText && (
				<div className="neo-input-hint" id={helperId}>
					{helperText}
				</div>
			)}

			{errorList.length > 0 &&
				errorList?.map((text, index) => (
					<div className="neo-input-hint" key={`error-text-${index}`}>
						{text}
					</div>
				))}
		</NeoInputWrapper>
	);
};
