import clsx from "clsx";
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { Chip } from "components/Chip";

import { SelectContext } from "../utils/SelectContext";
import { calculateVisibleChips } from "../utils/multiSelectHelper";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

import "./MultiSelect.css";
import { Tooltip } from "components/Tooltip";

import log from "loglevel";
import { Keys, reactNodeToString } from "utils";
import { ar } from "@faker-js/faker";
const logger = log.getLogger("multiselect-logger");
logger.enableAll();

export const MultiSelect = () => {
	const {
		downshiftProps: {
			getMenuProps,
			getToggleButtonProps,
			isOpen,
			selectItem: toggleItem, // NOTE: I've adjusted the hook for this case (multi-select) such that the "select" is actually a "toggle" now,
		},
		optionProps: { selectedItems, setSelectedItems, collapse },
		selectProps: {
			filteredOptions,
			ariaLabel,
			disabled,
			helperId,
			helperText,
			loading,
			size,
		},
	} = useContext(SelectContext);

	logger.debug("1. start");

	const chipContainerRef = useRef<HTMLSpanElement>(null);
	const chipRefs = useRef<HTMLDivElement[]>([]);

	// make sure chips are rendered before calculating their widths in second useEffect
	const [renderCount, setRenderCount] = useState(0);
	const setChipRef = useCallback((el: HTMLDivElement | null, index: number) => {
		if (el) {
			logger.debug(`2.1 setting ref for chip ${index}`);
			chipRefs.current[index] = el;
			setRenderCount((prev) => prev + 1);
		}
	}, []);

	const selectedItemsAsChips = useMemo(() => {
		logger.debug("2. calculating selected items as chips");
		chipRefs.current = [];
		return selectedItems.length
			? selectedItems.map((item, index) => {
					return (
						<Chip
							key={`${item.children}-${index}`}
							ref={(el) => setChipRef(el, index)}
							closable
							disabled={disabled}
							closeButtonAriaLabel={`Remove ${item.children}`}
							onClose={() => {
								logger.debug(JSON.stringify(item));
								logger.debug(toggleItem);
								toggleItem(item);
							}}
						>
							{item.children}
						</Chip>
					);
				})
			: null;
	}, [selectedItems, disabled, toggleItem, setChipRef]);

	const [chipsToDisplay, setChipsToDisplay] = useState<React.ReactNode | null>(
		selectedItemsAsChips,
	);

	// render ALL chips when selectedItemsAsChips changes
	useEffect(() => {
		logger.debug("3. copy selectedItemsAsChips to display");
		setChipsToDisplay(selectedItemsAsChips);
		setRenderCount(0);
	}, [selectedItemsAsChips]);

	// calculate what chips can be collapsed; this depends on all chips are displayed first
	useEffect(() => {
		logger.debug("4. calculating chips to display");
		if (!collapse) {
			logger.debug("4.1 collapse is false, no need to do anything.");
			return;
		}
		logger.debug({
			renderCount,
			chipsCount: selectedItemsAsChips?.length || -1,
		});
		// Waiting for all chips to be displayed first. Only when displayed, can we get the widths of the chips.
		if (
			selectedItemsAsChips === null ||
			renderCount < selectedItemsAsChips?.length
		) {
			logger.debug(
				"4.2 wait for rerendering of all chips before calculating what chips can be collapsed.",
			);
			return;
		}

		const containerWidth = chipContainerRef.current?.offsetWidth || 0;
		const widths = chipRefs.current.map((ref) => ref.offsetWidth || 0);
		const chipContents: string[] = chipRefs.current.map(
			(ref) => ref.textContent || "",
		);

		const result = calculateVisibleChips(containerWidth, widths);
		logger.debug(
			`4.3 result ${JSON.stringify({ result, widths, containerWidth, chipContents })}`,
		);

		if (result.collapsedCount === 0 || selectedItemsAsChips === null) {
			logger.debug(
				`4.4 no chips to hide, hiddenCount=${result.collapsedCount}, selectedItemAsChips=${reactNodeToString(selectedItemsAsChips)}`,
			);
			return;
		}
		// visible chips = all chips - collapsed chips
		const shortedVisibleChips = selectedItemsAsChips.slice(
			0,
			result.lastVisibleIndex + 1,
		);
		const label = chipContents.slice(result.lastVisibleIndex + 1).join(", ");
		const badgeChip = (
			<Tooltip key="badge-chip-tooltip" label={label}>
				<Chip>{`+${result.collapsedCount}`}</Chip>
			</Tooltip>
		);
		shortedVisibleChips.push(badgeChip);
		logger.debug(
			`4.5 setting shortened chips to display ${reactNodeToString(shortedVisibleChips)}`,
		);
		setChipsToDisplay(shortedVisibleChips);
	}, [collapse, selectedItemsAsChips, renderCount]);

	const {
		role,
		"aria-activedescendant": ariaActiveDescendant,
		"aria-labelledby": ariaLabelledby,
		"aria-expanded": ariaExpanded,
		...restToggleProps
	} = getToggleButtonProps({
		onKeyDown: (event) => {
			// Handle Enter key OR SPACE key press on the button
			if (event.key === Keys.ENTER || event.key === Keys.SPACE) {
				if (event.target instanceof HTMLButtonElement) {
					const ariaLabel = event.target.getAttribute("aria-label");

					logger.debug(
						`Enter key pressed on button with aria-label: ${ariaLabel}`,
					);

					if (
						ariaLabel?.toLowerCase().startsWith("remove") ||
						ariaLabel?.toLowerCase().startsWith("clear")
					) {
						try {
							// For some reason, the click event is not being dispatched by Downshift on Enter key press. Let us do it manually.
							const clickEvent = new MouseEvent("click", {
								bubbles: true, // Make the event bubble up
								cancelable: true, // Make the event cancellable
							});
							event.target.dispatchEvent(clickEvent);
						} catch (error) {
							logger.error("Error dispatching click event:", error);
						}
					}
				}
			}
		},
	});

	const computedAriaProperty = useMemo(() => {
		if (selectedItems && selectedItems.length > 0) {
			return {
				"aria-label": selectedItems
					.map((item) => item.value)
					.join(" and ")
					.concat(
						`, ${selectedItems.length} of ${filteredOptions.length} selected`,
					),
			};
		}
		if (ariaLabel) {
			return { "aria-label": ariaLabel };
		}
		return { "aria-labelledby": ariaLabelledby };
	}, [selectedItems, ariaLabel, ariaLabelledby, filteredOptions]);
	const textContent = chipsToDisplay
		? reactNodeToString(chipsToDisplay)
		: "null";
	logger.debug(`5. rendering ${textContent}`);
	return (
		<div
			aria-describedby={helperText && helperId}
			className={clsx(
				"neo-multiselect",
				size === "sm" && "neo-multiselect--small",
				disabled && "neo-multiselect--disabled",
				loading && "neo-select__spinner",
				isOpen && "neo-multiselect--active",
			)}
		>
			<span {...restToggleProps} className="neo-multiselect-combo__header">
				<span
					ref={chipContainerRef}
					key="multiselect-chip-container"
					className="neo-multiselect__padded-container"
				>
					<div className="neo-multiselect-combo__buttons-container">
						<button
							{...computedAriaProperty}
							aria-expanded={ariaExpanded}
							className="neo-multiselect__header neo-multiselect__header--no-after"
							type="button"
						>
							&nbsp;
						</button>
					</div>

					{chipsToDisplay}
				</span>
				<button
					aria-label="clear selections"
					className={clsx(
						"neo-input-edit__icon neo-icon-end",
						"neo-multiselect-clear-icon-button",
						selectedItems.length === 0 && "neo-display-none",
					)}
					type="button"
					disabled={selectedItems.length === 0}
					onClick={() => setSelectedItems([])}
				/>
			</span>

			<div
				aria-label={ariaLabel}
				className={clsx(
					"neo-multiselect__content",
					isOpen && "neo-set-keyboard-focus",
				)}
				aria-multiselectable={true}
				{...getMenuProps()}
			>
				<ul role="group">
					<OptionsWithEmptyMessageFallback />
				</ul>
			</div>
		</div>
	);
};
