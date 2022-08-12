import clsx from "clsx";
import { FunctionComponent, HTMLAttributes } from "react";

/**
 * @prop {boolean} [inline] display form elements inline
 */
export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  inline?: boolean;
}

/**
 * Extends `<form>` with Avaya NEO styling.
 * @param {FormProps} props
 * @param {boolean} [props.inline] display form elements inline
 *
 * @example
 * <Form><TextInput {...input1Props} /> <TextInput {...input1Props} /></Form>
 *
 * @example
 * <Form inline={true}><TextInput {...input1Props} /> <TextInput {...input2Props} /></Form>
 *
 * @see https://design.avayacloud.com/components/web/form-layout-web
 */
export const Form: FunctionComponent<FormProps> = ({
  className,
  inline,
  ...rest
}: FormProps) => {
  return (
    <form
      className={clsx("neo-form", inline && "neo-form--inline", className)}
      {...rest}
    />
  );
};
