import { Children, useEffect, useId, useMemo, useState } from "react";
import isEqual from "react-fast-compare";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { handleAccessbilityError } from "utils/accessibilityUtils";
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import { InternalSelect } from "./InternalComponents";
import { SelectContext } from "./utils/SelectContext";

import type { SelectProps } from "./utils/SelectTypes";
import { useDownshift } from "./utils/useDownshift";

import log from "loglevel";
const logger = log.getLogger("select-logger");
logger.disableAll();

import "./Select_shim.css";
import { useSelectedItems } from "./utils/useSelectedItems";

/**
 * The `Select` component allows the user to select one or more options from a list
 * of `SelectOption`. If no `value` is passed via options, the `children` string is
 * assigned as the value.
 *
 * @example
  <Select
    label="Select a favorite food"
    onChange={handleSelectedValueChange}
  >
    <SelectOption value="apple">Apple</SelectOption>
    <SelectOption value="broccoli" helperText="Vegetable">Broccoli</SelectOption>
    <SelectOption value="banana">Banana</SelectOption>
    <SelectOption value="pear">Pear</SelectOption>
  </Select>
 *
 * @example
  <Select
    label="Select multiple foods"
    multiple
    searchable
  >
    <SelectOption value="apple">Apple</SelectOption>
    <SelectOption value="gravel" helperText="Not a Food" disabled>
      Gravel
    </SelectOption>
    <SelectOption value="broccoli" helperText="Vegetable">Broccoli</SelectOption>
    <SelectOption value="banana">Banana</SelectOption>
    <SelectOption value="pear">Pear</SelectOption>
  </Select>
 *
 * @see https://design.avayacloud.com/components/web/select-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-select
 */
export const Select = (props: SelectProps) => {
	const {
		"aria-label": ariaLabel,
		className,
		createMessage = "Create:",
		children = [],
		creatable = false,
		defaultValue,
		disabled = false,
		errorList = [],
		helperText = "",
		label = "",
		loading = false,
		multiple = false,
		noOptionsMessage = "No options available",
		onChange,
		placeholder = "",
		required,
		searchable = false,
		collapse = false,
		value,
		size = "md",
		style,
	} = props;

	const generatedId = useId();
	const id = props.id || generatedId;

	if (!(label || ariaLabel)) {
		handleAccessbilityError("Select requires a label prop or aria-label");
	}

	if (!searchable && placeholder) {
		console.warn(
			`For Select with id ${id}, the placeholder prop is ignored when component is not searchable`,
		);
	}

	if (value && defaultValue && !isEqual(value, defaultValue)) {
		console.warn(
			"You have passed both `value` and `defaultValue` props to Select. `value` will be used.",
		);
	}

	const helperId = useMemo(() => `helper-text-${id}`, [id]);
	const isInitialRender = useIsInitialRender();

	// if the `value` is not set, use `children` as `value`
	const options = useMemo(
		() =>
			Children.map(children, (child) => {
				const childprops = { ...child.props };
				if (!childprops.value) {
					childprops.value = childprops.children;
				}

				return childprops;
			}),
		[children],
	);
	const [filteredOptions, setFilteredOptions] = useState(options);

	// biome-ignore lint/correctness/useExhaustiveDependencies: filteredOptions should not be in dep array
	useEffect(() => {
		// Checking if array of options changed before updating to prevent a recursive event loop
		const optionsHaveChanged = !isEqual([...options], filteredOptions);

		if (optionsHaveChanged) {
			setFilteredOptions(options);
		}
	}, [options]);

	const [selectedItems, setSelectedItems] = useSelectedItems({
		defaultValue,
		value,
		options,
		multiple,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: we only want to run this when the user updates their selection
	useEffect(() => {
		if (!isInitialRender && onChange) {
			if (multiple) {
				const newlySelectedValues = selectedItems.map(
					(item) => item.value as string,
				);
				logger.debug({ selectedItems });
				onChange(newlySelectedValues);
			} else {
				onChange(
					selectedItems.length ? (selectedItems[0].value as string) : null,
				);
			}
		}
	}, [JSON.stringify(selectedItems)]);

	const selectedItemsValues = useMemo(
		() => selectedItems.map((item) => item.value),
		[selectedItems],
	);

	const downshiftProps = useDownshift(
		creatable,
		createMessage,
		disabled,
		id,
		loading,
		multiple,
		searchable,
		options,
		filteredOptions,
		setFilteredOptions,
		selectedItems,
		setSelectedItems,
	);

	const { getLabelProps } = downshiftProps;

	const contextValue = {
		downshiftProps,
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
		optionProps: {
			multiple,
			collapse,
			noOptionsMessage,
			options,
			selectedItems,
			selectedItemsValues,
			setSelectedItems,
		},
	};

	return (
		<NeoInputWrapper
			wrapperClassName={className}
			disabled={disabled || loading}
			error={errorList.length > 0}
			required={required}
			style={style}
		>
			{label && <label {...getLabelProps()}>{label}</label>}

			<SelectContext.Provider value={contextValue}>
				<InternalSelect searchable={searchable} multiple={multiple} />
			</SelectContext.Provider>

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

Select.displayName = "Select";
