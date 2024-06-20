import type { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { createContext } from "react";

import type { SizeTypeSelect } from "utils";

import type { SelectOptionProps } from "./SelectTypes";

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
		collapse: boolean;
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
		collapse: false,
		noOptionsMessage: "",
		options: [],
		selectedItems: [],
		selectedItemsValues: [],
		setSelectedItems: () => {},
	},
});
