import { useCombobox, useSelect } from "downshift";
import log from "loglevel";
import { Dispatch, SetStateAction, useState } from "react";

import { SelectOptionProps } from "./SelectTypes";

const logger = log.getLogger("use-downshfit");
logger.enableAll();

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
  createMessage: string,
) => {
  const [inputText, setInputText] = useState("");

  return useCombobox({
    items: filteredOptions,
    id: selectId,
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const isOpen = changes.isOpen ? !(disabled || loading) : false
      logger.debug({isOpen, type, changes})
      switch (type) {
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen,
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
    // BUG: items are not announced in screen reader when selected
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
  createMessage: string,
) => {
  return useCombobox({
    items: filteredOptions,
    id: selectId,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const isOpen = changes.isOpen ? !(disabled || loading) : false
      logger.debug({isOpen, type, changes})
      const { selectedItem } = changes;
      const selectedItemsValues = selectedItems.map((item) => item.value);
      const shouldRemoveItem = selectedItemsValues.includes(
        selectedItem?.value,
      );

      switch (type) {
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen,
          };

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem && shouldRemoveItem) {
            setSelectedItems(
              selectedItems.filter((item) => item.value !== selectedItem.value),
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
              selectedItems.filter((item) => item.value !== selectedItem.value),
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
    itemToString: (item) => item?.value || "",
  });
};

const DownshiftWithSelectProps = (
  items: SelectOptionProps[],
  selectId: string,
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  disabled: boolean,
  loading: boolean,
) => {
  logger.debug("calling DownshiftWithSelectProps")
  return useSelect({
    items,
    id: selectId,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const isOpen = changes.isOpen ? !(disabled || loading) : false
      logger.debug({isOpen, type, changes})
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen,
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
    itemToString: (item) => item?.value || "",
  });
};

const DownshiftWithMultipleSelectProps = (
  options: SelectOptionProps[],
  selectId: string,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  disabled: boolean,
  loading: boolean,
) => {
  logger.debug("calling DownshiftWithMultipleSelectProps");
  return useSelect({
    items: options,
    id: selectId,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const isOpen = changes.isOpen ? !(disabled || loading) : false
      logger.debug({isOpen, type, changes})
      const { selectedItem } = changes;

      const selectedItemsValues = selectedItems.map((item) => item.value);
      const shouldRemoveItem = selectedItemsValues.includes(
        selectedItem?.value,
      );

      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen,
          };

        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          logger.debug({ type, shouldRemoveItem });
          if (selectedItem && shouldRemoveItem) {
            setSelectedItems(
              selectedItems.filter((item) => item.value !== selectedItem.value),
            );
          } else if (selectedItem) {
            setSelectedItems([...selectedItems, selectedItem]);
          }
          logger.debug({ changes });
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
            selectedItem: shouldRemoveItem ? null : selectedItem,
          };

        case useSelect.stateChangeTypes.FunctionSelectItem:
          // `onSelectedItemChange` handles most use-cases, but this reducer step
          // is needed to support removing items via `Chip` click and input `backspace`
          if (selectedItem && selectedItems.includes(selectedItem)) {
            setSelectedItems(
              selectedItems.filter((item) => item !== selectedItem),
            );
          } else if (selectedItem) {
            setSelectedItems([...selectedItems, selectedItem]);
          }

          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
          };

        default:
          return changes;
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      logger.log({ onSelectedItemChange: selectedItem, selectedItems });
      if (!selectedItem) return;

      const selectedItemValues = selectedItems.map((item) => item.value);
      if (selectedItemValues.includes(selectedItem.value)) {
        logger.debug({ removeSelectedItem: selectedItem });
        setSelectedItems(
          selectedItems.filter((item) => item.value !== selectedItem.value),
        );
      } else {
        logger.debug({ addSelectedItem: selectedItem });
        setSelectedItems([...selectedItems, selectedItem]);
      }
    },
    itemToString: (item) => item?.value || "",
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
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
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
      createMessage,
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
      createMessage,
    );
  } else if (multiple) {
    return DownshiftWithMultipleSelectProps(
      options,
      selectId,
      selectedItems,
      setSelectedItems,
      disabled,
      loading,
    );
  }

  return DownshiftWithSelectProps(
    options,
    selectId,
    setSelectedItems,
    disabled,
    loading,
  );
};
