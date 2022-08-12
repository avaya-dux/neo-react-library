export const rootBtnClass = "neo-btn";

export const getAnimationClass = (animation: string) =>
  animation !== "pulse" ? "" : "neo-pulse";

export const getBadgeClass = (badge?: string) => (badge ? "neo-badge" : "");

export const getVariantClasses = (
  shape: string,
  variant: string,
  status: string
) => {
  const classes = [
    `${rootBtnClass}-${variant}`,
    `${rootBtnClass}-${variant}--${status}`,
  ];

  if (shape !== "none") {
    classes.push(`${rootBtnClass}-${shape}-${variant}--${status}`);
  }

  return classes;
};

export const getSizeClass = (size: string) => `${rootBtnClass}--${size}`;

export const showSpinner = (animation: string) => animation === "spinner";

export const computeBadge = (txt?: string) => {
  // limit badge string length to 12
  return txt ? txt.replace(/\s/g, "").substring(0, 12) : "";
};
