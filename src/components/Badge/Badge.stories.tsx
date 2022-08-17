import { Meta, Story } from "@storybook/react/types-6-0";

import { Badge, BadgeProps } from "./Badge";

export default {
  title: "Components/Badge",
  component: Badge,
} as Meta<BadgeProps>;

const badgeData = "99";

const defaultBadgeProps = {
  data: badgeData,
  "aria-label": `Badge representing ${badgeData}`,
};

const Template: Story<BadgeProps> = (props: BadgeProps) => <Badge {...props} />;

export const FreefloatingBadge = Template.bind({});
FreefloatingBadge.args = {
  ...defaultBadgeProps,
};

const WithString: Story<BadgeProps> = (props: BadgeProps) => (
  <Badge {...props}>This is a badge on text</Badge>
);

export const BadgeWithString = WithString.bind({});
BadgeWithString.args = {
  ...defaultBadgeProps,
};

const WithIcon: Story<BadgeProps> = (props: BadgeProps) => (
  <Badge {...props}>
    <span className="neo-icon-customer"></span>
  </Badge>
);

export const BadgeWithIcon = WithIcon.bind({});
BadgeWithIcon.args = {
  ...defaultBadgeProps,
};

const WithTabs: Story<BadgeProps> = (props: BadgeProps) => (
  <div className="neo-tabs" role="tablist">
    <ul className="neo-tabs__nav">
      <Badge {...props}>
        <li className="neo-tabs__item neo-tabs__item--active">
          <a href="/#" role="tab" aria-selected="true">
            Tab 1
          </a>
        </li>
      </Badge>
    </ul>
  </div>
);

export const BadgeWithTabs = WithTabs.bind({});
BadgeWithTabs.args = {
  ...defaultBadgeProps,
};
