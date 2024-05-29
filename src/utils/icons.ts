import { icons } from "@avaya/neo-icons/neo-icon-info.js";
import type { IconNamesType } from "@avaya/neo-icons/neo-icon-names-type";
import type { IconCategory } from "@avaya/neo-icons/neo-icon-types";

// used by neo-react stories
export const IconNames = icons.map((icon) => icon.name);

// Generates a CSS class name for a given icon name
export const getIconClass = (icon?: IconNamesType) =>
	icon ? `neo-icon-${icon}` : "";

// used by design portal
export const IconCategories: IconCategory[] = [
	...new Set(icons.map((icon) => icon.category as IconCategory)),
];
export interface IconType {
	name: string;
	bidirectional: boolean;
	category: string;
	animated: boolean;
}
export const NeoIcons: IconType[] = icons;

// export neo-icons ish so that neo-react can be the single source of truth for apps that use it
export type { IconCategory, IconNamesType };
