import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";
import { InternalSelectOption } from "./InternalSelectOption";

export const OptionsWithEmptyMessageFallback = () => {
  const {
    optionProps: { noOptionsMessage },
    selectProps: { filteredOptions },
  } = useContext(SelectContext);

  return (
    <>
      {filteredOptions.length ? (
        filteredOptions.map((option, index) => (
          <InternalSelectOption
            {...option}
            index={index}
            key={`internal-option-${option.value}-${index}`}
          />
        ))
      ) : (
        <InternalSelectOption disabled index={0} key="no-available-options">
          {noOptionsMessage}
        </InternalSelectOption>
      )}
    </>
  );
};
