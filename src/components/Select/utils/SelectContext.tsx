import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { createContext } from "react";

import { SizeTypeSelect } from "utils";

import { SelectOptionProps } from "./SelectTypes";

type ContextDownshiftProps =
	| UseComboboxReturnValue<SelectOptionProps>
	| UseSelectReturnValue<SelectOptionProps>;

export type SelectContextProps = {
	downshiftProps: ContextDownshiftProps;

	selectProps: {
		ariaLabel?: string;
		disabled: boolean;
		filteredOptions: SelectOptionProps[];
		helperId?: string;
		helperText?: string;
		loading: boolean;
		placeholder: string;
		size: SizeTypeSelect;
	};

	optionProps: {
		multiple: boolean;
		noOptionsMessage: string;
		options: SelectOptionProps[];
		selectedItems: SelectOptionProps[];
		selectedItemsValues: (string | undefined)[];
		setSelectedItems: (items: SelectOptionProps[]) => void;
	};
};

export const SelectContext = createContext<SelectContextProps>({
	downshiftProps: {} as ContextDownshiftProps, // HACK: should be a better way, but it eludes me

	selectProps: {
		disabled: false,
		filteredOptions: [],
		loading: false,
		placeholder: "",
		size: "md",
	},

	optionProps: {
		multiple: false,
		noOptionsMessage: "",
		options: [],
		selectedItems: [],
		selectedItemsValues: [],
		setSelectedItems: () => {},
	},
});
