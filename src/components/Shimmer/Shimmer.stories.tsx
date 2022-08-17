import { Meta, Story } from "@storybook/react/types-6-0";

import { Shimmer, ShimmerProps } from "./";

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
