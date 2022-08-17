import { Meta, Story } from "@storybook/react/types-6-0";

import { Button } from "components/Button";

import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as Meta<BreadcrumbsProps>;

const currentPageLink = { href: "#current_page", text: "Current Page" };
const description = "Breadcrumb Example page description";
const button1 = (
  <Button data-testid="neo-button1" id="test-axe1">
    Save
  </Button>
);
const button2 = (
  <Button data-testid="neo-button2" id="test-axe2">
    Edit
  </Button>
);
const button3 = (
  <Button data-testid="neo-button3" id="test-axe3">
    Update
  </Button>
);

const Template: Story<BreadcrumbsProps> = (props: BreadcrumbsProps) => (
  <Breadcrumbs {...props} />
);

export const CurrentPageOnly = Template.bind({});
CurrentPageOnly.args = {
  currentPageLink,
};

export const HavingOneLink = Template.bind({});
const oneParent = [{ href: "#parent1", text: "parent1" }];
HavingOneLink.args = {
  links: oneParent,
  currentPageLink,
  description,
};

export const HavingTwoLinks = Template.bind({});
const twoParents = [
  { href: "#parent1", text: "Previous Page 1" },
  { href: "#parent2", text: "previous page 2" },
];
HavingTwoLinks.args = {
  links: twoParents,
  currentPageLink,
  description,
};

export const CurrentPageAndOneButton = Template.bind({});
CurrentPageAndOneButton.args = {
  currentPageLink,
  description,
  buttons: [button1],
};

export const HavingOneLinkAndTwoButtons = Template.bind({});
HavingOneLinkAndTwoButtons.args = {
  links: oneParent,
  currentPageLink,
  description,
  buttons: [button1, button2],
};

export const HavingTwoLinksAndTwoButtons = Template.bind({});

HavingTwoLinksAndTwoButtons.args = {
  links: twoParents,
  currentPageLink,
  description,
  buttons: [button1, button2],
};

export const HavingTwoLinksAndThreeButtons = Template.bind({});

HavingTwoLinksAndThreeButtons.args = {
  links: twoParents,
  currentPageLink,
  description,
  buttons: [button1, button2, button3],
};
