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

export const ChipsContainerExamples = () => (
  <div>
    <section>
      <h2>Variants</h2>

      <ChipsContainer>
        <Chip variant="default">Default</Chip>
        <Chip variant="alert">Alert</Chip>
        <Chip variant="info">Info</Chip>
        <Chip variant="success">Success</Chip>
        <Chip variant="warning">Warning</Chip>
      </ChipsContainer>
    </section>

    <section>
      <h2>Disabled Variants</h2>

      <ChipsContainer>
        <Chip disabled variant="default">
          Default
        </Chip>
        <Chip disabled variant="alert">
          Alert
        </Chip>
        <Chip disabled variant="info">
          Info
        </Chip>
        <Chip disabled variant="success">
          Success
        </Chip>
        <Chip disabled variant="warning">
          Warning
        </Chip>
      </ChipsContainer>
    </section>

    <section>
      <h2>Chips with Avatar</h2>

      <ChipsContainer>
        <Chip avatarInitials="D1" variant="default">
          Default
        </Chip>
        <Chip avatarInitials="A1" variant="alert">
          Alert
        </Chip>
        <Chip avatarInitials="I1" variant="info">
          Info
        </Chip>
        <Chip avatarInitials="S1" variant="success">
          Success
        </Chip>
        <Chip avatarInitials="W1" variant="warning">
          Warning
        </Chip>
      </ChipsContainer>
    </section>
  </div>
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
