/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { TableNext } from "./";

const meta: Meta<typeof TableNext> = {
  component: TableNext,
  title: "Components/Table (Next)",
};
export default meta;

type PanelTabsAndAuthor = React.ComponentProps<typeof TableNext> & {
  author?: string;
};
type Story = StoryObj<PanelTabsAndAuthor>;

export const Basic: Story = {
  render: () => {
    return <TableNext />;
  },
};
