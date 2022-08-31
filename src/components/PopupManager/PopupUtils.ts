import { PopupPosition } from "./PopupTypes";

export const getContainerStyle = (
  position: PopupPosition,
  zIndex: number
): React.CSSProperties => {
  const isTopOrBottom = position === "top" || position === "bottom";
  const margin = isTopOrBottom ? "0 auto" : undefined;

  const top = position.includes("top")
    ? "env(safe-area-inset-top, 0px)"
    : undefined;
  const bottom = position.includes("bottom")
    ? "env(safe-area-inset-bottom, 0px)"
    : undefined;
  const right = !position.includes("left")
    ? "env(safe-area-inset-right, 0px)"
    : undefined;
  const left = !position.includes("right")
    ? "env(safe-area-inset-left, 0px)"
    : undefined;

  return {
    position: "fixed",
    zIndex,
    pointerEvents: "auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: position.includes("right") ? "wrap-reverse" : "wrap",
    maxHeight: "25vh",
    margin,
    top,
    bottom,
    right,
    left,
    ...getContainerAlignStyle(position),
  };
};

export function getContainerAlignStyle(
  position: PopupPosition
): React.CSSProperties {
  const isRighty = position.includes("right");
  const isLefty = position.includes("left");

  let alignItems = "center";
  if (isRighty) alignItems = "flex-end";
  if (isLefty) alignItems = "flex-start";

  return {
    alignItems,
    alignContent: isRighty || isLefty ? undefined : "center",
  };
}
