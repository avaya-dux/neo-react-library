import { composeStories } from "@storybook/testing-react"
import { cleanup, render } from "@testing-library/react"
import { axe } from "jest-axe"
import { vi } from "vitest"

import { CheckboxGroup } from "."
import * as CheckboxGroupStories from "./CheckboxGroup.stories"
import { DefaultCheckboxArray } from "./helpers"

const { DefaultCheckboxGroup, InlineCheckboxGroup } = composeStories(
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

    beforeEach(() => {
      // ignore tooltip position warning
      vi.spyOn(console, "warn").mockImplementation(() => null)

      renderResult = render(
        <CheckboxGroup {...DefaultProps}>
          {DefaultCheckboxArray.map((checkbox) => checkbox)}
        </CheckboxGroup>
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
      const rootElement = getByLabelText(DefaultCheckboxArray[0].props.label)
      expect(rootElement).toBeTruthy()
    })

    it("checkbox renders with correct class name", () => {
      const { getByLabelText } = renderResult
      const rootElement = getByLabelText(DefaultCheckboxArray[5].props.label)
      expect(rootElement).toHaveAttribute(
        "class",
        "neo-check neo-check--indeterminate"
      )
    })

    it("has a value that matches the label", () => {
      const { getByLabelText } = renderResult
      DefaultCheckboxArray.forEach((checkboxObject) => {
        const check = getByLabelText(checkboxObject.props.label)
        expect(check).toHaveAttribute("value", checkboxObject.props.label)
      })
    })

    it("has a correct id when passed", () => {
      const { getByLabelText } = renderResult
      const check = getByLabelText(DefaultCheckboxArray[2].props.label)
      expect(check).toHaveAttribute("id", DefaultCheckboxArray[2].props.id)
    })

    it("renders as disabled", () => {
      const { getByLabelText } = renderResult
      DefaultCheckboxArray.forEach((checkboxObject) => {
        if (checkboxObject.props.disabled) {
          const check = getByLabelText(checkboxObject.props.label)
          expect(check).toHaveAttribute("disabled")
        } else {
          const check = getByLabelText(checkboxObject.props.label)
          expect(check).not.toHaveAttribute("disabled")
        }
      })
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

    describe("InlineCheckboxGroup", () => {
      let renderResult

      beforeEach(() => {
        renderResult = render(<InlineCheckboxGroup />)
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
