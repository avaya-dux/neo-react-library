import { HTMLAttributes } from "react";

const SizeMap = {
  sm: "small",
  md: "medium",
  lg: "large",
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "basic" | "generic" | "bot";
  size?: "sm" | "md" | "lg";
  border?: "default" | "success" | "warning" | "alert" | "info";
  status?: "do-not-disturb" | "away" | "busy" | "available" | "offline";
  initials?: string;
  label?: string; // becomes `alt` when `image` is passed, otherwise `aria-label`
  image?: string;
}

export interface SmallAvatarProps extends AvatarProps {
  size: "sm";
}
/**
 * Avatars are used to show a thumbnail representation of an individual or business in the interface.
 *
 * @example
 * <Avatar label="Joey Joe Joe Jr." initials="JJ" size="lg" status="busy" />
 *
 * @see https://design.avayacloud.com/components/web/avatar-web
 */
export function Avatar(props: AvatarProps) {
  const figureProps = getAvatarFigureProps(props);
  const statusProps = getAvatarStatusProps(props);
  const imageProps = getAvatarImageProps(props);

  return (
    <figure {...figureProps}>
      {!!props?.image && <img {...imageProps} alt={imageProps.alt} />}
      {!!props?.status && <div {...statusProps} />}
    </figure>
  );
}

/**
 * Derives all the HTML props for the `figure` element, based
 * on the current state of the `Avatar`.
 */
export function getAvatarFigureProps({
  size = "md",
  variant = "basic",
  border,
  label,
  image,
  initials,
  // status, // HACK: should use proper typings to remove this field from props
  className,
  ...rest
}: AvatarProps = {}) {
  // if basic, but no image or intials, override to generic
  if (variant === "basic" && !image && !initials) {
    variant = "generic";
  }

  const classNames = ["neo-avatar"];

  // there is no additional avatar class for medium
  if (size === "md") {
    // generic and bot variant class name when is medium
    if (["generic", "bot"].includes(variant)) {
      classNames.push(`neo-avatar--${variant}`);
    }
  } else if (["lg", "sm"].includes(size)) {
    const sizeName = SizeMap[size];

    classNames.push(`neo-avatar--${sizeName}`);

    // generic and bot variant class name includes the size when large/small
    if (["generic", "bot"].includes(variant)) {
      classNames.push(`neo-avatar--${sizeName}--${variant}`);
    }
  }

  if (border) {
    classNames.push(`neo-avatar--${border}`);
  }

  if (className) {
    classNames.push(className);
  }

  return {
    ...rest,

    className: classNames.join(" "),

    // initials should be uppercase, respect locale
    ...(!!initials && { "data-initials": initials.toLocaleUpperCase() }),

    // if not an image, set the label as aria-label on the `figure`
    ...(!!label && !image && { "aria-label": label }),
  };
}

export function getAvatarStatusProps({ status }: AvatarProps = {}) {
  const classNames = ["neo-avatar-status"];

  if (status) {
    classNames.push(`neo-avatar-status--${status}`);
  }

  return {
    className: classNames.join(" "),
  };
}

export function getAvatarImageProps({ image, label }: AvatarProps = {}) {
  return {
    className: "neo-img",
    src: image,
    alt: label,
  };
}

Avatar.displayName = "Avatar";
