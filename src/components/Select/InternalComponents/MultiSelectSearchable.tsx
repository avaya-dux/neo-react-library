import clsx from "clsx";
import type { UseComboboxReturnValue } from "downshift";
import log from "loglevel";
import { useContext, useEffect, useMemo } from "react";

import { Chip } from "components/Chip";
import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import type { SelectOptionProps } from "../utils/SelectTypes";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

import "./MultiSelect.css";

const logger = log.getLogger("multiple-select-searchable");
logger.disableAll();
export const MultiSelectSearchable = () => {
	const {
		downshiftProps,
		optionProps: { selectedItems, setSelectedItems },
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
		getInputProps,
		getMenuProps,
		getToggleButtonProps,
		inputValue,
		isOpen,
		selectItem: toggleItem, // NOTE: I've adjusted the hook for this case (multi-select) such that the "select" is actually a "toggle" now
		setInputValue,
	} = downshiftProps as UseComboboxReturnValue<SelectOptionProps>;

	const { "aria-expanded": toggleAriaExpanded, ...restToggleProps } =
		getToggleButtonProps();
	const { id, onKeyDown, ...restInputProps } = getInputProps();

	if (restInputProps.onFocus) {
		restInputProps.onFocus = undefined; // Override downshift behavior to fix NEO-2175
	}

	// clear the search when dropdown closes (when the user selects an item or clicks away)
	useEffect(() => {
		if (isOpen === false) {
			setInputValue("");
		}
	}, [isOpen, setInputValue]);

	const selectedItemsAsChips = useMemo(
		() =>
			selectedItems.length
				? selectedItems.map((item, index) => (
						<Chip
							key={`${item.children}-${index}`}
							closable
							disabled={disabled}
							onClose={() => toggleItem(item)}
							closeButtonAriaLabel={`Remove ${item.children}`}
						>
							{item.children}
						</Chip>
					))
				: null,
		[selectedItems, disabled, toggleItem],
	);

	return (
		<div
			aria-describedby={helperText && helperId}
			className={clsx(
				"neo-multiselect",
				size === "sm" &&
					"neo-multiselect--small neo-multiselect--small-searchable",
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
			>
				<span className="neo-multiselect__padded-container">
					<div className="neo-multiselect-combo__buttons-container">
						<input
							{...restInputProps}
							value={inputValue}
							className={clsx(
								"neo-input",
								size === "sm" && "neo-multiselect__input--small",
							)}
							disabled={disabled}
							placeholder={placeholder}
							onKeyDown={(e) => {
								logger.debug({ onKeyDownCalled: e.key });
								if (
									e.key === Keys.ENTER &&
									filteredOptions.length === 1 &&
									!filteredOptions[0].disabled
								) {
									toggleItem(filteredOptions[0]);
								} else if (
									e.key === Keys.BACKSPACE &&
									inputValue.length === 0
								) {
									toggleItem(selectedItems[selectedItems.length - 1]);
								}
								logger.debug(e);
								onKeyDown(e);
							}}
							onChange={(e) => {
								logger.debug({ onChangeCalled: e.target.value });
								setInputValue(e.target.value);
							}}
						/>
					</div>

					{selectedItemsAsChips}
				</span>

				{!disabled && (
					<button
						aria-label="clear selections"
						className={clsx(
							"neo-input-edit__icon neo-icon-end",
							"neo-multiselect-clear-icon-button",
							selectedItems.length === 0 && "neo-display-none",
						)}
						type="button"
						disabled={selectedItems.length === 0}
						onClick={() => setSelectedItems([])}
					/>
				)}

				<input
					className="neo-display-none"
					id={id}
					readOnly
					tabIndex={-1}
					value={selectedItems.map((item) => item.value as string)}
				/>
			</span>

			<div
				aria-label={ariaLabel}
				className={clsx(
					"neo-multiselect__content",
					isOpen && "neo-set-keyboard-focus",
				)}
				{...getMenuProps()}
			>
				<OptionsWithEmptyMessageFallback />
			</div>
		</div>
	);
};
