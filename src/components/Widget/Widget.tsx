import clsx from "clsx";
import { Action } from "./Action";
import { Content } from "./Content";
import { WidgetContext } from "./WidgetContext";
import { ThreeChildren, WidgetProps } from "./WidgetTypes";

/**
 * normalize children to an array of three elements
 * @param children could be single element, 2 elements, or 3 elements
 * @returns an array of 3 elements
 */
export function normalize(children: WidgetProps["children"]): ThreeChildren {
  const ret = Array.isArray(children) ? [...children] : [children];
  if (ret.length === 1) {
    ret.push(<Action />);
  }
  if (ret.length === 2) {
    const isAction = ret[1].type === Action;
    if (isAction) {
      ret.push(<Content />);
    } else {
      ret.splice(1, 0, <Action />);
    }
  }
  return ret as unknown as ThreeChildren;
}
export const Widget = ({
  loading = false,
  empty = false,
  disabled = false,
  children,
}: WidgetProps) => {
  const [headerLeft, headerRight, body] = normalize(children);
  return (
    <WidgetContext.Provider value={{ loading, empty, disabled }}>
      <div className="neo-widget__content">
        <div
          className={clsx(
            "neo-widget__header",
            disabled && "neo-widget__header-disabled"
          )}
        >
          {headerLeft}
          {headerRight}
        </div>
        {body}
      </div>
    </WidgetContext.Provider>
  );
};
