import { TooltipCSSPosition, TooltipPosition } from "./TooltipTypes";

export const MultilineClassName = "neo-tooltip__content--multiline";
export const getMultilineClassName = (multiline?: boolean) => {
  switch (multiline) {
    case undefined:
    case true:
      return MultilineClassName;
    case false:
      return undefined;

    default:
      console.error(`Unexpected multiline value encountered: ${multiline}`);
      return MultilineClassName;
  }
};

export const translatePositionToCSSName = (
  passedPosition: Omit<TooltipPosition, "auto">
): TooltipCSSPosition => {
  switch (passedPosition) {
    case "left":
      return "left";
    case "right":
      return "right";
    case "bottom":
      return "down";
    case "top":
      return "up";
    case "top-left":
      return "up-left";
    case "top-right":
      return "up-right";
    case "bottom-left":
      return "down-left";
    case "bottom-right":
      return "down-right";

    default:
      console.error(
        `Unexpected position encountered: ${passedPosition}. Defaulting to default "position='up'"`
      );
      return "up";
  }
};

// variables for `getIdealTooltipPosition()`
const characterPixelWidth = 8;
const tooltipSidePadding = 12;
const tooltipLeftAndRightPadding = tooltipSidePadding * 2;
const tooltipMaxWidth = 300;
const maxCharactersPerLine = 43;
const pixelsPerLineOfText = 20;
const tooltipTopAndBottomPadding = 8 + 8;

/**
 * Returns the CSS Position name based on where the container element is inside of the `window`
 * @param containerDimensions the height and width of the "container" (typically the html document) of the tooltip root element
 * @param label the passed label, used to determine the length+height of the tooltip
 * @param rootElement `tooltipContainerRef.current`, a `<div>` element; or `null`
 *
 * @returns the CSS Position name of the ideal (or default) tooltip position
 *
 * @example
 * getIdealTooltipPosition(
 *  {
 *    height: document.lastElementChild?.clientHeight || 0,
 *    width: document.lastElementChild?.clientWidth || 0,
 *  },
 *  label,
 *  tooltipContainerRef.current
 * )
 */
export const getIdealTooltipPosition = (
  containerDimensions: { height: number; width: number },
  label: string,
  rootElement: HTMLDivElement | null
): TooltipCSSPosition => {
  const { height: containerHeight, width: containerWidth } =
    containerDimensions;

  let result: TooltipPosition = "top";
  if (rootElement === null) return translatePositionToCSSName(result);

  const {
    clientHeight: elementHeight,
    offsetTop,
    offsetLeft,
    offsetHeight,
    offsetWidth,
  } = rootElement;

  const estimatedTooltipTotalWidth =
    label.length * characterPixelWidth + tooltipLeftAndRightPadding;
  const tooltipWidth = Math.min(estimatedTooltipTotalWidth, tooltipMaxWidth);

  const tooltipHeight =
    Math.ceil(label.length / maxCharactersPerLine) * pixelsPerLineOfText +
    tooltipTopAndBottomPadding;

  const canPlaceTop = () => {
    const willTouchScreenTop = offsetTop < tooltipHeight;

    const willTouchScreenLeft =
      offsetLeft - (tooltipWidth - offsetWidth) / 2 < 0;

    const whereTooltipOverlapsOffsetLeft = (tooltipWidth - offsetWidth) / 2;
    const tooltipWidthMinusOverlap =
      tooltipWidth - whereTooltipOverlapsOffsetLeft;
    const willTouchScreenRight =
      containerWidth - offsetLeft - tooltipWidthMinusOverlap < 0;

    return !willTouchScreenTop && !willTouchScreenLeft && !willTouchScreenRight;
  };

  const canPlaceTopLeft = () => {
    const willTouchScreenTop = offsetTop < tooltipHeight;

    const willTouchScreenLeft = offsetLeft < tooltipWidth - tooltipSidePadding;

    return !willTouchScreenTop && !willTouchScreenLeft;
  };

  const canPlaceTopRight = () => {
    const willTouchScreenTop = offsetTop < tooltipHeight;

    const offsetRight = containerWidth - offsetLeft - offsetWidth;
    const willTouchScreenRight =
      offsetRight < tooltipWidth - tooltipSidePadding;

    return !willTouchScreenTop && !willTouchScreenRight;
  };

  const canPlaceBottom = () => {
    const offsetBottom = containerHeight - offsetTop - offsetHeight;
    const willTouchScreenBottom = offsetBottom < tooltipHeight;

    const willTouchScreenLeft =
      offsetLeft - (tooltipWidth - offsetWidth) / 2 < 0;

    const whereTooltipOverlapsOffsetLeft = (tooltipWidth - offsetWidth) / 2;
    const tooltipWidthMinusOverlap =
      tooltipWidth - whereTooltipOverlapsOffsetLeft;
    const willTouchScreenRight =
      containerWidth - offsetLeft - tooltipWidthMinusOverlap < 0;

    return !(
      willTouchScreenBottom ||
      willTouchScreenLeft ||
      willTouchScreenRight
    );
  };

  const canPlaceBottomLeft = () => {
    const offsetBottom = containerHeight - offsetTop - offsetHeight;
    const willTouchScreenBottom = offsetBottom < tooltipHeight;

    const willTouchScreenLeft = offsetLeft < tooltipWidth - tooltipSidePadding;

    return !willTouchScreenBottom && !willTouchScreenLeft;
  };

  const canPlaceBottomRight = () => {
    const offsetBottom = containerHeight - offsetTop - offsetHeight;
    const willTouchScreenBottom = offsetBottom < tooltipHeight;

    const offsetRight = containerWidth - offsetLeft - offsetWidth;
    const willTouchScreenRight =
      offsetRight < tooltipWidth - tooltipSidePadding;

    return !willTouchScreenBottom && !willTouchScreenRight;
  };

  const canPlaceLeft = () => {
    const willTouchScreenLeft = offsetLeft < tooltipWidth;
    const willTouchScreenTop = offsetTop < (tooltipHeight - elementHeight) / 2;

    const availableWindowSpaceBelowElement =
      containerHeight - (offsetTop + offsetHeight);
    const willTouchScreenBottom =
      availableWindowSpaceBelowElement < (tooltipHeight - elementHeight) / 2;

    return !(
      willTouchScreenLeft ||
      willTouchScreenTop ||
      willTouchScreenBottom
    );
  };

  const canPlaceRight = () => {
    const availableWindowSpaceToRightOfElement =
      containerWidth - offsetLeft - offsetWidth;
    const willTouchScreenRight =
      availableWindowSpaceToRightOfElement < tooltipWidth;

    const willTouchScreenTop = offsetTop < (tooltipHeight - elementHeight) / 2;

    const availableWindowSpaceBelowElement =
      containerHeight - (offsetTop + offsetHeight);
    const willTouchScreenBottom =
      availableWindowSpaceBelowElement < (tooltipHeight - offsetHeight) / 2;

    return !(
      willTouchScreenRight ||
      willTouchScreenTop ||
      willTouchScreenBottom
    );
  };

  if (canPlaceTop()) {
    result = "top";
  } else if (canPlaceTopLeft()) {
    result = "top-left";
  } else if (canPlaceTopRight()) {
    result = "top-right";
  } else if (canPlaceBottom()) {
    result = "bottom";
  } else if (canPlaceBottomLeft()) {
    result = "bottom-left";
  } else if (canPlaceBottomRight()) {
    result = "bottom-right";
  } else if (canPlaceLeft()) {
    result = "left";
  } else if (canPlaceRight()) {
    result = "right";
  } else {
    console.warn(
      `unable to find ideal position for tooltip placement, setting to default position: ${result}`
    );
  }

  return translatePositionToCSSName(result);
};
