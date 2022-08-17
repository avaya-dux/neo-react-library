import clsx from "clsx";
import {
  HTMLAttributes,
  ReactNode,
  RefObject,
  useId,
  useRef,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import {
  ConditionalWrapper,
  dispatchInputOnChangeEvent,
  handleAccessbilityError,
  IconNamesType,
} from "utils";

import "./TextInput_shim.css";

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  ariaLabelPasswordHide?: string;
  ariaLabelPasswordShow?: string;
  children?: ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  endAddon?: ReactNode;
  endIcon?: IconNamesType;
  error?: boolean;
  helperText?: string;
  inline?: boolean;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  startAddon?: ReactNode;
  startIcon?: IconNamesType;
  type?: "text" | "password" | "number" | "email" | "tel";
  value?: number | string;
}

export const TextInput = ({
  ariaLabelPasswordHide = "Hide Password",
  ariaLabelPasswordShow = "Show Password",
  clearable = true,
  disabled,
  endAddon,
  endIcon,
  error,
  helperText,
  inline,
  label,
  placeholder,
  readOnly,
  required,
  startAddon,
  startIcon,
  type = "text",
  id = useId(),
  value,
  ...rest
}: TextInputProps) => {
  if (!label && !placeholder) {
    handleAccessbilityError("You must provide a `label` or `placeholder`.");
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const [eyeIcon, setEyeIcon] = useState("view-on");
  const [inputType, setInputType] = useState(type);
  const [ariaPressed, setAriaPressed] = useState(false);
  const [ariaLabel, setAriaLabel] = useState(ariaLabelPasswordShow);

  const toggleIcon = () => {
    if (eyeIcon === "view-on") {
      setEyeIcon("view-off");
      setInputType("text");
      setAriaLabel(ariaLabelPasswordHide);
      setAriaPressed(true);
    } else {
      setEyeIcon("view-on");
      setInputType("password");
      setAriaLabel(ariaLabelPasswordShow);
      setAriaPressed(false);
    }
  };
  return (
    <NeoInputWrapper
      wrapperClassName={startIcon || endIcon ? "neo-input-icon" : ""}
      disabled={disabled}
      error={error}
      required={required}
      inline={inline}
    >
      {label && <label htmlFor={id}>{label}</label>}

      {readOnly ? (
        <InternalTextInputElement
          disabled={disabled}
          inputRef={inputRef}
          id={id}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
          {...rest}
        />
      ) : (
        <ConditionalWrapper
          condition={!!startAddon || !!endAddon}
          wrapper={(child) => (
            <div className="neo-input-group--addons">{child}</div>
          )}
        >
          <>
            {!!startAddon && (
              <div className="neo-input-group__addon">{startAddon}</div>
            )}

            <div
              className={clsx(
                "neo-input-editable__wrapper",
                startIcon || endIcon ? "neo-input-icon__wrapper" : undefined
              )}
            >
              {startIcon && <span className={`neo-icon-${startIcon}`} />}

              <InternalTextInputElement
                disabled={disabled}
                inputRef={inputRef}
                id={id}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
                type={inputType}
                {...rest}
              />

              {/* BUG: `clearable` icon overrides `endIcon` */}
              {endIcon && <span className={`neo-icon-${endIcon}`} />}

              {!!clearable && (
                <button
                  aria-label="clear input"
                  className="neo-input-edit__icon neo-icon-end"
                  disabled={disabled}
                  type="button"
                  onClick={() => {
                    dispatchInputOnChangeEvent(
                      inputRef.current as HTMLInputElement,
                      ""
                    );
                  }}
                />
              )}
              {type === "password" && (
                <button
                  aria-label={ariaLabel}
                  aria-pressed={ariaPressed}
                  className={`neo-icon-${eyeIcon}`}
                  onClick={toggleIcon}
                  type="button"
                />
              )}
            </div>

            {!!endAddon && (
              <div className="neo-input-group__addon">{endAddon}</div>
            )}
          </>
        </ConditionalWrapper>
      )}

      {!!helperText && (
        <div className="neo-input-hint" id={`${id}-description`}>
          {helperText}
        </div>
      )}
    </NeoInputWrapper>
  );
};

export const InternalTextInputElement = ({
  readOnly,
  disabled,
  id,
  placeholder,
  inputRef,
  value,
  type,
  ...rest
}: Pick<
  TextInputProps,
  "readOnly" | "disabled" | "placeholder" | "value" | "type"
> & {
  id: string;
  inputRef: RefObject<HTMLInputElement>;
}) => (
  <input
    aria-describedby={`${id}-description`}
    className={clsx("neo-input", readOnly && "neo-input-readonly")}
    disabled={disabled}
    id={id}
    placeholder={placeholder}
    readOnly={readOnly}
    ref={inputRef}
    tabIndex={readOnly ? -1 : 0}
    value={value}
    type={type}
    {...rest}
  />
);
