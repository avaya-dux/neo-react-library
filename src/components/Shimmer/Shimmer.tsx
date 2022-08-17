import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { SizeTypeMinimal } from "utils";

import "./Shimmer_shim.css";

export interface ShimmerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  loopInfinitely?: boolean;
  shape?: "circle" | "rectangle";
  size?: SizeTypeMinimal;
}

/**
 * An animated placeholder that informs users that content or data is still loading
 *
 * @example <Shimmer />
 * @example <Shimmer shape="circle" size="lg" />
 * @example <Shimmer loopInfinitely />
 *
 * @see https://design.avayacloud.com/components/web/shimmer-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-shimmer
 */
export const Shimmer = ({
  className,
  loopInfinitely = false,
  shape = "rectangle",
  size = "md",
  ...rest
}: ShimmerProps) => {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      role="alert"
      className={clsx(
        "neo-shimmer",
        shape === "rectangle" && size === "sm" && "neo-shimmer__rectangle sm",
        shape === "rectangle" && size === "md" && "neo-shimmer__rectangle",
        shape === "rectangle" && size === "lg" && "neo-shimmer__rectangle lg",
        shape === "circle" && size === "sm" && "neo-shimmer__circle--small",
        shape === "circle" && size === "md" && "neo-shimmer__circle--medium",
        shape === "circle" && size === "lg" && "neo-shimmer__circle--large",
        loopInfinitely === false && "neo-shimmer--3-count",
        className
      )}
      {...rest}
    ></div>
  );
};
