/**
 * Displays the total number of items.
 *
 * @example
 * <PaginationItemDisplay
 *  itemCount={50}
 * />
 */
export const PaginationItemDisplay = ({ itemCount }: { itemCount: number }) => {
	return <bdi>{itemCount.toLocaleString()}</bdi>;
};
