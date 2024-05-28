import { SelectOptionProps } from "./utils/SelectTypes";

/**
 * If no `value`, `children` is assigned as the value.
 *
 * @example
 * <SelectOption>Apple</SelectOption>
 *
 * @example
 * <SelectOption value="pear">Pear</SelectOption>
 *
 * @example
 * <SelectOption value="gravel" disabled>Gravel</SelectOption>
 *
 * @example
 * <SelectOption value="broccoli" helperText="Vegetable">Broccoli</SelectOption>
 *
 * @see https://design.avayacloud.com/components/web/select-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-select
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SelectOption = (_: SelectOptionProps) => {
	throw new Error(
		"This shouldn't have been called, Internal Select should have been used.",
	);
};

SelectOption.displayName = "SelectOption";
