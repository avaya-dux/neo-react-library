import type {
	HTMLAttributes,
	ReactElement,
	ReactFragment,
	ReactNode,
	ReactPortal,
} from "react";

export type HeaderProps = {
	children: ReactNode | ReactFragment | ReactPortal;
};
export type ActionProps = {
	children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export type ContentProps = {
	children?: ReactNode;
	asText?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type ContextProps = {
	loading: boolean;
	empty: boolean;
	disabled: boolean;
};
export type ThreeChildren = [
	ReactElement<HeaderProps>,
	ReactElement<ActionProps>,
	ReactElement<ContentProps>,
];
export type TwoChildren = [
	ReactElement<HeaderProps>,
	ReactElement<ActionProps | ContentProps>,
];
export type WidgetProps = {
	children: ThreeChildren | TwoChildren | ReactElement<HeaderProps>;
} & Partial<ContextProps>;
