import { Meta, Story } from "@storybook/react";

import { Avatar, AvatarProps, SmallAvatarProps } from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
} as Meta<AvatarProps>;

export const AvatarWithStatusIndicator = () => (
  <main>
    <section style={{ width: 200, paddingBottom: 10 }}>
      <h4>Do Not Disturb</h4>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar status="do-not-disturb" size="sm" />
        <Avatar status="do-not-disturb" size="md" />
        <Avatar status="do-not-disturb" size="lg" />
      </div>
    </section>

    <section style={{ width: 200, paddingBottom: 10 }}>
      <h4>Busy</h4>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar status="busy" size="sm" />
        <Avatar status="busy" size="md" />
        <Avatar status="busy" size="lg" />
      </div>
    </section>

    <section style={{ width: 200, paddingBottom: 10 }}>
      <h4>Available</h4>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar status="available" size="sm" />
        <Avatar status="available" size="md" />
        <Avatar status="available" size="lg" />
      </div>
    </section>

    <section style={{ width: 200, paddingBottom: 10 }}>
      <h4>Offline</h4>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar status="offline" size="sm" />
        <Avatar status="offline" size="md" />
        <Avatar status="offline" size="lg" />
      </div>
    </section>

    <section style={{ width: 200, paddingBottom: 10 }}>
      <h4>Away</h4>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar status="away" size="sm" />
        <Avatar status="away" size="md" />
        <Avatar status="away" size="lg" />
      </div>
    </section>
  </main>
);

export const Default = () => <Avatar label="Jimmy Bob" />;

export const Template: Story<AvatarProps> = (props: AvatarProps) => (
  <Avatar {...props} />
);

Template.args = { label: "Jimmy Bob" };

const SmallTemplate: Story<SmallAvatarProps> = (props: SmallAvatarProps) => (
  <Avatar {...props} />
);

export const SmallBot = SmallTemplate.bind({});
SmallBot.args = {
  label: "Small Bot",
  variant: "bot",
  size: "sm",
};
