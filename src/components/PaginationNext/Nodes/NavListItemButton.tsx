import clsx from "clsx";

import { Button } from "components/Button";

import type { PaginationSharedProps } from "../PaginationTypes";

import "./NavListItemButton_shim.css";

/**
 * This component is used by the `PaginationNavigation` component and the
 * helper method `buildNavItems` to render a single `<li>` element that
 * links to a "page" of pagination data.
 *
 * @example
 * <NavListItemButton
 *  key={`unique-key-${index}`}
 *  isCurrentPage={index === currentPageIndex}
 *  onPageChange={onPageChange}
 *  pageToNavigateTo={index}
 * />
 */
export const NavListItemButton = ({
	isCurrentPage,
	onPageChange,
	pageToNavigateTo,
}: {
	pageToNavigateTo: number;
	isCurrentPage?: boolean;
} & Pick<PaginationSharedProps, "onPageChange">) => {
	const variant = isCurrentPage ? "primary" : "tertiary";

	return (
		<li>
			<Button
				className={clsx(
					"neo-btn-square",
					`neo-btn-square-${variant} neo-btn-square-${variant}--info`,
				)}
				onClick={(e) => {
					if (!isCurrentPage) {
						onPageChange(e, pageToNavigateTo);
					}
				}}
				variant={variant}
				disabled={isCurrentPage}
			>
				{pageToNavigateTo.toLocaleString()}
			</Button>
		</li>
	);
};
