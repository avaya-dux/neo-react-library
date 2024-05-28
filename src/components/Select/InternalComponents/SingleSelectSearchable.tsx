import clsx from "clsx";
import type { UseComboboxReturnValue } from "downshift";
import log from "loglevel";
import { useContext, useEffect } from "react";

import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import type { SelectOptionProps } from "../utils/SelectTypes";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

const logger = log.getLogger("single-select-searchable");
logger.disableAll();

export const SingleSelectSearchable = () => {
	const {
		downshiftProps,
		optionProps: { selectedItems },
		selectProps: {
			ariaLabel,
			disabled,
			filteredOptions,
			helperId,
			helperText,
			loading,
			placeholder,
			size,
		},
	} = useContext(SelectContext);

	const {
		closeMenu,
		getInputProps,
		getMenuProps,
		getToggleButtonProps,
		inputValue,
		isOpen,
		reset,
		selectItem,
		setInputValue,
	} = downshiftProps as UseComboboxReturnValue<SelectOptionProps>;

	logger.debug(selectedItems[0]);

	const { "aria-expanded": toggleAriaExpanded, ...restToggleProps } =
		getToggleButtonProps();
	const { id, onKeyDown, ...restInputProps } = getInputProps();

	// clear the search when dropdown closes (when the user selects an item or clicks away)
	useEffect(() => {
		if (isOpen === false) {
			setInputValue("");
		}
	}, [isOpen, setInputValue]);

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
			<span {...restToggleProps} className="neo-multiselect-combo__header">
				<span className="neo-multiselect__padded-container">
					<input
						{...restInputProps}
						className="neo-input"
						disabled={disabled}
						placeholder={selectedItems.length ? undefined : placeholder}
						onKeyDown={(e) => {
							if (
								e.key === Keys.ENTER &&
								filteredOptions.length === 1 &&
								!filteredOptions[0].disabled
							) {
								e.preventDefault();
								selectItem(filteredOptions[0]);
								closeMenu();
							} else if (e.key === Keys.BACKSPACE && inputValue.length === 0) {
								reset();
							}

							onKeyDown(e);
						}}
					/>

					{selectedItems[0]?.children}

					<input
						className="neo-display-none"
						id={id}
						readOnly
						tabIndex={-1}
						value={selectedItems[0]?.value || ""}
					/>
				</span>
			</span>

			<div
				className={clsx(
					"neo-multiselect__content",
					isOpen && "neo-set-keyboard-focus",
				)}
				aria-label={ariaLabel}
				{...getMenuProps()}
			>
				<ul role="group">
					<OptionsWithEmptyMessageFallback />
				</ul>
			</div>
		</div>
	);
};
