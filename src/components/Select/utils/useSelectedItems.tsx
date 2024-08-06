import { useState } from "react";
import type { SelectOptionProps } from "./SelectTypes";

export interface UseSelectedItemsProps {
	defaultValue?: string | string[];
	options: SelectOptionProps[];
	multiple: boolean;
}

export const useSelectedItems = ({
	defaultValue,
	options,
	multiple,
}: UseSelectedItemsProps): [
	SelectOptionProps[],
	React.Dispatch<React.SetStateAction<SelectOptionProps[]>>,
] => {
	let userSelectedOptions: SelectOptionProps[] = [];

	if (defaultValue) {
		userSelectedOptions = options.filter((option) =>
			multiple
				? defaultValue.includes(option.value as string)
				: defaultValue === option.value,
		);
	} else if (options.some((o) => o.selected)) {
		userSelectedOptions = options.filter((option) => option.selected);
	}

	const [selectedItems, setSelectedItems] = useState(userSelectedOptions);

	return [selectedItems, setSelectedItems];
};
