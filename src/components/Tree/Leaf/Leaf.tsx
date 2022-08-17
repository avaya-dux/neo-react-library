// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import {
  DetailedHTMLProps,
  LiHTMLAttributes,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { TreeContext } from "../TreeContext";

export interface LeafProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  actions?: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

/**
 * A `Leaf` can be a child of a `Tree` or a `Branch` component.
 * It is meant to be a leaf/end node in the tree hierarchy.
 *
 * @see https://design.avayacloud.com/components/web/treeview-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-tree
 */
export const Leaf = ({
  actions,
  children,
  className,
  disabled = false,

  ...rest
}: LeafProps) => {
  const { dir } = useContext(TreeContext);

  const ref = useRef(null);
  const [tabIndex, active, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );
  useFocusEffect(active, ref);

  return (
    <li
      className={clsx(
        "neo-treeview__item",
        disabled && "neo-treeview__item--disabled",
        active && "neo-treeview__item--selected",
        className
      )}
      dir={dir}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={ref}
      role="treeitem"
      tabIndex={tabIndex}
      {...rest}
    >
      <span className="neo-treeview__item-left">{children}</span>

      {actions && <span className="neo-treeview__item-right">{actions}</span>}
    </li>
  );
};
