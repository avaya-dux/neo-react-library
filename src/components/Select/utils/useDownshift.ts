import { useCombobox, useSelect } from "downshift";
import { Dispatch, SetStateAction, useState } from "react";

import { SelectOptionProps } from "./SelectTypes";

const createOptionValue = "neo-select-create-option";

const DownshiftWithComboboxProps = (
  options: SelectOptionProps[],
  selectId: string,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  filteredOptions: SelectOptionProps[],
  setFilteredOptions: Dispatch<SetStateAction<SelectOptionProps[]>>,
  loading: boolean,
  disabled: boolean,
  creatable: boolean,
  createMessage: string
) => {
  // HACK: `onSelectedItemChange`'s `inputValue` is always `[object Object]`, no idea why
  const [inputText, setInputText] = useState("");

  return useCombobox({
    items: filteredOptions,
    id: selectId,
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
          };

        default:
          return changes;
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        const relatedOptions = options.filter((child) => {
          const childSearchText = child.searchText || child.children;

          return childSearchText
            .toLowerCase()
            .includes(inputValue.toLowerCase());
        });

        if (relatedOptions.length === 0 && creatable) {
          const createdItem: SelectOptionProps = {
            children: `${createMessage} '${inputValue}'`,
            value: createOptionValue,
          };
          setFilteredOptions([createdItem]);
        } else {
          setFilteredOptions(relatedOptions);
        }
      } else if (inputValue === "") {
        setFilteredOptions(options);
      }

      setInputText(inputValue || "");
    },
    onSelectedItemChange: ({ selectedItem: clickedItem }) => {
      if (!clickedItem) {
        setSelectedItems([]);
      } else if (creatable && clickedItem.value === createOptionValue) {
        const createdItem: SelectOptionProps = {
          children: inputText,
          value: inputText,
        };
        setSelectedItems([createdItem]);
      } else if (
        selectedItems.length === 0 ||
        selectedItems[0].value !== (clickedItem?.value as string)
      ) {
        setSelectedItems([clickedItem]);
      }
    },
  });
};

const DownshiftWithComboboxMultipleSelectProps = (
  options: SelectOptionProps[],
  selectId: string,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  filteredOptions: SelectOptionProps[],
  setFilteredOptions: Dispatch<SetStateAction<SelectOptionProps[]>>,
  disabled: boolean,
  loading: boolean,
  creatable: boolean,
  createMessage: string
) => {
  return useCombobox({
    items: filteredOptions,
    id: selectId,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const { selectedItem } = changes;
      const selectedItemsValues = selectedItems.map((item) => item.value);
      const shouldRemoveItem = selectedItemsValues.includes(
        selectedItem?.value
      );

      switch (type) {
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
          };

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem && shouldRemoveItem) {
            setSelectedItems(
              selectedItems.filter((item) => item.value !== selectedItem.value)
            );
          } else if (
            selectedItem &&
            creatable &&
            selectedItem.value === createOptionValue
          ) {
            const createdItem: SelectOptionProps = {
              children: state.inputValue,
              value: state.inputValue,
            };
            setSelectedItems([...selectedItems, createdItem]);
          } else if (selectedItem) {
            setSelectedItems([...selectedItems, selectedItem]);
          }

          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: "",
            isOpen: true,
            selectedItem: shouldRemoveItem ? null : selectedItem,
          };

        case useCombobox.stateChangeTypes.FunctionSelectItem:
          /** NOTE: if the user uses arrows+enter to select an item, it triggers
           * FunctionSelectItem+InputKeyDownEnter, thus we need to simply ignore
           * that case here
           */
          if (selectedItem?.value === createOptionValue) return state;

          // `stateChangeTypes.ItemClick` handles most use-cases, but this reducer step
          // is needed to support removing items via `Chip` click, input `backspace`,
          // and input `enter` (and _only_ those three use-cases)
          if (
            selectedItem &&
            selectedItemsValues.includes(selectedItem.value)
          ) {
            setSelectedItems(
              selectedItems.filter((item) => item.value !== selectedItem.value)
            );
          } else if (selectedItem) {
            setSelectedItems([...selectedItems, selectedItem]);
          }

          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: "",
          };

        default:
          return changes;
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        const relatedOptions = options.filter((child) => {
          const childSearchText = child.searchText || child.children;

          return childSearchText
            .toLowerCase()
            .includes(inputValue.toLowerCase());
        });

        if (relatedOptions.length === 0 && creatable) {
          const createdItem: SelectOptionProps = {
            children: `${createMessage} '${inputValue}'`,
            value: createOptionValue,
          };
          setFilteredOptions([createdItem]);
        } else {
          setFilteredOptions(relatedOptions);
        }
      } else if (inputValue === "") {
        setFilteredOptions(options);
      }
    },
  });
};

const DownshiftWithSelectProps = (
  items: SelectOptionProps[],
  selectId: string,
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  disabled: boolean,
  loading: boolean
) => {
  return useSelect({
    items,
    id: selectId,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        setSelectedItems([]);
      } else {
        setSelectedItems([selectedItem]);
      }
    },
  });
};

const DownshiftWithMultipleSelectProps = (
  options: SelectOptionProps[],
  selectId: string,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  disabled: boolean,
  loading: boolean
) => {
  return useSelect({
    items: options,
    id: selectId,
    selectedItem: null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const { selectedItem } = changes;

      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
          };

        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
          };

        case useSelect.stateChangeTypes.FunctionSelectItem:
          // `onSelectedItemChange` handles most use-cases, but this reducer step
          // is needed to support removing items via `Chip` click and input `backspace`
          if (selectedItem && selectedItems.includes(selectedItem)) {
            setSelectedItems(
              selectedItems.filter((item) => item !== selectedItem)
            );
          } else if (selectedItem) {
            setSelectedItems([...selectedItems, selectedItem]);
          }

          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: "",
          };

        default:
          return changes;
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return;

      const selectedItemValues = selectedItems.map((item) => item.value);
      if (selectedItemValues.includes(selectedItem.value)) {
        setSelectedItems(
          selectedItems.filter((item) => item.value !== selectedItem.value)
        );
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    },
  });
};

export const useDownshift = (
  creatable: boolean,
  createMessage: string,
  disabled: boolean,
  selectId: string,
  loading: boolean,
  multiple: boolean,
  searchable: boolean,
  options: SelectOptionProps[],
  filteredOptions: SelectOptionProps[],
  setFilteredOptions: Dispatch<SetStateAction<SelectOptionProps[]>>,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>
) => {
  /**
   * HACK: these are hooks, but because we pass and recieve
   * different props based on `searchable` and `multiple`,
   * we've had to compromise and pretend that they're just regular
   * functions.
   *
   * In theory, they still function as hooks because `searchable` and
   * `multiple` are never changed. So this is definitely a
   * hack, but it's not the worst one. In theory.
   */

  if (searchable && multiple) {
    return DownshiftWithComboboxMultipleSelectProps(
      options,
      selectId,
      selectedItems,
      setSelectedItems,
      filteredOptions,
      setFilteredOptions,
      disabled,
      loading,
      creatable,
      createMessage
    );
  } else if (searchable) {
    return DownshiftWithComboboxProps(
      options,
      selectId,
      selectedItems,
      setSelectedItems,
      filteredOptions,
      setFilteredOptions,
      disabled,
      loading,
      creatable,
      createMessage
    );
  } else if (multiple) {
    return DownshiftWithMultipleSelectProps(
      options,
      selectId,
      selectedItems,
      setSelectedItems,
      disabled,
      loading
    );
  }

  return DownshiftWithSelectProps(
    options,
    selectId,
    setSelectedItems,
    disabled,
    loading
  );
};
