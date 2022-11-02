import { Meta, Story } from "@storybook/react/types-6-0";

import { Chip, ChipProps, ChipsContainer } from "./";

export default {
  title: "Components/Chips",
  component: Chip,
} as Meta<ChipProps>;

export const Default = () => <Chip>Default Example</Chip>;

export const Closable = () => (
  <ChipsContainer>
    <Chip closable>Closable</Chip>
    <Chip>Not Closable</Chip>
    <Chip closable>Also Closable</Chip>
  </ChipsContainer>
);

export const Variants = () => (
  <ChipsContainer>
    <Chip variant="default">Default</Chip>
    <Chip variant="alert">Alert</Chip>
    <Chip variant="info">Info</Chip>
    <Chip variant="success">Success</Chip>
    <Chip variant="warning">Warning</Chip>
  </ChipsContainer>
);

const Template: Story<ChipProps> = (props: ChipProps) => <Chip {...props} />;
export const TemplatedExample = Template.bind({});
TemplatedExample.args = {
  avatarInitials: "",
  children: "Templated Example",
  closable: false,
  closeButtonAriaLabel: "Close",
  disabled: false,
  icon: undefined,
  variant: "default",
};
