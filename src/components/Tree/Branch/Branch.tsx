// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import {
  cloneElement,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { Keys } from "utils";

import { LeafProps } from "..";
import { TreeContext } from "../TreeContext";

export interface BranchProps {
  actions?: ReactNode;
  children:
    | ReactElement<BranchProps | LeafProps>
    | ReactElement<BranchProps | LeafProps>[];
  defaultExpanded?: boolean;
  disabled?: boolean;
  title: ReactNode;
}

/**
 * A `Branch` can be a child of a `Tree` or itself.
 *
 * @see https://design.avayacloud.com/components/web/treeview-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-tree
 */
export const Branch = ({
  actions,
  children,
  defaultExpanded = false,
  disabled = false,
  title,
}: BranchProps) => {
  const { dir } = useContext(TreeContext);

  const ref = useRef(null);
  const [tabIndex, active, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );
  useFocusEffect(active, ref);

  const [expanded, setExpanded] = useState(defaultExpanded);

  const childrenWithRovingTabIndexLogic = useMemo(() => {
    const childrenAsArray = Array.isArray(children) ? children : [children];

    // if !expanded, we need to disable all children, which tells "react-roving-tabindex" to set their tabIndex to `-1`
    return childrenAsArray.map((child, i) => {
      const childTypeName = (child.type as FC).name;
      const key = `${childTypeName}-${i}`;

      return cloneElement(child, {
        disabled: !expanded || disabled || child.props.disabled,
        key: child.key || key,
      });
    });
  }, [expanded, disabled, children]);

  return (
    <li dir={dir} role="treeitem" aria-selected={active} className="neo-treeview__sub-tree-item">
      <div
        className={clsx(
          "neo-treeview__item",
          disabled && "neo-treeview__item--disabled",
          expanded && "neo-treeview__item--expanded",
          active && "neo-treeview__item--selected"
        )}
      >
        <span
          className="neo-treeview__item-left"
          role="button"
          ref={ref}
          tabIndex={tabIndex}
          onClick={(e) => {
            e.stopPropagation();

            if (!disabled) {
              handleClick();
              setExpanded(!expanded);
            }
          }}
          onKeyDown={(e) => {
            e.stopPropagation();

            if (!disabled) {
              handleKeyDown(e);

              switch (e.key) {
                case Keys.SPACE:
                case Keys.ENTER:
                  setExpanded(!expanded);
                  break;
                case Keys.LEFT:
                  setExpanded(false);
                  break;
                case Keys.RIGHT:
                  setExpanded(true);
                  break;
              }
            }
          }}
        >
          <span className="neo-treeview__item--expandable" />

          {title}
        </span>

        <span className="neo-treeview__item-right">{actions}</span>
      </div>

      <ul aria-expanded={expanded} role="group">
        {childrenWithRovingTabIndexLogic}
      </ul>
    </li>
  );
};
