import { useEffect, useState } from "react";

import { TextInput } from "components/TextInput";
import { Keys } from "utils";

import type { PaginationProps } from "../PaginationTypes";

import "./GoToPage_shim.css";

export interface GoToPageProps extends Pick<PaginationProps, "onPageChange"> {
	currentPageIndex: number;
	totalPages: number;

	// translations
	pagesText: string;
	"aria-label": string;
}

export const GoToPage = ({
	currentPageIndex,
	totalPages,

	onPageChange,

	// translations
	pagesText,
	"aria-label": ariaLabel,
}: GoToPageProps) => {
	// control the input so that the user can force a page change (e.g. clicking "next")
	const [value, setValue] = useState(currentPageIndex);
	useEffect(() => {
		setValue(currentPageIndex);
	}, [currentPageIndex]);

	return totalPages <= 1 ? (
		<div />
	) : (
		<div className="pagination__go-to-page">
			<TextInput
				aria-label={ariaLabel}
				type="number"
				value={value}
				clearable={false}
				pattern="[0-9]+"
				min={1}
				max={totalPages}
				onChange={(e) => {
					setValue((e.target as HTMLInputElement).valueAsNumber);
				}}
				onKeyUp={(e) => {
					if (e.key === Keys.ENTER) {
						let v = (e.target as HTMLInputElement).valueAsNumber || 1;
						if (v < 1) v = 1;
						if (v > totalPages) v = totalPages;

						onPageChange(e, v);
					}
				}}
			/>

			<span>/ {totalPages.toLocaleString()}</span>
			<span>{pagesText.toLocaleString()}</span>
		</div>
	);
};
