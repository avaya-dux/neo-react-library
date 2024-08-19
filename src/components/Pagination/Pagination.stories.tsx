import type { Meta, Story } from "@storybook/react";
import { useMemo, useState } from "react";

import { Form, List, ListItem, Sheet, TextInput } from "components";
import { genId } from "utils";

import { Pagination, type PaginationProps } from "./";

export default {
	title: "Components/Pagination",
	component: Pagination,
} as Meta<PaginationProps>;

const BookOfPages = ({
	sectionWidth,
	direction = "ltr",
}: {
	sectionWidth?: number;
	direction?: string;
}) => {
	const paginationId = "default-pagination";
	const logsId = "default-pagination-logs";

	const [pageIndex, setPageIndex] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);

	const [numParagraphs, setNumParagraphs] = useState(100);
	const paragraphArray: JSX.Element[] = useMemo(() => {
		const paragraphs = Array(numParagraphs)
			.fill(0)
			.map((_v: unknown, i: number) => (
				<p key={`paragraph-${i}`}>This is paragraph number: {i}</p>
			));

		const maxPageIndex = Math.ceil(paragraphs.length / itemsPerPage);
		if (pageIndex > maxPageIndex) {
			setPageIndex(maxPageIndex);
		}

		return paragraphs;
	}, [itemsPerPage, numParagraphs, pageIndex]);

	const displayedParagraphs = useMemo(() => {
		const startIndex = (pageIndex - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;

		return paragraphArray.slice(startIndex, endIndex);
	}, [pageIndex, itemsPerPage, paragraphArray]);

	const [logItems, setLogItems] = useState<JSX.Element[]>([]);

	return (
		<main dir={direction}>
			<section>
				<h3>
					Pagination example for paging through a &quot;book&quot; of pages
				</h3>

				<section>
					<Form inline onSubmit={(e) => e.preventDefault()}>
						<TextInput
							clearable={false}
							label="Number of <p> to generate"
							value={numParagraphs}
							onChange={(e) => setNumParagraphs(Number(e.currentTarget.value))}
						/>
					</Form>
				</section>

				<section style={{ width: sectionWidth }}>
					<Sheet title="displayed <p>s">{displayedParagraphs}</Sheet>

					<Pagination
						id={paginationId}
						currentPageIndex={pageIndex}
						itemCount={paragraphArray.length}
						itemsPerPage={itemsPerPage}
						itemsPerPageOptions={[1, 2, 5, 10]}
						onPageChange={(e, newIndex) => {
							e?.preventDefault();
							setLogItems([
								<ListItem key={`${newIndex}-${genId()}`}>
									setting new page index: {newIndex}
								</ListItem>,
								...logItems,
							]);

							setPageIndex(newIndex);
						}}
						onItemsPerPageChange={(e, newItemsPerPage) => {
							e?.preventDefault();
							setLogItems([
								<ListItem key={`${newItemsPerPage}-${genId()}`}>
									setting new items per page: {newItemsPerPage}
								</ListItem>,
								...logItems,
							]);

							setItemsPerPage(newItemsPerPage);

							const maxPageIndex = Math.ceil(
								paragraphArray.length / newItemsPerPage,
							);
							if (pageIndex > maxPageIndex) {
								setPageIndex(maxPageIndex);
							}
						}}
					/>
				</section>
			</section>

			<section>
				<h3>`onChange` logs:</h3>

				<List id={logsId}>{logItems}</List>
			</section>
		</main>
	);
};

export const Default = () => <BookOfPages />;

export const WithRTLSettings = () => (
	<BookOfPages direction="rtl" sectionWidth={500} />
);

export const WithSpaceForFiveNavItems = () => (
	<BookOfPages sectionWidth={500} />
);

export const WithSpaceForSevenNavItems = () => (
	<BookOfPages sectionWidth={600} />
);

export const WithSpaceForTenNavItems = () => <BookOfPages sectionWidth={800} />;

export const SettingTheDefaultIndex = () => {
	const [pageIndex, setPageIndex] = useState(5);

	return (
		<main>
			<section>
				<h3>Setting the default page index to 5</h3>

				<Pagination
					id="default-page-index-pagination"
					currentPageIndex={pageIndex}
					itemCount={100}
					itemsPerPage={5}
					itemsPerPageOptions={[1, 2, 5, 10]}
					onPageChange={(e, newIndex) => {
						e?.preventDefault();
						setPageIndex(newIndex);
					}}
					onItemsPerPageChange={() => null}
				/>
			</section>
		</main>
	);
};

const Template: Story<PaginationProps> = (props: PaginationProps) => (
	<Pagination {...props} />
);

export const Templated = Template.bind({});
Templated.args = {
	id: "templated-pagination",

	currentPageIndex: 1,
	itemCount: 5,
	itemsPerPage: 1,
	itemsPerPageOptions: [1, 2, 3, 4, 5],
	onPageChange: () => null,
	onItemsPerPageChange: () => null,
};

export const TooltipPositions = Template.bind({});
TooltipPositions.args = {
	...Templated.args,
};
