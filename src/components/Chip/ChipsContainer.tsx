import { Children, cloneElement, ReactElement } from "react";

import { ChipProps } from "./Chip";

export interface ChipsContainerProps {
  children: ReactElement<ChipProps> | ReactElement<ChipProps>[];
}

/**
 * Used to wrap a set of Chip components
 *
 * @example
 * <ChipContainer>
 *  <Chip>default</Chip>
 *  <Chip variant="alert" icon="warning-filled">alert chip</Chip>
 * </ChipContainer>
 *
 * @see https://design.avayacloud.com/components/web/chip-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-chips
 */
export const ChipsContainer = ({ children }: ChipsContainerProps) => (
  <div className="neo-chips">
    {Children.map(children, (child, index) =>
      cloneElement(child, {
        key: index,
        className: "neo-chips__item",
      })
    )}
  </div>
);
