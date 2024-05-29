import clsx from "clsx";
import { type ReactNode, useEffect, useId, useState } from "react";
import "./Accordion_shim.css";

export interface AccordionProps {
	"aria-label"?: string;
	"aria-level"?: number;
	children?: ReactNode;
	defaultExpanded?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	header: ReactNode;
	headerId?: string;
	isOpen?: boolean;
}

/**
 * An Accordion is a vertically stacked menu.
 * When opened, the list expands to reveal the associated content.
 *
 * @example
<Accordion header="Single Accordion Example">
  Inner content of Accordion example
</Accordion>
 *
<Accordion
  header="Single Accordion Example"
  disabled={disabled}
  isOpen={open}
  handleClick={() => setOpen(!open)}
>
  Inner content of Accordion example
</Accordion>
 *
 * @see https://design.avayacloud.com/components/web/accordion-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-accordion
 */
export const Accordion = ({
	"aria-label": ariaLabel = "Accordion Heading",
	"aria-level": ariaLevel = 2,
	children,
	defaultExpanded = false,
	disabled = false,
	onClick,
	header,
	headerId,
	isOpen,
}: AccordionProps) => {
	const generatedId = useId();
	headerId = headerId || generatedId;
	const [isActive, setIsActive] = useState(defaultExpanded);

	const bodyId = `accordion-control-${headerId}`;

	useEffect(() => {
		if (isOpen || defaultExpanded) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [isOpen, defaultExpanded]);

	return (
		<div className="neo-accordion">
			<div
				className={clsx(
					"neo-accordion__item",
					isActive && "neo-accordion__item--active",
				)}
			>
				<div
					className={clsx(
						"neo-accordion__header",
						disabled && "neo-accordion__header--disabled",
					)}
					role="heading"
					aria-label={ariaLabel}
					aria-level={ariaLevel}
				>
					<button
						type="button"
						className="neo-accordion__header-text"
						aria-expanded={isActive ? "true" : "false"}
						aria-controls={bodyId}
						id={headerId}
						onClick={() => {
							if (onClick) {
								onClick();
							}

							if (isOpen === undefined) {
								setIsActive(!isActive);
							}
						}}
						disabled={disabled}
						// aria-disabled below condition is for screen reader when allowOnlyOne prop is true from parent component.
						aria-disabled={!!(isActive && onClick)}
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

Accordion.displayName = "Accordion";
