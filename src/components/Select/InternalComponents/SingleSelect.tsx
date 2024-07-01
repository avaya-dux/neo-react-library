import clsx from "clsx";
import log from "loglevel";
import { useContext, useMemo } from "react";

import { SelectContext } from "../utils/SelectContext";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

const logger = log.getLogger("single-select-logger");
logger.disableAll();
export const SingleSelect = () => {
	const {
		downshiftProps: { getMenuProps, getToggleButtonProps, isOpen },
		optionProps: { selectedItems, selectedItemsValues },
		selectProps: { ariaLabel, disabled, helperId, helperText, loading, size },
	} = useContext(SelectContext);
	const {
		role,
		"aria-activedescendant": ariaActiveDescendant,
		"aria-labelledby": ariaLabelledby,
		...restToggleProps
	} = getToggleButtonProps();

	const computedAriaProperty = useMemo(() => {
		if (selectedItemsValues) {
			return {
				"aria-label": selectedItemsValues.concat(" selected"),
			};
		}
		if (ariaLabel) {
			return { "aria-label": ariaLabel };
		}
		return { "aria-labelledby": ariaLabelledby };
	}, [selectedItemsValues, ariaLabel, ariaLabelledby]);

	logger.log(computedAriaProperty);

	return (
		<div
			aria-describedby={helperText && helperId}
			className={clsx(
				"neo-multiselect",
				size === "sm" && "neo-multiselect--small",
				disabled && "neo-multiselect--disabled",
				loading && "neo-select__spinner",
				isOpen && "neo-multiselect--active",
			)}
		>
			<span className="neo-multiselect-combo__header neo-multiselect-combo__header--no-after">
				<button
					{...restToggleProps}
					{...computedAriaProperty}
					className={clsx(
						"neo-multiselect__header",
						isOpen && "neo-multiselect__header--expanded",
					)}
					type="button"
				>
					{selectedItems[0]?.children}
				</button>
			</span>

			<div
				className={clsx(
					"neo-multiselect__content",
					isOpen && "neo-set-keyboard-focus",
				)}
				{...getMenuProps()}
			>
				<ul role="group">
					<OptionsWithEmptyMessageFallback />
				</ul>
			</div>
		</div>
	);
};
