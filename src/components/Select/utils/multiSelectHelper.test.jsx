import { calculateWidthsUntilExceed } from "./multiSelectHelper";

describe("calculateWidthsUntilExceed", () => {
	it("should return initial values when widths array is empty", () => {
		const containerWidth = 100;
		const widths = [];
		const expected = { totalWidth: 0, index: -1, hiddenCount: 0 };
		expect(calculateWidthsUntilExceed(containerWidth, widths)).toEqual(
			expected,
		);
	});

	it("should calculate totalWidth and index correctly without exceeding containerWidth", () => {
		const containerWidth = 150;
		const widths = [50, 50, 50]; // Total = 150, exactly the container width
		const expected = { totalWidth: 150, index: 2, hiddenCount: 0 };
		expect(calculateWidthsUntilExceed(containerWidth, widths, 0)).toEqual(
			expected,
		);
	});

	it("should stop adding widths when exceeding containerWidth and count hidden elements", () => {
		const containerWidth = 100;
		const widths = [30, 30, 30, 30]; // Exceeds at the last element
		const expected = { totalWidth: 60, index: 1, hiddenCount: 2 }; // Last one is hidden
		expect(calculateWidthsUntilExceed(containerWidth, widths, 30)).toEqual(
			expected,
		);
	});

	it("should handle single element arrays correctly", () => {
		const containerWidth = 50;
		const widths = [60]; // Single element exceeding container width
		const expected = { totalWidth: 0, index: -1, hiddenCount: 1 }; // One hidden, none shown
		expect(calculateWidthsUntilExceed(containerWidth, widths, 0)).toEqual(
			expected,
		);
	});

	it("should return all widths as visible if total does not exceed containerWidth", () => {
		const containerWidth = 200;
		const widths = [40, 40, 40, 40]; // Total = 160, under the container width
		const expected = { totalWidth: 160, index: 3, hiddenCount: 0 }; // All visible
		expect(calculateWidthsUntilExceed(containerWidth, widths, 20)).toEqual(
			expected,
		);
	});
});
