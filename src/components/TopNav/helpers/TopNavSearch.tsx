import { TextInput, type TextInputProps } from "components/TextInput";

/**
 * Provides several defaults for the TextInput component making it easier
 * to be used with the TopNav component.
 *
 * @example
 * <TopNav
    logo={<Image isDecorativeOrBranding src="link/to/image.png"/>}
    search={<TopNav.Search onChange={handleChange} />}
    title="Product Name"
  />
 *
 * @see https://design.avayacloud.com/components/web/input-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-top-navigation--search-example
 */
export const TopNavSearch = ({
	"aria-label": ariaLabel = "Search",
	clearable = true,
	disabled = false,
	startIcon = "search",

	...rest
}: TextInputProps) => (
	<TextInput
		aria-label={ariaLabel}
		clearable={clearable}
		disabled={disabled}
		startIcon={startIcon}
		type="search"
		{...rest}
	/>
);
