import { MultiSelect } from "./MultiSelect";
import { MultiSelectSearchable } from "./MultiSelectSearchable";
import { SingleSelect } from "./SingleSelect";
import { SingleSelectSearchable } from "./SingleSelectSearchable";

export const InternalSelect = ({
  searchable,
  multiple,
}: {
  searchable?: boolean;
  multiple?: boolean;
}) => {
  if (searchable && multiple) {
    return <MultiSelectSearchable />;
  } else if (searchable) {
    return <SingleSelectSearchable />;
  } else if (multiple) {
    return <MultiSelect />;
  }

  return <SingleSelect />;
};
