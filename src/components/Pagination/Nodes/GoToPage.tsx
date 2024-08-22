import debounce from "lodash.debounce";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";

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

	const onPageChangeWrapper = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = Number(e.target.value);
			if (value) {
				onPageChange(e, value);
			}
		},
		[onPageChange],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const onPageChangeDebounced = useCallback(
		debounce(onPageChangeWrapper, delay),
		[onPageChangeWrapper, delay],
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
					setValue(Number(e.target.value));
					onPageChangeDebounced(e);
				}}
			/>

			<span>
				/ {totalPages} {pagesText}
			</span>
		</div>
	);
};
