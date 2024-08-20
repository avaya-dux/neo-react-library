import { useState } from "react";

import { TextInput } from "components/TextInput";

export const GoToPage = ({
	currentPageIndex,
	totalPages,
	onPageChange,
	pagesText = "pages",
	"aria-label": ariaLabel = "Go to page",
}: {
	currentPageIndex: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
	pagesText?: string;
	"aria-label"?: string;
}) => {
	const [newPage, setNewPage] = useState(currentPageIndex);

	const handlePageChange = () => {
		const newPageNumber =
			newPage > totalPages ? totalPages : newPage < 1 ? 1 : newPage;
		onPageChange(newPageNumber);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handlePageChange();
		}
	};

	return (
		<div className="pagination__go-to-page">
			<TextInput
				type="number"
				clearable={false}
				aria-label={ariaLabel}
				value={newPage}
				pattern="[0-9]+"
				onChange={(e) => {
					setNewPage(Number.parseInt(e.target.value, 10));
				}}
				onKeyPress={handleKeyPress}
			/>

			<span>
				{" "}
				/ {totalPages} {pagesText}
			</span>
		</div>
	);
};
