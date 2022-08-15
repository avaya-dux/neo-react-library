import clsx from "clsx";
import { ReactNode, useEffect, useId, useState } from "react";

export interface AccordionProps {
  "aria-label"?: string;
  "aria-level"?: number;
  children?: ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
  header: ReactNode;
  headerId?: string;
  isOpen?: boolean;
}
export const Accordion = ({
  "aria-label": ariaLabel = "Accordion Heading",
  "aria-level": ariaLevel = 2,
  children,
  defaultExpanded = false,
  disabled = false,
  handleClick,
  header,
  headerId = useId(),
  isOpen,
}: AccordionProps) => {
  const [isActive, setIsActive] = useState(defaultExpanded);

  const bodyId = `accordion-control-${headerId}`;

  useEffect(() => {
    if (isOpen || defaultExpanded) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);
  return (
    <div className="neo-accordion">
      <div
        className={clsx(
          "neo-accordion__item",
          isActive && "neo-accordion__item--active"
        )}
      >
        <div
          className={clsx(
            "neo-accordion__header",
            disabled && "neo-accordion__header--disabled"
          )}
          role="heading"
          aria-label={ariaLabel}
          aria-level={ariaLevel}
        >
          <button
            className="neo-accordion__header-text"
            aria-expanded={isActive ? "true" : "false"}
            aria-controls={bodyId}
            id={headerId}
            onClick={() => {
              handleClick ? handleClick() : setIsActive(!isActive);
            }}
            disabled={disabled}
            // aria-disabled below condition is for screen reader when allowOnlyOne prop is true from parent component.
            aria-disabled={!!(isActive && handleClick)}
          >
            {header}
          </button>
        </div>

        {isActive && !disabled && (
          <div id={bodyId} className="neo-accordion__body">
            <div className="neo-accordion__content">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
