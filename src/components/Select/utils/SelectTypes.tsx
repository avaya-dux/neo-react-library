import type { ReactElement } from "react";

import type { SizeTypeSelect } from "utils";

export interface SelectOptionProps {
	children: string;
	disabled?: boolean;
	helperText?: string;
	searchText?: string;
	selected?: boolean;
	value?: string;
	created?: boolean;
}

type LabelOrAriaLabelProps =
	| { label: string; "aria-label"?: string }
	| { label?: string; "aria-label": string };

export type SelectProps = {
	children?:
		| ReactElement<SelectOptionProps>
		| ReactElement<SelectOptionProps>[]
		| (ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[])[];
	className?: string;
	creatable?: boolean;
	createMessage?: string;
	defaultValue?: string | string[];
	disabled?: boolean;
	errorList?: string[];
	helperText?: string;
	id?: string;
	loading?: boolean;
	multiple?: boolean;
	noOptionsMessage?: string;
	onChange?: (value: null | string | string[]) => void;
	placeholder?: string;
	required?: boolean;
	searchable?: boolean;
	collapse?: boolean;
	value?: string | string[];
	size?: SizeTypeSelect;
	style?: React.CSSProperties;
} & LabelOrAriaLabelProps;
