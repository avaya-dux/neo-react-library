import { useContext, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

import { SelectContext } from "../utils/SelectContext";
import { SelectOptionProps } from "../utils/SelectTypes";

export interface InternalSelectOptionProps extends SelectOptionProps {
  index: number;
}

export const InternalSelectOption = ({
  children,
  disabled,
  helperText,
  index,
}: InternalSelectOptionProps) => {
  const {
    downshiftProps: { getItemProps },

    optionProps: { multiple, selectedItemsValues },

    selectProps: { filteredOptions },
  } = useContext(SelectContext);

  /*
    NOTE: these `id`s will never change for non-searchable selects,
    so the use of `useMemo` here is awesome. But these values _will_
    change for searchable selects, and the use of `useMemo` for that
    use-case is bad. Thus, the use `useMemo` for these `id`s is debatable.
  */
  const [labelId, helperId] = useMemo(
    () => [`label-id-${genId()}`, `helper-text-${genId()}`],
    [children]
  );

  const optionSelf = filteredOptions[index] || {};
  const itemProps = getItemProps({
    item: optionSelf,
    index,
    disabled,
  });

  return multiple ? (
    <div className="neo-input-group">
      <input
        aria-describedby={helperText && helperId}
        aria-labelledby={labelId}
        checked={selectedItemsValues.includes(optionSelf.value)}
        className="neo-check"
        disabled={disabled}
        readOnly
        type="checkbox"
        value={optionSelf.value} // BUG: `value` is updated on reset, but the change needs to be propagated up
      />

      <div {...itemProps} className="neo-check__label" id={labelId}>
        {children}
      </div>

      {helperText && (
        <p className="neo-input-hint" id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  ) : (
    <li {...itemProps}>
      {children}

      {helperText && <p className="neo-input-hint">{helperText}</p>}
    </li>
  );
};
