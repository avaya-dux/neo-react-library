import { useEffect, useState } from "react";

import { TextInput } from "components/TextInput";
import { useIsInitialRender } from "utils";

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
	const isInitialRender = useIsInitialRender();

	/* NOTE: we need to control both `value` and `event`
	 * `value` so that we can respond to changes in `currentPageIndex` and the user typing
	 * `event` so that we can debounce `onPageChange` */
	const [value, setValue] = useState(currentPageIndex);
	const [event, setEvent] =
		useState<React.ChangeEvent<HTMLInputElement> | null>(null);

	useEffect(() => {
		setValue(currentPageIndex);
	}, [currentPageIndex]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: only track "real" changes to `newPage`
	useEffect(() => {
		const newPage = event ? Number.parseInt(event.target.value, 10) : null;

		// debounce the page change
		if (!isInitialRender && !!newPage && newPage !== currentPageIndex) {
			const handler = setTimeout(() => onPageChange(event, newPage), delay);
			return () => clearTimeout(handler);
		}
	}, [event]);

	return (
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
					setEvent(e);
					setValue(Number.parseInt(e.target.value, 10));
				}}
			/>

			<span>
				/ {totalPages} {pagesText}
			</span>
		</div>
	);
};
