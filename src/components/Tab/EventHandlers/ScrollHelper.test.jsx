import {
  calculateLeftMoveAmount,
  calculateRightMoveAmount,
  canMoveNextTabToLeft,
  canMovePreviousTabToRight,
  getNextTabToMoveLeft,
  getPreviousTabToMoveRight,
} from "./ScrollHelper";

const sum = (widths) => {
  return widths.reduce((sum, current) => sum + current);
};

describe("canMovePreviousTabToRight", () => {
  it("when leftOffset === 0 and containerWidth > viewPortWidth, should return false", () => {
    const leftOffset = 0;
    const containerWidth = 200;
    const viewPortWidth = 100;
    expect(
      canMovePreviousTabToRight(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
  it("when leftOffset < 0 and containerWidth > viewPortWidth, should return false", () => {
    const leftOffset = -10;
    const containerWidth = 200;
    const viewPortWidth = 100;
    expect(
      canMovePreviousTabToRight(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
  it("when leftOffset > 0 and containerWidth > viewPortWidth, should return true", () => {
    const leftOffset = 100;
    const containerWidth = 200;
    const viewPortWidth = 100;
    expect(
      canMovePreviousTabToRight(leftOffset, containerWidth, viewPortWidth),
    ).toBeTruthy();
  });
  it("when ontainerWidth === viewPortWidth, should return false", () => {
    const leftOffset = 100;
    const containerWidth = 100;
    const viewPortWidth = 100;
    expect(
      canMovePreviousTabToRight(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
  it("when containerWidth < viewPortWidth, should return false", () => {
    const leftOffset = 0;
    const containerWidth = 50;
    const viewPortWidth = 100;
    expect(
      canMovePreviousTabToRight(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
});

describe("canMoveNextTabToLeft", () => {
  it("viewPortWidth === containerWidth, should return false", () => {
    const leftOffset = 100;
    const viewPortWidth = 100;
    const containerWidth = viewPortWidth;
    expect(
      canMoveNextTabToLeft(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
  it("viewPortWidth > containerWidth, should return false", () => {
    const leftOffset = 100;
    const containerWidth = 100;
    const viewPortWidth = containerWidth + 100;
    expect(
      canMoveNextTabToLeft(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
  it("when leftOffset + viewPortWidth < containerWidth and containerWidth > viewPortWidth, should return true", () => {
    const leftOffset = 0;
    const containerWidth = 200;
    const viewPortWidth = 100;
    expect(
      canMoveNextTabToLeft(leftOffset, containerWidth, viewPortWidth),
    ).toBeTruthy();
  });
  it("when leftOffset + viewPortWidth === containerWidth and containerWidth > viewPortWidth, should return false", () => {
    const leftOffset = 100;
    const containerWidth = 200;
    const viewPortWidth = 100;
    expect(
      canMoveNextTabToLeft(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
  it("when leftOffset + viewPortWidth > containerWidth and containerWidth > viewPortWidth, should return false", () => {
    const leftOffset = 150;
    const containerWidth = 200;
    const viewPortWidth = 100;
    expect(
      canMoveNextTabToLeft(leftOffset, containerWidth, viewPortWidth),
    ).toBeFalsy();
  });
});

describe("getPreviousTabToMoveRight", () => {
  it("when leftOffset = 0, should return index [-1, 0]", () => {
    const leftOffset = 0;
    const tab0 = 100;
    const tab1 = 100;
    expect(getPreviousTabToMoveRight(leftOffset, [tab0, tab1])).toEqual([
      -1, 0,
    ]);
  });
  it("when leftOffset === tab0, should return [0, 0]", () => {
    const leftOffset = 100;
    const tab0 = leftOffset;
    const tab1 = 100;
    expect(getPreviousTabToMoveRight(leftOffset, [tab0, tab1])).toEqual([0, 0]);
  });
  it("when tab0 < leftOffset < tab0 + tab1, should return [1, 150]", () => {
    const leftOffset = 150;
    const tab0 = 100;
    const tab1 = 200;
    const overshoot = tab0 + tab1 - leftOffset;
    expect(getPreviousTabToMoveRight(leftOffset, [tab0, tab1])).toEqual([
      1,
      overshoot,
    ]);
  });
  it("when leftOffset === all tab widths, should return [last index, 0]", () => {
    const leftOffset = 300;
    const tab0 = 100;
    const tab1 = 100;
    const tab2 = 100;
    const overshoot = tab0 + tab1 + tab2 - leftOffset;
    expect(getPreviousTabToMoveRight(leftOffset, [tab0, tab1, tab2])).toEqual([
      2,
      overshoot,
    ]);
  });
  it("when leftOffset > all tab widths, should return [last index, sum - leftOffset]", () => {
    const leftOffset = 350;
    const tab0 = 100;
    const tab1 = 100;
    const tab2 = 100;
    const overshoot = tab0 + tab1 + tab2 - leftOffset;
    expect(getPreviousTabToMoveRight(leftOffset, [tab0, tab1, tab2])).toEqual([
      2,
      overshoot,
    ]);
  });
});

describe("getNextTabToMoveLeft", () => {
  it("when leftOffset + viewPortWidth === sum of all tab widths, should return [last index, 0]", () => {
    const leftOffset = 100;
    const viewPortWidth = 100;
    const tabWidths = [50, 50, 50, 50];
    expect(getNextTabToMoveLeft(leftOffset, viewPortWidth, tabWidths)).toEqual([
      tabWidths.length - 1,
      0,
    ]);
  });
  it("when leftOffset + viewPortWidth >  sum of all tab widths, should return [last index, sum of tabWidths - leftOffset - viewPortWidth]", () => {
    const leftOffset = 100;
    const viewPortWidth = 200;
    const tabWidths = [50, 50, 50, 50];

    expect(getNextTabToMoveLeft(leftOffset, viewPortWidth, tabWidths)).toEqual([
      tabWidths.length - 1,
      sum(tabWidths) - leftOffset - viewPortWidth,
    ]);
  });
});

describe("calculateLeftMoveAmount", () => {
  it("when index === last index and overshoot === 0, should return 0", () => {
    const tabWidths = [50, 60, 70, 80];
    const overshoot = 0;
    expect(
      calculateLeftMoveAmount(tabWidths.length - 1, overshoot, tabWidths),
    ).toBe(0);
  });
  it("when index === last index and overshoot < 0, should return 0", () => {
    const tabWidths = [50, 60, 70, 80];
    const overshoot = -10;
    expect(
      calculateLeftMoveAmount(tabWidths.length - 1, overshoot, tabWidths),
    ).toBe(0);
  });
  it("when overshoot = 0 and index is not the , should return full tab width", () => {
    const tabWidth = 567;
    expect(calculateLeftMoveAmount(1, 0, [100, tabWidth, 100, 100])).toBe(
      tabWidth,
    );
  });
  it("when overshoot is more than half tab width and previous tab exists, should return tabWidth - overshoot + previous tab width", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    const previousTabWidth = 100;
    expect(
      calculateLeftMoveAmount(1, overshoot, [
        previousTabWidth,
        tabWidth,
        200,
        300,
      ]),
    ).toBe(tabWidth - overshoot + previousTabWidth);
  });

  it("when overshoot is more than half tab width and there is no previous tab, should return tabWidth - overshoot", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    expect(calculateLeftMoveAmount(0, overshoot, [tabWidth, 200, 300])).toBe(
      tabWidth - overshoot,
    );
  });
});

describe("calculateRightMoveAmount", () => {
  it("when index === -1, should return 0", () => {
    const index = -1;
    expect(calculateRightMoveAmount(index, 123, [])).toBe(0);
  });
  it("when overshoot = 0, should return full tab width", () => {
    const tabWidth = 567;
    expect(calculateRightMoveAmount(1, 0, [100, tabWidth, 100, 100])).toBe(
      tabWidth,
    );
  });
  it("when overshoot is more than half tab width and next tab exists, should return tabWidth - overshoot + next tab width", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    const nextTabWidth = 100;
    expect(
      calculateRightMoveAmount(1, overshoot, [
        100,
        tabWidth,
        nextTabWidth,
        300,
      ]),
    ).toBe(tabWidth - overshoot + nextTabWidth);
  });

  it("when overshoot is more than half tab width and there is no next tab, should return tabWidth - overshoot", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    expect(calculateRightMoveAmount(2, overshoot, [200, 300, tabWidth])).toBe(
      tabWidth - overshoot,
    );
  });
});
