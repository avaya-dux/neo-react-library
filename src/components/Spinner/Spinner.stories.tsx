import { Meta, Story } from "@storybook/react";

import { SpinnerProps, Spinner } from "./";

export default {
  title: "Components/Spinner",
  component: Spinner,
} as Meta<SpinnerProps>;

export const Default = () => (
  <main>
    <section>
      <div>no props</div>
      <Spinner />
    </section>
    <section>
      <div>size=&quot;md&quot;</div>
      <Spinner size="md" />
    </section>
    <section>
      <div>size=&quot;lg&quot;</div>
      <Spinner size="lg" />
    </section>
    <section>
      <div>size=&quot;xl&quot;</div>
      <Spinner size="xl" />
    </section>
  </main>
);

const Template: Story<SpinnerProps> = ({ size }: SpinnerProps) => (
  <Spinner size={size} />
);

export const Templated = Template.bind({});
Templated.args = {};
