import { ReactElement } from "react";

export interface SelectOptionProps {
  children: string;
  disabled?: boolean;
  helperText?: string;
  searchText?: string;
  selected?: boolean;
  value?: string;
}

type LabelOrAriaLabelProps =
  | { label: string; "aria-label"?: string }
  | { label?: string; "aria-label": string };

export type SelectProps = {
  children?:
    | ReactElement<SelectOptionProps>
    | ReactElement<SelectOptionProps>[];
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
  value?: string | string[];
} & LabelOrAriaLabelProps;
