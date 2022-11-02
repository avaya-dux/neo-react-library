import { Meta, Story } from "@storybook/react/types-6-0";

import { Chip, ChipProps, ChipsContainer } from "./";

export default {
  title: "Components/Chips",
  component: Chip,
} as Meta<ChipProps>;

export const Default = () => <Chip>Default Example</Chip>;

export const Closable = () => (
  <ChipsContainer>
    <Chip closable variant="info">
      Closable
    </Chip>
    <Chip>Not Closable</Chip>
    <Chip closable variant="info">
      Also Closable
    </Chip>
  </ChipsContainer>
);

export const ChipsContainerExample = () => (
  <ChipsContainer>
    <Chip variant="default">Default</Chip>
    <Chip variant="alert">Alert</Chip>
    <Chip variant="info">Info</Chip>
    <Chip variant="success">Success</Chip>
    <Chip variant="warning">Warning</Chip>
  </ChipsContainer>
);

const Template: Story<ChipProps> = (props: ChipProps) => <Chip {...props} />;
export const Templated = Template.bind({});
Templated.args = {
  avatarInitials: "",
  children: "Templated Example",
  closable: false,
  closeButtonAriaLabel: "Close",
  disabled: false,
  icon: undefined,
  variant: "default",
};
