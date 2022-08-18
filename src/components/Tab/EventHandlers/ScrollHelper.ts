import log from "loglevel";

const logger = log.getLogger("tab-event-handler-scroll-helper");
logger.disableAll();

export function canMovePreviousTabToRight(
  leftOffset: number,
  containerWidth: number,
  viewPortWidth: number
) {
  logger.debug(
    `viewPortWidth=${viewPortWidth} containerWidth=${containerWidth} leftOffset=${leftOffset}`
  );
  if (viewPortWidth >= containerWidth) {
    return false;
  }

  return leftOffset > 0;
}

export function canMoveNextTabToLeft(
  leftOffset: number,
  containerWidth: number,
  viewPortWidth: number
) {
  if (viewPortWidth >= containerWidth) {
    return false;
  }
  return leftOffset + viewPortWidth < containerWidth;
}

export function calculateRightMoveAmount(
  index: number,
  overshoot: number,
  tabWidths: number[]
) {
  if (index === -1) {
    return 0;
  } else {
    const tabWidth = tabWidths[index];
    if (overshoot > tabWidth / 2 && index + 1 < tabWidths.length) {
      return tabWidth - overshoot + tabWidths[index + 1];
    }
    return tabWidth - overshoot;
  }
}
export function getPreviousTabToMoveRight(
  leftOffset: number,
  tabWidths: number[]
) {
  return getClosestTabWithLeftBorderToTheLeftOfTargetLine(
    leftOffset,
    tabWidths
  );
}
/**
 * Find out the tab that is on the left of and  is the closet to the target.  This is done by summing up tab widths until the sum is
 * equal to or greater than the target.  If the sum of all tab widths is less than target, the returned index is the index of the last tab.
 *
 * @param target number
 * @param tabWidths number array
 * @returns two-element number array:
 *          the first element is the index of the tab
 *          the second element is the sum of tab widths from tab 0 to the found tab minus the target
 */
function getClosestTabWithLeftBorderToTheLeftOfTargetLine(
  target: number,
  tabWidths: number[]
) {
  let index = 0;
  let sum = 0;
  while (sum < target && index < tabWidths.length) {
    sum += tabWidths[index];
    logger.debug(`sum = ${sum} index=${index} target = ${target}`);
    index++;
  }
  return [--index, sum - target];
}

export function getNextTabToMoveLeft(
  leftOffset: number,
  viewPortWidth: number,
  tabWidths: number[]
) {
  return getClosestTabWithLeftBorderToTheLeftOfTargetLine(
    leftOffset + viewPortWidth,
    tabWidths
  );
}
export function calculateLeftMoveAmount(
  index: number,
  overshoot: number,
  tabWidths: number[]
) {
  logger.debug(
    `index = ${index} tabWidth=${tabWidths[index]} and overshoot = ${overshoot}`
  );
  if (index === tabWidths.length - 1 && overshoot <= 0) {
    return 0;
  } else {
    const tabWidth = tabWidths[index];
    if (overshoot > tabWidth / 2 && index - 1 >= 0) {
      return tabWidth - overshoot + tabWidths[index - 1];
    }
    return tabWidth - overshoot;
  }
}
