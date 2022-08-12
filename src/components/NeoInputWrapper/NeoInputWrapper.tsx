import { FunctionComponent, HTMLAttributes } from "react";

interface NeoInputWrapperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  disabled?: boolean;
  error?: boolean;
  groupingClassName?: string;
  inline?: boolean;
  required?: boolean;
  wrapperClassName?: string;
}

export const NeoInputWrapper: FunctionComponent<NeoInputWrapperProps> = ({
  children,
  disabled,
  error,
  groupingClassName,
  inline,
  required,
  wrapperClassName,

  ...rest
}) => (
  <div
    data-testid="NeoInputWrapper-root"
    {...getNeoInputWrapperProps({
      disabled,
      error,
      required,
      wrapperClassName,
    })}
    {...rest}
  >
    <div
      data-testid="NeoInputWrapper-group-root"
      {...getInputGroupProps({ inline, groupingClassName })}
    >
      {children}
    </div>
  </div>
);

export function getNeoInputWrapperProps({
  disabled,
  error,
  required,
  wrapperClassName,
}: Omit<NeoInputWrapperProps, "inline" | "groupingClassName"> = {}) {
  const classNames = ["neo-form-control"];

  if (disabled === true) {
    classNames.push("neo-form-control--disabled");
  }
  if (error === true) {
    classNames.push("neo-form-control--error");
  }
  if (required === true) {
    classNames.push("neo-form-control--required");
  }
  if (wrapperClassName) {
    classNames.push(wrapperClassName);
  }

  return { className: classNames.join(" ") };
}

export function getInputGroupProps({
  groupingClassName,
  inline,
}: Pick<NeoInputWrapperProps, "inline" | "groupingClassName"> = {}) {
  const classNames = ["neo-input-group"];

  if (inline) {
    classNames.push("neo-input-group--inline");
  }
  if (groupingClassName) {
    classNames.push(groupingClassName);
  }

  return { className: classNames.join(" ") };
}
