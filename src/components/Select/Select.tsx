import { Children, useEffect, useId, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { handleAccessbilityError } from "utils/accessibilityUtils";
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import { InternalSelect } from "./InternalComponents";
import { SelectContext } from "./utils/SelectContext";
import { SelectOptionProps, SelectProps } from "./utils/SelectTypes";
import { useDownshift } from "./utils/useDownshift";

import "./Select_shim.css";

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
    value,
    size = "md",
  } = props;

  const generatedId = useId();
  const id = props.id || generatedId;

  if (!(label || ariaLabel)) {
    handleAccessbilityError("Select requires a label prop or aria-label");
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
    [children]
  );
  const [filteredOptions, setFilteredOptions] = useState(options);
  useEffect(() => {
    // HACK: _sometimes_ when going from/to empty options (loading options), the code gets
    // into an infinite loop. I'm not sure why, so this is my hack around that issue.
    const optionsHaveChanged =
      options.length !== filteredOptions.length ||
      options.some(
        (option, index) => option.value !== filteredOptions[index].value
      );

    if (optionsHaveChanged) {
      setFilteredOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const [selectedItems, setSelectedItems] = useState<SelectOptionProps[]>([]);
  useEffect(() => {
    if (isInitialRender && defaultValue) {
      const userSelectedOptions = options.filter((option) =>
        multiple
          ? defaultValue.includes(option.value as string)
          : defaultValue === option.value
      );
      setSelectedItems(userSelectedOptions);
    } else if (isInitialRender && options.some((o) => o.selected)) {
      setSelectedItems(options.filter((option) => option.selected));
    } else if (!isInitialRender || value) {
      const selectionHasChanged = multiple
        ? selectedItems.length !== value?.length ||
          !selectedItems.every((item) => value.includes(item.value as string))
        : selectedItems[0]?.value !== value;

      if (selectionHasChanged) {
        const userSelectedOptions = options.filter((option) =>
          multiple
            ? value?.includes(option.value as string)
            : value === option.value
        );

        setSelectedItems(userSelectedOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!isInitialRender && onChange) {
      if (multiple) {
        const newlySelectedValues = selectedItems.map(
          (item) => item.value as string
        );

        onChange(newlySelectedValues);
      } else {
        onChange(
          selectedItems.length ? (selectedItems[0].value as string) : null
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  const selectedItemsValues = useMemo(
    () => selectedItems.map((item) => item.value),
    [selectedItems]
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
    setSelectedItems
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
      noOptionsMessage,
      options,
      selectedItems,
      selectedItemsValues,
    },
  };

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
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
