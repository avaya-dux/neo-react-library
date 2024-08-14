import { useEffect, useMemo, useState } from "react";
import type { SelectOptionProps } from "./SelectTypes";

export interface UseSelectedItemsProps {
	defaultValue?: string | string[];
	value?: string | string[];
	options: SelectOptionProps[];
	multiple: boolean;
}

export const useSelectedItems = ({
	defaultValue,
	value: updatedValue,
	options,
	multiple,
}: UseSelectedItemsProps): [
	SelectOptionProps[],
	React.Dispatch<React.SetStateAction<SelectOptionProps[]>>,
] => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: this is our initial render and should not be computed again
	const userSelectedOptions = useMemo(() => {
		let value: SelectOptionProps[] = [];

		if (defaultValue) {
			value = options.filter((option) =>
				multiple
					? defaultValue.includes(option.value as string)
					: defaultValue === option.value,
			);
		} else if (updatedValue) {
			value = options.filter((option) =>
				multiple
					? updatedValue.includes(option.value as string)
					: updatedValue === option.value,
			);
		} else if (options.some((o) => o.selected)) {
			value = options.filter((option) => option.selected);
		}

		return value;
	}, []);

	const [selectedItems, setSelectedItems] = useState(userSelectedOptions);

	// biome-ignore lint/correctness/useExhaustiveDependencies: _only_ update when `value` (`updatedValue`) changes
	useEffect(() => {
		if (updatedValue || updatedValue === "") {
			const selectionHasChanged = multiple
				? selectedItems.length !== updatedValue?.length ||
					!selectedItems.every((item) =>
						updatedValue.includes(item.value as string),
					)
				: selectedItems[0]?.value !== updatedValue;

			if (selectionHasChanged) {
				const userSelectedOptions = options.filter((option) =>
					multiple
						? updatedValue?.includes(option.value as string)
						: updatedValue === option.value,
				);

				setSelectedItems(userSelectedOptions);
			}
		}
	}, [updatedValue]);

	return [selectedItems, setSelectedItems];
};
