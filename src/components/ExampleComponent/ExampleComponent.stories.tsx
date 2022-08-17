import { Meta, Story } from "@storybook/react/types-6-0";

import { ExampleComponent } from "./";
import { Props } from "./ExampleComponentTypes";

export default {
  title: "Components/Example Component",
  component: ExampleComponent,
} as Meta<Props>;

export const DefaultExample = () => <ExampleComponent text="test" />;

const Template: Story<Props> = ({ text }: Props) => (
  <ExampleComponent text={text} />
);

export const TemplatedExample = Template.bind({ text: "example" });
TemplatedExample.args = { text: "example" };
