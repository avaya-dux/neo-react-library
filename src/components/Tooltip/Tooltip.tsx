// TODO: add cypress tests back in
import clsx from "clsx";
import {
  Children,
  cloneElement,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { isString } from "utils";

import {
  getIdealTooltipPosition,
  getMultilineClassName,
  translatePositionToCSSName,
} from "./helpers";
import { TooltipProps } from "./TooltipTypes";

/**
 * Wraps any text or element and shows a tooltip when that text/element is hovered.
 *
 * @param label Text displayed in the tooltip
 * @param children Text || JSX.Element || JSX.Element[]
 * @param position Position of the tooltip, defaults to "auto"
 *
 * @example
 * <Tooltip label="example text">text</Tooltip>
 *
 * @example
 * <Tooltip label="example text" position="top">text</Tooltip>
 *
 * @example
 * <Tooltip label="example text"><span>text</span></Tooltip>
 *
 * @see https://design.avayacloud.com/components/web/tooltip-web
 */
export const Tooltip = ({
  arrow = true,
  children,
  className,
  id = useId(),
  label,
  multiline,
  position = "auto",

  ...rest
}: TooltipProps) => {
  const tooltipContainerRef = useRef(null);

  const [tooltipPosition, setTooltipPosition] = useState("");
  useLayoutEffect(() => {
    setTooltipPosition(
      position === "auto"
        ? getIdealTooltipPosition(
            {
              height: document.lastElementChild?.clientHeight || 0,
              width: document.lastElementChild?.clientWidth || 0,
            },
            label,
            tooltipContainerRef.current
          )
        : translatePositionToCSSName(position)
    );
  }, [label, position, tooltipContainerRef]);

  const multilineClassName = useMemo(
    () => getMultilineClassName(multiline),
    [multiline]
  );

  const wrappedChildren = useMemo(() => {
    const shouldWrap = isString(children) || Children.count(children) > 1;
    if (shouldWrap) {
      return <div aria-describedby={id}>{children}</div>;
    } else {
      const child = Children.only(children) as React.ReactElement;
      return cloneElement(child, { "aria-describedby": id });
    }
  }, [isString, children]);

  return (
    <div
      {...rest}
      ref={tooltipContainerRef}
      className={clsx(
        `neo-tooltip neo-tooltip--${tooltipPosition} neo-tooltip--onhover`,
        className
      )}
    >
      {wrappedChildren}

      <div
        className={clsx("neo-tooltip__content", multilineClassName)}
        role="tooltip"
        id={id}
      >
        {arrow && <div className="neo-arrow" />}
        {label}
      </div>
    </div>
  );
};
