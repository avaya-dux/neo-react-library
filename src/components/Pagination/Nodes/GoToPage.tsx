import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

import { TextInput } from "components/TextInput";

interface GoToPageProps {
	currentPageIndex: number;
	delay: number;
	totalPages: number;

	onPageChange: (
		e: React.ChangeEvent<HTMLInputElement> | null,
		newPageIndex: number,
	) => void;

	// translations
	pagesText: string;
	"aria-label": string;
}

export const GoToPage = ({
	currentPageIndex,
	delay,
	totalPages,

	onPageChange,

	// translations
	pagesText,
	"aria-label": ariaLabel,
}: GoToPageProps) => {
	const [value, setValue] = useState(currentPageIndex);

	useEffect(() => {
		setValue(currentPageIndex);
	}, [currentPageIndex]);

	const handleInputChange = useCallback(
		debounce((e, v) => {
			onPageChange(e, v);
		}, delay),
		[],
	);

	return (
		<div className="pagination__go-to-page">
			<TextInput
				aria-label={ariaLabel}
				type="number"
				value={value || ""}
				clearable={false}
				pattern="[0-9]+"
				min={1}
				max={totalPages}
				onChange={(e) => {
					const value = Number(e.target.value);
					handleInputChange(e, value);
					setValue(value);
				}}
			/>

			<span>
				/ {totalPages} {pagesText}
			</span>
		</div>
	);
};
