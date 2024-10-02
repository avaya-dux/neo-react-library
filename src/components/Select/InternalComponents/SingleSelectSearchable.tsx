import clsx from "clsx";
import type { UseComboboxReturnValue } from "downshift";
import log from "loglevel";
import { useContext, type FocusEvent } from "react";

import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import type { SelectOptionProps } from "../utils/SelectTypes";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

const logger = log.getLogger("single-select-searchable");
logger.disableAll();

export const SingleSelectSearchable = () => {
	const {
		downshiftProps,
		optionProps: { selectedItems, creatable },
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
		highlightedIndex,
	} = downshiftProps as UseComboboxReturnValue<SelectOptionProps>;
	const { "aria-expanded": toggleAriaExpanded, ...restToggleProps } =
		getToggleButtonProps();
	const { id, onKeyDown, ref, ...restInputProps } = getInputProps();
	logger.debug({
		value: restInputProps.value,
		inputValue,
		selected: selectedItems[0]?.children,
		creatable,
	});
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
			<span
				{...restToggleProps}
				className={clsx(
					"neo-multiselect-combo__header",
					isOpen && "neo-multiselect-combo__header--expanded",
				)}
				onBlur={() => {
					logger.debug("onBlur");
					closeMenu();
				}}
			>
				<span className="neo-multiselect__padded-container">
					<input
						{...restInputProps}
						ref={ref}
						className="neo-input"
						disabled={disabled}
						placeholder={selectedItems.length ? undefined : placeholder}
						onFocus={(event: FocusEvent<HTMLInputElement>) => {
							logger.debug("onFocus", event.target.value);
							event.target.select();
						}}
						onKeyDown={(e) => {
							logger.debug("keydown", e.key, highlightedIndex, filteredOptions);
							if (e.key === Keys.ENTER) {
								e.preventDefault();

								if (highlightedIndex > -1) {
									selectItem(filteredOptions[highlightedIndex]);
								} else {
									const firstEnableOption = filteredOptions.find((option) => {
										const childSearchText =
											option.searchText || option.children;

										const matches = childSearchText
											.toLowerCase()
											.includes(inputValue.toLowerCase());
										return !option.disabled && matches;
									});
									if (firstEnableOption && inputValue) {
										selectItem(firstEnableOption);
									} else if (inputValue) {
										reset();
									}
								}
								closeMenu();
							} else if (e.key === Keys.BACKSPACE && inputValue.length === 0) {
								reset();
							}

							onKeyDown(e);
						}}
					/>
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
