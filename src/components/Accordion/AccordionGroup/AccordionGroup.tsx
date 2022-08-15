import { ReactElement, useState, cloneElement, Children } from "react";
import { AccordionProps } from "../Accordion";
import "./AccordionGroup_shim.css";

export interface AccordionGroupProps {
  allowOnlyOne?: boolean;
  header?: string;
  defaultOpenAccordingIndex?: number;
  children: ReactElement<AccordionProps>[];
}
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
