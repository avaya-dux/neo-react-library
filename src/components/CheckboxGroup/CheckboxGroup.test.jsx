import { composeStories } from "@storybook/testing-react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { CheckboxGroup } from ".";
import * as CheckboxGroupStories from "./CheckboxGroup.stories";
import {
  checkboxes,
  disabledCheckboxes,
  readonlyCheckboxes,
} from "./testHelpers";

const {
  Default,
  DefaultCheckboxGroup,
  InlineDefaultCheckboxGroup,
  DisabledCheckboxGroup,
  InlineDisabledCheckboxGroup,
  ReadonlyCheckboxGroup,
  InlineReadonlyCheckboxGroup,
} = composeStories(CheckboxGroupStories);

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

const defaultCheckboxGroupLabel = "Checkbox Group";
const DefaultProps = {
  label: defaultCheckboxGroupLabel,
  groupName: "checkbox-group",
  checked: "Check 1",
  onChange: () => null,
};

describe("CheckboxGroup", () => {
  describe("base tests", () => {
    let renderResult;
    const defaultCheckboxes = checkboxes(DefaultProps.groupName, true, "mixed");
    beforeEach(() => {
      renderResult = render(
        <CheckboxGroup {...DefaultProps}>{defaultCheckboxes}</CheckboxGroup>,
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("checkbox group renders ok", () => {
      const groupLabel = screen.getByText(defaultCheckboxGroupLabel);
      expect(groupLabel).toBeInTheDocument();
    });

    it("checkbox renders ok", () => {
      const rootElement = screen.getByLabelText(
        defaultCheckboxes[0].props.children,
      );
      expect(rootElement).toBeTruthy();
    });

    it("checkbox renders with correct class name", () => {
      const rootElement = screen.getByLabelText(
        defaultCheckboxes[4].props.children,
      );
      expect(rootElement).toHaveAttribute(
        "class",
        "neo-check neo-check--indeterminate",
      );
    });

    it("has correct value", () => {
      defaultCheckboxes.forEach((checkboxObject) => {
        const check = screen.getByLabelText(checkboxObject.props.children);
        expect(check).toHaveAttribute("value", checkboxObject.value);
      });
    });

    it("has a correct id when passed", () => {
      const check = screen.getByLabelText(defaultCheckboxes[3].props.children);
      expect(check).toHaveAttribute("id", defaultCheckboxes[3].props.id);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("extended cases", () => {
    const defaultCheckboxes = checkboxes(DefaultProps.groupName, true, "mixed");

    it("shows `helperText` if passed", () => {
      const helperText = "This is a helper text";
      render(
        <CheckboxGroup {...DefaultProps} helperText={helperText}>
          {defaultCheckboxes}
        </CheckboxGroup>,
      );

      expect(screen.getByText(helperText)).toBeInTheDocument();
    });

    it("if passed a `label`, creates an `id` prop for it that is: `${groupName}-label`", () => {
      const groupName = "checkbox-groupname";
      const labelId = `${groupName}-label`;
      render(
        <CheckboxGroup label={defaultCheckboxGroupLabel} groupName={groupName}>
          {defaultCheckboxes}
        </CheckboxGroup>,
      );

      expect(screen.getByText(defaultCheckboxGroupLabel)).toHaveAttribute(
        "id",
        labelId,
      );
    });

    it("if a `label` is not passed, an `aria-labelledby` is required and is used by the root element (`<div>`)", () => {
      const labelId = "checkbox-group-label";
      render(
        <>
          <div id={labelId}>{defaultCheckboxGroupLabel}</div>

          <CheckboxGroup aria-labelledby={labelId} groupName="group-name">
            {defaultCheckboxes}
          </CheckboxGroup>
        </>,
      );

      expect(screen.getByLabelText(defaultCheckboxGroupLabel)).toHaveAttribute(
        "role",
        "group",
      );
    });

    it("if neither a `label` or `aria-labelledby` is passed, an error is thrown", () => {
      vi.spyOn(console, "error").mockImplementation(() => null);
      expect(() =>
        render(
          <CheckboxGroup groupName="group-name">
            {defaultCheckboxes}
          </CheckboxGroup>,
        ),
      ).toThrowError();
    });
  });

  describe("disabled checkbox group", () => {
    let renderResult;
    const checkboxes = disabledCheckboxes("Disabled group");
    beforeEach(() => {
      // ignore tooltip position warning
      vi.spyOn(console, "warn").mockImplementation(() => null);

      renderResult = render(
        <CheckboxGroup {...DefaultProps}>{checkboxes}</CheckboxGroup>,
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("renders as disabled", () => {
      const { getByLabelText } = renderResult;
      checkboxes.forEach((checkboxObject) => {
        expect(checkboxObject.props.disabled).toBeTruthy();
        const check = getByLabelText(checkboxObject.props.children);
        expect(check).toHaveAttribute("disabled");
      });
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("readonly checkbox group", () => {
    let renderResult;
    beforeEach(() => {
      // ignore tooltip position warning
      vi.spyOn(console, "warn").mockImplementation(() => null);

      renderResult = render(
        <CheckboxGroup {...DefaultProps}>
          {readonlyCheckboxes("readonly group")}
        </CheckboxGroup>,
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("renders as readonly", () => {
      const checkboxes = screen.getAllByLabelText(/readonly/);
      expect(checkboxes).toBeTruthy();
      expect(checkboxes.length).toEqual(5);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("storybook tests", () => {
    describe("Default", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Default />);
      });

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("DefaultCheckboxGroup", () => {
      vi.spyOn(console, "log").mockImplementation(() => null);

      const user = userEvent.setup();

      let renderResult;

      beforeEach(() => {
        renderResult = render(<DefaultCheckboxGroup />);
      });

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it("form data are correct", async () => {
        const checkedOutput = screen.getByLabelText("checked values:");
        expect(checkedOutput.value).toEqual("");

        const submit = screen.getByRole("button");
        expect(submit).toBeTruthy();
        await user.click(submit);
        expect(checkedOutput.value).toEqual("false, true, true, true, true");

        const unchecked = screen.getByLabelText("Check 1 unchecked");
        expect(unchecked).toBeTruthy();
        unchecked.focus();
        await user.keyboard(UserEventKeys.SPACE);
        await user.click(submit);
        expect(checkedOutput.value).toEqual("true, true, true, true, true");
      });
    });

    describe("InlineDefaultCheckboxGroup", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<InlineDefaultCheckboxGroup />);
      });

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("DisabledCheckboxGroup", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<DisabledCheckboxGroup />);
      });

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("InlineDisabledCheckboxGroup", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<InlineDisabledCheckboxGroup />);
      });

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("ReadonlyCheckboxGroup", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<ReadonlyCheckboxGroup />);
      });

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("InlineReadonlyCheckboxGroup", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<InlineReadonlyCheckboxGroup />);
      });

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
