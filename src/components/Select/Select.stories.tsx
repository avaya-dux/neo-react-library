import type { Meta } from "@storybook/react";
import { useEffect, useState } from "react";

import { Button, Form, Sheet } from "components";

import { Select } from "./Select";
import { SelectOption } from "./SelectOption";
import { fruitOptions } from "./utils/mockdata";
import { SelectProps } from "./utils/SelectTypes";

export default {
  title: "Components/Select",
  component: Select,
} as Meta<SelectProps>;

export const BasicSelects = () => {
  const [favFood, setFavFood] = useState("");
  const [foods, setFoods] = useState<string[]>([]);

  return (
    <Sheet title="Default Single and Multi Select" style={{ width: 400 }}>
      <Select
        helperText="Please select one"
        label="Select a favorite food"
        onChange={(value) => setFavFood(value as string)}
      >
        {fruitOptions}
      </Select>

      <Select
        helperText="Please select one or more"
        label="Select a few nice foods"
        multiple
        onChange={(value) => setFoods(value as string[])}
      >
        {fruitOptions}
      </Select>

      <div>
        <p>Favorite Food: {favFood || "None selected"}</p>
      </div>

      <div>
        <p>Nice Foods Selection: {foods.length === 0 && "None Selected"}</p>

        <ul>
          {foods.map((food) => (
            <li key={food}>{food}</li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
};

export const Searchable = () => {
  const [favFood, setFavFood] = useState("");
  const [foods, setFoods] = useState<string[]>([]);

  return (
    <Sheet title="Searchable Single and Multi Select" style={{ width: 400 }}>
      <Select
        helperText="Please select one"
        label="Select a favorite food"
        searchable
        onChange={(value) => {
          setFavFood(value as string);
        }}
      >
        {fruitOptions}
      </Select>

      <Select
        id="multi-searchable-select"
        helperText="Please select one or more"
        label="Select a few nice foods"
        multiple
        onChange={(value) => setFoods(value as string[])}
        searchable
      >
        {fruitOptions}
      </Select>

      <div>
        <p>Favorite Food: {favFood || "None selected"}</p>
      </div>

      <div>
        <p>Foods Selection: {foods.length === 0 && "None Selected"}</p>

        <ul>
          {foods.map((food) => (
            <li key={food}>{food}</li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
};

export const Creatable = () => {
  return (
    <Sheet title="Creatable Single & Multiple Select" style={{ width: 400 }}>
      <article>
        <p style={{ paddingBottom: 10 }}>
          <b>IMPORTANT:</b> Please be aware of the following:
        </p>

        <p style={{ paddingBottom: 10 }}>
          When using the <code>creatable</code> prop, your created items will{" "}
          <i>not</i> appear in the options list; as they are not pre-defined
          options. To remove them you must remove the <code>Chip</code>.
        </p>

        <p style={{ paddingBottom: 10 }}>
          Also, to create an option, you must click direclty on the
          &quot;create&quot; option via mouse or keyboard navigation.
        </p>

        <p style={{ paddingBottom: 10 }}>
          Please reach out to us{" "}
          <a href="https://github.com/avaya-dux/neo-react-library/issues/new">
            via our GitHub page
          </a>{" "}
          if you have any questions or concerns.
        </p>
      </article>

      <Select creatable label="Select or create a favorite food" searchable>
        {fruitOptions}
      </Select>

      <Select
        creatable
        createMessage="Add a new fruit:"
        label="Select or create multiple foods"
        multiple
        searchable
      >
        {fruitOptions}
      </Select>
    </Sheet>
  );
};

export const Disabled = () => (
  <Select label="I am disabled" disabled>
    <SelectOption>Option 1</SelectOption>
    <SelectOption disabled>Option 2</SelectOption>
    <SelectOption>Option 3</SelectOption>
    <SelectOption>Option 4</SelectOption>
  </Select>
);

export const DefaultValues = () => (
  <section>
    <Select label="Second Options is selected via `selected` prop">
      <SelectOption>first option</SelectOption>

      <SelectOption selected>second option</SelectOption>
    </Select>

    <Select
      label="Third Option is selected via `defaultValue` prop"
      defaultValue={fruitOptions[2].props.value}
    >
      {fruitOptions}
    </Select>
  </section>
);

export const RequiredInForm = () => {
  const [selection, setSelection] = useState("2");
  const [selectedFood, setSelectedFood] = useState(fruitOptions[5].props.value);
  const [foodErrorList, setFoodErrorList] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState([
    fruitOptions[4].props.value,
  ]);
  const [foodsErrorList, setFoodsErrorList] = useState<string[]>([]);

  return (
    <Sheet title="Required in Form" style={{ width: 400 }}>
      <article>
        <p style={{ paddingBottom: 10 }}>
          <b>IMPORTANT:</b> Please be aware of the following:
        </p>

        <p style={{ paddingBottom: 10 }}>
          Our <code>Select</code> component comes with quite a bit of
          functionalty, and while we are working on making it easier to use and
          more intuitive, you will need to control the error messages manually
          at this time.
        </p>

        <p style={{ paddingBottom: 10 }}>
          We&apos;ve created this example, but please reach out to us{" "}
          <a href="https://github.com/avaya-dux/neo-react-library/issues/new">
            via our GitHub page
          </a>{" "}
          if you have any questions or concerns.
        </p>
      </article>

      <Form
        id="select-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedFood || selectedFoods.length) {
            const submission =
              selection === "1" ? selectedFood : selectedFoods.join(", ");
            alert(`you successfully submitted: ${submission}`);
          } else if (selection === "1") {
            setFoodErrorList(["Required"]);
          } else if (selection === "2") {
            setFoodsErrorList(["Required"]);
          }
        }}
      >
        <Select
          label="Would you like to choose a favorite food, or multiple foods?"
          onChange={(v) => setSelection(v as string)}
        >
          <SelectOption value="1">Just One Favorite</SelectOption>

          <SelectOption value="2" selected>
            Multiple Foods
          </SelectOption>
        </Select>

        <Select
          disabled={selection !== "1"}
          errorList={foodErrorList}
          label="Favorite Food"
          onChange={(value) => {
            setFoodErrorList([]);
            setSelectedFood(value as string);
          }}
          searchable
          value={selectedFood}
        >
          {fruitOptions}
        </Select>

        <Select
          disabled={selection !== "2"}
          errorList={foodsErrorList}
          label="Multiple Foods Selection"
          multiple
          onChange={(value) => {
            setFoodsErrorList([]);
            setSelectedFoods(value as string[]);
          }}
          value={selectedFoods}
        >
          {fruitOptions}
        </Select>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="reset"
            variant="secondary"
            onClick={() => {
              setSelectedFood(null);
              setSelectedFoods([]);
              setFoodErrorList([]);
              setFoodsErrorList([]);
            }}
          >
            Reset
          </Button>

          <Button
            style={{ marginRight: "8px" }}
            type="submit"
            onClick={(e) => {
              if (selection === "1" && !selectedFood) {
                setFoodErrorList(["Required"]);
                e.preventDefault();
                e.stopPropagation();
              } else if (selection === "2" && selectedFoods.length === 0) {
                setFoodsErrorList(["Required"]);
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Sheet>
  );
};

export const LoadOptions = () => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Select multiple label="Mock Loading Example" loading={loading}>
      {options.map((option, index) => (
        <SelectOption key={index}>{option}</SelectOption>
      ))}
    </Select>
  );
};

export const Empty = () => (
  <Sheet title="No Options for single and multi Select" style={{ width: 400 }}>
    <Select label="Single Select" noOptionsMessage="Empty" />

    <Select label="Multiple Select" multiple />
  </Sheet>
);

export const SelectsWithWrongChildren = () => {
  return (
    <Sheet title="'Wrong' children" style={{ width: 400 }}>
      <Select label="Single Select, <p> element as child">
        <p>Paragraph One</p>
        <p>Paragraph Two</p>
      </Select>

      <Select multiple label="Multi Select, <p> element as child">
        <p>Paragraph One</p>
        <p>Paragraph Two</p>
      </Select>
    </Sheet>
  );
};

export const MoreThanOneMultipleSelect = () => {
  return (
    <Sheet title="Keyboard Navigation between Selects" style={{ width: 400 }}>
      <Select multiple label="First Multiple Select">
        <SelectOption>Option 1</SelectOption>
        <SelectOption>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>

      <Select multiple label="Second Multiple Select">
        <SelectOption>Option 1</SelectOption>
        <SelectOption disabled>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>
    </Sheet>
  );
};

export const SmallSelects = () => {
  return (
    <Sheet title="Small Selects" style={{ width: 400 }}>
      <Select
        helperText="This is a normal (medium) sized Select"
        label="Select a favorite food"
      >
        {fruitOptions}
      </Select>

      <hr />

      <Select
        helperText="This is a small sized Select"
        label="Select a favorite food"
        size="sm"
      >
        {fruitOptions}
      </Select>

      <Select
        helperText="This is a small sized searchable Select"
        label="Select a few nice foods"
        searchable
        size="sm"
      >
        {fruitOptions}
      </Select>

      <Select
        helperText="This is a small sized multiselect"
        label="Select a few nice foods"
        multiple
        size="sm"
      >
        {fruitOptions}
      </Select>

      <Select
        helperText="This is a small sized searchable multiselect"
        label="Select a few nice foods"
        multiple
        searchable
        size="sm"
      >
        {fruitOptions}
      </Select>
    </Sheet>
  );
};

export const InlineCustomWidths = () => {
  return (
    <Sheet title="Inline Custom Widths" style={{ width: 1000 }}>
      <Form inline>
        <Select label="Select a favorite food" size="sm" style={{ width: 100 }}>
          {fruitOptions}
        </Select>

        <Select label="Select a favorite food" size="sm" style={{ width: 100 }}>
          {fruitOptions}
        </Select>

        <Select
          label="Select a few nice foods"
          searchable
          size="sm"
          style={{ width: 200 }}
        >
          {fruitOptions}
        </Select>

        <Select
          label="Select a few nice foods"
          multiple
          size="sm"
          style={{ width: 200 }}
        >
          {fruitOptions}
        </Select>

        <Select
          label="Select a few nice foods"
          multiple
          searchable
          size="sm"
          style={{ width: 200 }}
        >
          {fruitOptions}
        </Select>
      </Form>
    </Sheet>
  );
};
