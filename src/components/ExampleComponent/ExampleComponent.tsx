import { handleAccessbilityError } from "utils";

import type { Props } from "./ExampleComponentTypes";

/**
 * The ExampleComponent does very cool things that are very useful. :rofl:
 *
 * @example
 * <ExampleComponent text="example string" />
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-example-component
 */
export const ExampleComponent = ({ text = "no string passed" }: Props) => {
	if (text === "error") {
		handleAccessbilityError("example error");
	}

	return (
		<div>
			Example Component: <span>{text}</span>
		</div>
	);
};
