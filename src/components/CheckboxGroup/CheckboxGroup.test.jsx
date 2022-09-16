import { composeStories } from "@storybook/testing-react"
import { cleanup, render, screen } from "@testing-library/react"
import { axe } from "jest-axe"
import { vi } from "vitest"

import { CheckboxGroup } from "."
import * as CheckboxGroupStories from "./CheckboxGroup.stories"
import { checkboxes, disabledCheckboxes, readonlyCheckboxes } from "./helpers"

const { DefaultCheckboxGroup, InlineDefaultCheckboxGroup } = composeStories(
  CheckboxGroupStories
)

async function axeTest(renderResult) {
  const { container } = renderResult
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}

const DefaultProps = {
  groupName: "Checkbox Group",
  checked: "Check 1",
  onChange: () => null,
}

describe("CheckboxGroup", () => {
  describe("base tests", () => {
    let renderResult
    const defaultCheckboxes = checkboxes(true, "mixed")
    beforeEach(() => {
      // ignore tooltip position warning
      vi.spyOn(console, "warn").mockImplementation(() => null)

      renderResult = render(
        <CheckboxGroup {...DefaultProps}>{defaultCheckboxes}</CheckboxGroup>
      )
    })

    afterEach(() => {
      cleanup()
    })

    it("checkbox group renders ok", () => {
      const { getByTestId } = renderResult
      const rootElement = getByTestId("CheckboxGroup-root")
      expect(rootElement).toBeTruthy()
    })

    it("checkbox renders ok", () => {
      const { getByLabelText } = renderResult
      const rootElement = getByLabelText(defaultCheckboxes[0].props.label)
      expect(rootElement).toBeTruthy()
    })

    it("checkbox renders with correct class name", () => {
      const { getByLabelText } = renderResult
      const rootElement = getByLabelText(defaultCheckboxes[4].props.label)
      expect(rootElement).toHaveAttribute(
        "class",
        "neo-check neo-check--indeterminate"
      )
    })

    it("has correct value", () => {
      const { getByLabelText } = renderResult
      defaultCheckboxes.forEach((checkboxObject) => {
        const check = getByLabelText(checkboxObject.props.label)
        expect(check).toHaveAttribute("value", checkboxObject.value)
      })
    })

    it("has a correct id when passed", () => {
      const { getByLabelText } = renderResult
      const check = getByLabelText(defaultCheckboxes[3].props.label)
      expect(check).toHaveAttribute("id", defaultCheckboxes[3].props.id)
    })

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult)
    })
  })

  describe("disabled checkbox group", () => {
    let renderResult
    beforeEach(() => {
      // ignore tooltip position warning
      vi.spyOn(console, "warn").mockImplementation(() => null)

      renderResult = render(
        <CheckboxGroup {...DefaultProps}>{disabledCheckboxes}</CheckboxGroup>
      )
    })

    afterEach(() => {
      cleanup()
    })

    it("renders as disabled", () => {
      const { getByLabelText } = renderResult
      disabledCheckboxes.forEach((checkboxObject) => {
        expect(checkboxObject.props.disabled).toBeTruthy()
        const check = getByLabelText(checkboxObject.props.label)
        expect(check).toHaveAttribute("disabled")
      })
    })

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult)
    })
  })

  describe("readonly checkbox group", () => {
    let renderResult
    beforeEach(() => {
      // ignore tooltip position warning
      vi.spyOn(console, "warn").mockImplementation(() => null)

      renderResult = render(
        <CheckboxGroup {...DefaultProps}>{readonlyCheckboxes}</CheckboxGroup>
      )
    })

    afterEach(() => {
      cleanup()
    })

    it("renders as readonly", () => {
      const checkboxes = screen.getAllByLabelText(/readonly/)
      expect(checkboxes).toBeTruthy()
      expect(checkboxes.length).toEqual(5)
    })

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult)
    })
  })

  describe("storybook tests", () => {
    describe("DefaultCheckboxGroup", () => {
      let renderResult

      beforeEach(() => {
        renderResult = render(<DefaultCheckboxGroup />)
      })

      afterEach(() => {
        cleanup()
      })

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    })

    describe("InlineDefaultCheckboxGroup", () => {
      let renderResult

      beforeEach(() => {
        renderResult = render(<InlineDefaultCheckboxGroup />)
      })

      afterEach(() => {
        cleanup()
      })

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    })
  })
})
