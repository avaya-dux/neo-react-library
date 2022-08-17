import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { UserEventKeys } from "utils";

import { Select } from "./Select";
import { fruitOptions } from "./utils/mockdata";

describe("Select", () => {
  const label = "Searchable Select";

  describe("Searchable Single Select", () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(
        <Select label={label} searchable>
          {fruitOptions}
        </Select>
      );
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes the correct props to label element", () => {
      const { getByText } = renderResult;
      const labelElement = getByText(label);
      const expectedAttributes = ["id", "for"];
      expectedAttributes.forEach((attribute) =>
        expect(labelElement).toHaveAttribute(attribute)
      );
    });

    it("passes the correct props to searchable element", () => {
      const { getAllByRole } = renderResult;
      const searchableElement = getAllByRole("textbox")[0].closest("div");
      const expectedAttributes = [
        "aria-haspopup",
        "aria-owns",
        "aria-expanded",
      ];
      expectedAttributes.forEach((attribute) =>
        expect(searchableElement).toHaveAttribute(attribute)
      );
    });

    it("toggles aria-expanded prop on click", () => {
      const { getAllByRole } = renderResult;
      const toggleButton = getAllByRole("textbox")[0].closest("span");
      const searchableElement = getAllByRole("textbox")[0].closest("div");
      expect(searchableElement).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(toggleButton);
      expect(searchableElement).toHaveAttribute("aria-expanded", "true");
      fireEvent.click(toggleButton);
      expect(searchableElement).toHaveAttribute("aria-expanded", "true");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("toggles clicked elements", () => {
      expect(screen.queryAllByRole("button")).toHaveLength(0);
      const combobox = screen.getByRole("combobox");
      const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
      expect(combobox).toHaveAttribute("aria-expanded", "false");
      userEvent.click(comboboxBtn);
      expect(combobox).toHaveAttribute("aria-expanded", "true");

      const options = screen.getAllByRole("option");
      fireEvent.click(options[0]);

      expect(screen.getAllByRole("button")).toHaveLength(1); // has one chip

      fireEvent.click(screen.getByRole("button"));

      expect(screen.queryAllByRole("button")).toHaveLength(0); // chip removed
    });
  });

  describe("Searchable Multi Select", () => {
    it("toggles clicked elements", () => {
      render(
        <Select label={label} multiple searchable>
          {fruitOptions}
        </Select>
      );

      expect(screen.queryAllByRole("button")).toHaveLength(0);
      const combobox = screen.getByRole("combobox");
      const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
      expect(combobox).toHaveAttribute("aria-expanded", "false");
      userEvent.click(comboboxBtn);
      expect(combobox).toHaveAttribute("aria-expanded", "true");

      const options = screen.getAllByRole("option");
      fireEvent.click(options[0]);

      expect(screen.getAllByRole("button")).toHaveLength(1); // has one chip

      fireEvent.click(options[0]);

      expect(screen.queryAllByRole("button")).toHaveLength(0); // chip removed
    });

    it("can select and remove items via the keyboard", () => {
      render(
        <Select label={label} multiple searchable>
          {fruitOptions}
        </Select>
      );
      const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
      userEvent.click(comboboxBtn);

      userEvent.keyboard(fruitOptions[0].props.children);
      userEvent.keyboard(UserEventKeys.ENTER);

      expect(screen.getAllByRole("button")).toHaveLength(1); // has one chip

      userEvent.keyboard(UserEventKeys.BACKSPACE);

      expect(screen.queryAllByRole("button")).toHaveLength(0); // chip removed
    });
  });

  describe("'creatable' functionality", () => {
    it("`SingleSelectSearchable` allows a user to create and remove custom options if `creatable` prop is set", () => {
      const newOptionText = "New Option";
      render(
        <Select label={label} searchable creatable>
          {fruitOptions}
        </Select>
      );

      const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
      userEvent.click(comboboxBtn);

      // pre search+add we have all options in the list
      expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

      userEvent.keyboard(newOptionText);
      expect(screen.getAllByRole("option")).toHaveLength(1);
      expect(screen.getByRole("option")).toHaveTextContent(newOptionText);

      userEvent.keyboard("{ArrowDown}");
      userEvent.keyboard(UserEventKeys.ENTER);

      // now that we've added the new option, we can now see the full list, excluding
      // the new option as we do not show that in the list
      expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

      // newly created chip has been added
      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(screen.getByRole("button")).toHaveTextContent(newOptionText);

      userEvent.keyboard(UserEventKeys.BACKSPACE);
      expect(screen.queryAllByRole("button")).toHaveLength(0); // chip removed
    });

    it("`SingleSelectSearchable` allows a user to create exactly one custom option", () => {
      const firstOptionText = "first custom option";
      const secondOptionText = "second custom option";
      render(
        <Select label={label} searchable creatable>
          {fruitOptions}
        </Select>
      );

      const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
      userEvent.click(comboboxBtn);

      // add first option
      userEvent.keyboard(firstOptionText);
      userEvent.keyboard("{ArrowDown}");
      userEvent.keyboard(UserEventKeys.ENTER);

      // first option chip has been created
      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(screen.getByRole("button")).toHaveTextContent(firstOptionText);

      // add second option
      userEvent.keyboard(secondOptionText);
      userEvent.keyboard("{ArrowDown}");
      userEvent.keyboard(UserEventKeys.ENTER);

      // first option chip has been removed in place of second option chip
      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(screen.getByRole("button")).toHaveTextContent(secondOptionText);
    });

    it("`MultiSelectSearchable` allows a user to create and remove custom options if `creatable` prop is set", () => {
      const newOptionText = "New Option";
      render(
        <Select label={label} multiple searchable creatable>
          {fruitOptions}
        </Select>
      );

      const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
      userEvent.click(comboboxBtn);

      // pre search+add we have all options in the list
      expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

      userEvent.keyboard(newOptionText);
      expect(screen.getAllByRole("option")).toHaveLength(1);
      expect(screen.getByRole("option")).toHaveTextContent(newOptionText);

      userEvent.keyboard("{ArrowDown}");
      userEvent.keyboard(UserEventKeys.ENTER);

      // now that we've added the new option, we can now see the full list, excluding
      // the new option as we do not show that in the list
      expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

      // newly created chip has been added
      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(screen.getByRole("button")).toHaveTextContent(newOptionText);

      userEvent.keyboard(UserEventKeys.BACKSPACE);
      expect(screen.queryAllByRole("button")).toHaveLength(0); // chip removed
    });

    it("`MultiSelectSearchable` allows a user to create multiple custom options", () => {
      const firstOptionText = "first custom option";
      const secondOptionText = "second custom option";
      render(
        <Select label={label} multiple searchable creatable>
          {fruitOptions}
        </Select>
      );

      const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
      userEvent.click(comboboxBtn);

      // add first option
      userEvent.keyboard(firstOptionText);
      userEvent.keyboard("{ArrowDown}");
      userEvent.keyboard(UserEventKeys.ENTER);

      // first option chip has been created
      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(screen.getByRole("button")).toHaveTextContent(firstOptionText);

      // add second option
      userEvent.keyboard(secondOptionText);
      userEvent.keyboard("{ArrowDown}");
      userEvent.keyboard(UserEventKeys.ENTER);

      // both chips have been created
      expect(screen.getAllByRole("button")).toHaveLength(2);
      expect(screen.getAllByRole("button")[1]).toHaveTextContent(
        secondOptionText
      );
    });
  });
});
