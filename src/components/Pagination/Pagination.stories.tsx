import type { Meta, StoryObj } from "@storybook/react";

import type { ComponentProps, ComponentType } from "react";
import { useState } from "react";

import { Pagination } from ".";

const meta: Meta<typeof Pagination> = {
	component: Pagination,
	title: "Components/Pagination",
	args: {
		id: "templated-pagination",
		currentPageIndex: 1,
		itemCount: 50000,
		itemsPerPage: 20,
		itemsPerPageOptions: [20, 50, 100],
		onPageChange: () => null,
		onItemsPerPageChange: () => null,
	},
	argTypes: {
		// don't show the id prop
		id: { table: { disable: true } },

		// don't show JS/React specific props
		onPageChange: { table: { disable: true } },
		onItemsPerPageChange: { table: { disable: true } },
		itemDisplayType: { table: { disable: true } }, // TODO: (NEO-2329) this is deprecated, remove
		leftNode: { table: { disable: true } },
		centerNode: { table: { disable: true } },
		rightNode: { table: { disable: true } },

		// don't show translations
		backIconButtonText: { table: { disable: true } },
		nextIconButtonText: { table: { disable: true } },
		pagesText: { table: { disable: true } },
		goToPageText: { table: { disable: true } },
		itemsPerPageLabel: { table: { disable: true } },
	},
};
export default meta;

type PaginationStoryArgs = ComponentProps<typeof Pagination> & {
	header: string;
};
type Story = StoryObj<PaginationStoryArgs>;

const Template: Story = {
	args: {
		header: "Pagination Example",
	},
	render: ({
		currentPageIndex,
		itemsPerPage: initialItemsPerPage,
		header = "Pagination Example",
		...rest
	}) => {
		const [pageIndex, setPageIndex] = useState(currentPageIndex);
		const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

		return (
			<main>
				<h1>{header}</h1>

				<Pagination
					{...rest}
					itemsPerPage={itemsPerPage}
					currentPageIndex={pageIndex}
					onPageChange={(_, newIndex) => setPageIndex(newIndex)}
					onItemsPerPageChange={(newItemsPerPage) => {
						setItemsPerPage(newItemsPerPage);

						if (itemsPerPage < newItemsPerPage && pageIndex > 1) {
							const { itemCount } = rest;
							const lastPage = Math.ceil(itemCount / newItemsPerPage);
							setPageIndex(lastPage);
						}
					}}
				/>
			</main>
		);
	},
};

export const Basic = {
	...Template,
	name: "Basic usage",
	args: { header: "Basic usage" },
};

export const DefaultIndex = {
	...Template,
	name: "Setting the default index",
	args: { currentPageIndex: 5, header: "Setting the default index" },
};

export const AsRTL: Story = {
	...Template,
	name: "As RTL",
	args: { header: "Pagination when in RTL mode" },
	decorators: [
		(Story: ComponentType) => (
			<div dir="rtl">
				<Story />
			</div>
		),
	],
};

export const DarkMode: Story = {
	...Template,
	name: "Dark mode",
	args: { header: "Pagination in dark mode" },
	decorators: [
		(Story: ComponentType) => (
			<div className="neo-global-colors neo-dark" style={{ padding: "2rem" }}>
				<Story />
			</div>
		),
	],
};

// TODO: (NEO-2298) review old stories with Matt to confirm which of these we want to support
