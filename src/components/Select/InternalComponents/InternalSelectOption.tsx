import log from "loglevel";
import { useContext, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

import clsx from "clsx";
import { SelectContext } from "../utils/SelectContext";
import type { SelectOptionProps } from "../utils/SelectTypes";
import { OptionWithCheckbox } from "./OptionWithCheckbox";

export interface InternalSelectOptionProps extends SelectOptionProps {
	index: number;
}

const logger = log.getLogger("internal-select-option");
logger.disableAll();
/*
https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
 In addition, the interaction model conveyed by the listbox role to assistive
 technologies does not support interacting with elements inside of an option.
 Because of these traits of the listbox widget, it does not provide an accessible way
 to present a list of interactive elements, such as links, buttons, or checkboxes.
*/
export const InternalSelectOption = ({
	children,
	disabled,
	helperText,
	index,
}: InternalSelectOptionProps) => {
	const {
		downshiftProps: { getItemProps, highlightedIndex },

		optionProps: { multiple },

		selectProps: { filteredOptions },
	} = useContext(SelectContext);

	/*
    NOTE: these `id`s will never change for non-searchable selects,
    so the use of `useMemo` here is awesome. But these values _will_
    change for searchable selects, and the use of `useMemo` for that
    use-case is bad. Thus, the use `useMemo` for these `id`s is debatable.
  */
	const helperId = useMemo(
		() => `helper-text-${genId()}-${children}`,
		[children],
	);

	const optionSelf = filteredOptions[index] || {};
	const itemProps = getItemProps({
		item: optionSelf,
		index,
		disabled,
	});

	logger.debug(itemProps);

	return multiple ? (
		<>
			<OptionWithCheckbox
				index={index}
				disabled={disabled}
				helperText={helperText}
				helperId={helperId}
			>
				{children}
			</OptionWithCheckbox>

			{helperText && (
				<p className="neo-input-hint" id={helperId}>
					{helperText}
				</p>
			)}
		</>
	) : (
		<li
			className={clsx(
				"neo-option-plain",
				index === highlightedIndex && "neo-option-plain--focused",
			)}
			{...itemProps}
		>
			{children}

			{helperText && <p className="neo-input-hint">{helperText}</p>}
		</li>
	);
};
