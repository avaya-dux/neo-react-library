// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useMemo } from "react";
import { RovingTabIndexProvider } from "react-roving-tabindex";

import { handleAccessbilityError } from "utils";
import { genId } from "utils/accessibilityUtils";

import { TreeContext } from "./TreeContext";

import "./Tree_shim.css";

export interface TreeProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "dir"
  > {
  dir?: "ltr" | "rtl";
  label?: ReactNode;
}

/**
 * A `Tree` wraps one or multiple `Branch` and/or `Leaf` components.
 * It provides labeling, tab indexing, and keyboard navigation by default.
 *
 * @example
  <Tree label="Flat tree">
    <Leaf>leaf one</Leaf>
    <Leaf>leaf two</Leaf>
    <Leaf>leaf three</Leaf>
  </Tree>
 *
 * @example
  <Tree label="Nested Tree">
    <Branch title="Branch One (string)">
      <Leaf>one</Leaf>
    </Branch>

    <Branch
      title={
        <div>
          <b>Branch Two</b> (div)
        </div>
      }
    >
      <Leaf>one</Leaf>
    </Branch>
  </Tree>
 *
 * @example
  <Tree label="Nested Tree and nested groupings">
    <Branch title="Branch One (string)">
      <Leaf>one</Leaf>
    </Branch>

    <Branch
      title={
        <div>
          <b>Branch Two</b> (div)
        </div>
      }
    >
      <Leaf>two</Leaf>

      <Branch title="Branch Three (string)">
        <Leaf>three</Leaf>
      </Branch>

      <Leaf>four</Leaf>
    </Branch>
  </Tree>
 *
 * @see https://design.avayacloud.com/components/web/treeview-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-tree
 */
export const Tree = ({
  "aria-describedby": describedby,
  "aria-label": arialabel,
  children,
  className,
  dir = "ltr",
  label,

  ...rest
}: TreeProps) => {
  if (!label && !arialabel && !describedby) {
    handleAccessbilityError(
      "Tree requires a label, an aria-label, or an aria-describedby prop"
    );
  }

  const treeId = useMemo(() => genId(), []);

  return (
    <div className={clsx("neo-treeview", className)} {...rest}>
      {label && <label htmlFor={treeId}>{label}</label>}

      <RovingTabIndexProvider
        options={{ direction: "vertical", focusOnClick: true }}
      >
        <TreeContext.Provider value={{ dir }}>
          <ul
            aria-describedby={describedby}
            aria-label={arialabel}
            id={treeId}
            role="tree"
          >
            {children}
          </ul>
        </TreeContext.Provider>
      </RovingTabIndexProvider>
    </div>
  );
};

Tree.displayName = "Tree";
