import { ReactElement, useState, cloneElement, Children } from "react";
import { AccordionProps } from "../Accordion";
import "./AccordionGroup_shim.css";

export interface AccordionGroupProps {
  allowOnlyOne?: boolean;
  header?: string;
  defaultOpenAccordingIndex?: number;
  children: ReactElement<AccordionProps>[];
}

/**
 * An Accordion is a vertically stacked menu.
 * When opened, the list expands to reveal the associated content.
 *
 * @example
<AccordionGroup
  allowOnlyOne
  defaultOpenAccordingIndex={0}
  header="Accordion Group Example"
>
  <Accordion header="Accordion 1">
    Inner content of Accordion example
  </Accordion>
  <Accordion header="Accordion 2">
    Inner content of Accordion example
  </Accordion>
</AccordionGroup>
 *
 * @see https://design.avayacloud.com/components/web/accordion-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-accordion--group
 */
export const AccordionGroup = ({
  allowOnlyOne = false,
  header,
  defaultOpenAccordingIndex = 0,
  children,
}: AccordionGroupProps) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(
    defaultOpenAccordingIndex
  );

  const controlledChildren = Children.map(children, (child, index) =>
    cloneElement(child, {
      key: index,
      handleClick: allowOnlyOne
        ? () => setOpenAccordionIndex(index)
        : undefined,
      isOpen: index === openAccordionIndex,
    })
  );

  return (
    <div className="neo-accordion-group">
      <p>{header}</p>

      {controlledChildren}
    </div>
  );
};
