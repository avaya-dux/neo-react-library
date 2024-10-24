import type { LabelIconProps } from "components/Label";
import type {
	ChangeEvent,
	ChangeEventHandler,
	DetailedHTMLProps,
	InputHTMLAttributes,
	ReactNode,
} from "react";

export type SwitchChangeHandler = (
	event: ChangeEvent<HTMLInputElement>,
	checked: boolean,
) => void;

export interface SwitchProps
	extends Omit<
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"onChange"
	> {
	error?: boolean;
	multiline?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement> | SwitchChangeHandler;
	children?: ReactNode;
	labelIcon?: LabelIconProps;
}
