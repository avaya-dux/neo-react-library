// https://github.com/mui-org/material-ui/blob/2a4a13d4f2ece77f29c4752fa830f69e4b609c79/packages/material-ui-utils/src/useControlled.js

import * as React from "react";

export default function useControlled<T>({
  controlled,
  default: defaultProp,
  name,
  state = "value",
}: {
  controlled?: T;
  default: T;
  name: string;
  state?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): [T, (newValue: any) => void] {
  // isControlled is ignored in the hook dependency lists as it should never change.
  const { current: isControlled } = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState<T>(defaultProp);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const value = isControlled ? controlled! : valueState;

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (isControlled !== (controlled !== undefined)) {
        console.error(
          [
            `useControlled: A component is changing the ${
              isControlled ? "" : "un"
            }controlled ${state} state of ${name} to be ${
              isControlled ? "un" : ""
            }controlled.`,
            "Elements should not switch from uncontrolled to controlled (or vice versa).",
            `Decide between using a controlled or uncontrolled ${name} ` +
              "element for the lifetime of the component.",
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
            "More info: https://fb.me/react-controlled-components",
          ].join("\n"),
        );
      }
    }, [state, name, controlled, isControlled]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { current: defaultValue } = React.useRef(defaultProp);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (!isControlled && defaultValue !== defaultProp) {
        console.error(
          [
            `useControlled: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join("\n"),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultProp)]);
  }

  const setValueIfUncontrolled = React.useCallback((newValue: T) => {
    if (!isControlled) {
      setValue(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setValueIfUncontrolled];
}
