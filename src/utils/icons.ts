import { icons } from "@avaya/neo-icons/neo-icon-info.js";
import { IconNamesType } from "@avaya/neo-icons/neo-icon-names-type";

export type { IconNamesType };

export const IconNames = icons.map((icon) => icon.name);

export const getIconClass = (icon?: IconNamesType) =>
  icon ? `neo-icon-${icon}` : "";
