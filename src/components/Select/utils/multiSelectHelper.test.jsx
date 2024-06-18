import { calculateVisibleChips } from "./multiSelectHelper";

describe("calculateVisibleChips", () => {
	it("should return initial values when widths array is empty", () => {
		const containerWidth = 100;
		const widths = [];
		const expected = { totalVisibleWidth: 0, lastVisibleIndex: -1, collapsedCount: 0 };
		expect(calculateVisibleChips(containerWidth, widths, 50)).toEqual(expected);
	});

	it("should calculate totalVisibleWidth and lastVisibleIndex correctly without exceeding containerWidth", () => {
		const containerWidth = 150;
		const widths = [50, 50, 50]; // exactly the container width
		const expected = {
			totalVisibleWidth: 150,
			lastVisibleIndex: 2,
			collapsedCount: 0,
		};
		expect(calculateVisibleChips(containerWidth, widths, 0)).toEqual(expected);
	});

	it("should stop adding widths when exceeding containerWidth and count hidden elements", () => {
		const containerWidth = 100;
		const widths = [30, 30, 30, 30];
		const expected = { totalVisibleWidth: 60, lastVisibleIndex: 1, collapsedCount: 2 };
		expect(calculateVisibleChips(containerWidth, widths, 30)).toEqual(expected);
	});

	it("should handle single element arrays correctly", () => {
		const containerWidth = 50;
		const widths = [60]; // Single element exceeding container width
		const expected = { totalVisibleWidth: 0, lastVisibleIndex: -1, collapsedCount: 1 }; // One hidden, none shown
		expect(calculateVisibleChips(containerWidth, widths, 0)).toEqual(expected);
	});

	it("should return all widths as visible if total does not exceed containerWidth", () => {
		const containerWidth = 200;
		const widths = [40, 40, 40, 40]; // Total = 160, less than containerWidth
		const expected = {
			totalVisibleWidth: 160,
			lastVisibleIndex: 3,
			collapsedCount: 0,
		}; // All visible
		expect(calculateVisibleChips(containerWidth, widths, 20)).toEqual(expected);
	});
});
