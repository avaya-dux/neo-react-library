import type { Meta, Story } from "@storybook/react";

import { Shimmer, type ShimmerProps } from "./";

export default {
	title: "Components/Shimmer",
	component: Shimmer,
} as Meta<ShimmerProps>;

export const Default = () => <Shimmer />;

const Template: Story<ShimmerProps> = (props: ShimmerProps) => (
	<Shimmer {...props} />
);

export const Templated = Template.bind({});
Templated.args = { loopInfinitely: false, shape: "rectangle", size: "md" };
