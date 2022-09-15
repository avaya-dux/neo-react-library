import { composeStories } from "@storybook/testing-react"
import { cleanup, render, screen } from "@testing-library/react"
import { axe } from "jest-axe"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { UserEventKeys } from "utils"

import { Checkbox } from "./"
import * as CheckboxStories from "./Checkbox.stories"

const {
  Default,
  DefaultChecked,
  CheckedAndControlled,
  CheckedAndUncontrolled,
  UncheckedAndControlled,
  UncheckedAndUncontrolled,
  MixedAndControlled,
  MixedAndUncontrolled,
} = composeStories(CheckboxStories)

const DefaultProps = {
  id: "checkbox-id",
  label: "example label",
  value: "1",
}

vi.spyOn(console, "log").mockImplementation(() => null)

describe("Checkbox", () => {

  afterEach(() => {
    cleanup();
  });

  it("renders as unchecked appropriately", () => {
    const { getByLabelText } = render(<Checkbox {...DefaultProps} />)

    const checkboxElement = getByLabelText(DefaultProps.label)
    expect(checkboxElement.cheched).toBeFalsy()
  })

  it("renders as checked appropriately", () => {
    const { getByLabelText } = render(<Checkbox {...DefaultProps} checked />)

    const checkboxElement = getByLabelText(DefaultProps.label)
    expect(checkboxElement).toBeTruthy()
    expect(checkboxElement.checked).toBeTruthy()
  })

  it("throws if an accessibility issue is discovered", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => null)
    expect(() => render(<Checkbox value="test one" />)).toThrow()
    expect(spy).toHaveBeenCalled()
  })

  it("passes basic axe compliance", async () => {
    const { container } = render(<Checkbox {...DefaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  describe("className is assigned appropriately", () => {
    afterEach(() => {
      cleanup();
    });

    it("returns the correct class name when passed `true`", () => {
      render(<Checkbox {...DefaultProps} checked />)
      const checkboxElement = screen.getByLabelText(DefaultProps.label)

      expect(checkboxElement).not.toHaveClass("neo-check--indeterminate")
      expect(checkboxElement).toHaveClass("neo-check")
    })

    it("returns the correct class name when passed `false`", () => {
      render(<Checkbox {...DefaultProps} />)
      const checkboxElement = screen.getByLabelText(DefaultProps.label)

      expect(checkboxElement).not.toHaveClass("neo-check--indeterminate")
      expect(checkboxElement).toHaveClass("neo-check")
    })

    it("returns the correct class name when passed `mixed`", () => {
      render(<Checkbox {...DefaultProps} checked="mixed" />)
      const checkboxElement = screen.getByLabelText(DefaultProps.label)

      expect(checkboxElement).toHaveClass("neo-check--indeterminate")
      expect(checkboxElement).toHaveClass("neo-check")
    })

    it("returns the correct class name when passed a `className`", () => {
      const exampleCssClass = "example-css-class"
      render(<Checkbox {...DefaultProps} className={exampleCssClass} />)
      const checkboxElement = screen.getByLabelText(DefaultProps.label)

      expect(checkboxElement).toHaveClass(exampleCssClass)
      expect(checkboxElement).toHaveClass("neo-check")
    })
  })

  describe("storybook tests", () => {

    describe(Default.name, () => {
      const user = userEvent.setup()
      let renderResult

      beforeEach(() => {
        renderResult = render(<Default />)
      })

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toBeFalsy()
        await user.tab()
        expect(checkboxElement).toHaveFocus()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
      })
    })

    describe(DefaultChecked.name, () => {
      const user = userEvent.setup()

      let renderResult

      beforeEach(() => {
        renderResult = render(<DefaultChecked />)
      })

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toBeTruthy()
        await user.tab()
        expect(checkboxElement).toHaveFocus()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeFalsy()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
      })
    })

    describe(CheckedAndControlled.name, () => {
      const user = userEvent.setup()

      let renderResult

      beforeEach(() => {
        renderResult = render(<CheckedAndControlled />)
      })

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toBeTruthy()
        await user.tab()
        expect(checkboxElement).toHaveFocus()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeFalsy()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
      })
    })

    describe(CheckedAndUncontrolled.name, () => {
      const user = userEvent.setup()

      let renderResult

      beforeEach(() => {
        renderResult = render(<CheckedAndUncontrolled />)
      })

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toBeTruthy()
        await user.tab()
        expect(checkboxElement).toHaveFocus()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeFalsy()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
      })
    })

    describe(UncheckedAndControlled.name, () => {
      const user = userEvent.setup()

      let renderResult

      beforeEach(() => {
        renderResult = render(<UncheckedAndControlled />)
      })

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toBeFalsy()
        await user.tab()
        expect(checkboxElement).toHaveFocus()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeFalsy()
      })
    })
    describe(UncheckedAndUncontrolled.name, () => {
      const user = userEvent.setup()

      let renderResult

      beforeEach(() => {
        renderResult = render(<UncheckedAndUncontrolled />)
      })

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toBeFalsy()
        await user.tab()
        expect(checkboxElement).toHaveFocus()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeFalsy()
      })
    })
    describe(MixedAndControlled.name, () => {
      const user = userEvent.setup()

      let renderResult

      beforeEach(() => {
        renderResult = render(<MixedAndControlled />)
      })

      afterEach(() => {
        cleanup();
      });

      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toEqual(true)
        expect(checkboxElement.getAttribute("aria-checked")).toEqual("mixed")

        await user.tab()
        expect(checkboxElement).toHaveFocus()

        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
        expect(checkboxElement.getAttribute("aria-checked")).toEqual("true")

        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeFalsy()
        expect(checkboxElement.getAttribute("aria-checked")).toEqual("false")

      })
    })
    describe(MixedAndUncontrolled.name, () => {
      const user = userEvent.setup()

      let renderResult

      beforeEach(() => {
        renderResult = render(<MixedAndUncontrolled />)
      })

      afterEach(() => {
        cleanup();
      });
      
      it("should render ok", () => {
        const { container } = renderResult
        expect(container).not.toBe(null)
      })

      it("passes basic axe compliance", async () => {
        const { container } = renderResult
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })

      it("should be accessible by space key", async () => {
        const checkboxElement = screen.getByRole("checkbox")
        expect(checkboxElement.checked).toEqual(true)
        expect(checkboxElement.getAttribute("aria-checked")).toEqual("mixed")

        await user.tab()
        expect(checkboxElement).toHaveFocus()

        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeTruthy()
        expect(checkboxElement.getAttribute("aria-checked")).toEqual("true")

        await user.keyboard(UserEventKeys.SPACE)
        expect(checkboxElement.checked).toBeFalsy()
        expect(checkboxElement.getAttribute("aria-checked")).toEqual("false")

        // arrow up should do nothing
        await user.keyboard(UserEventKeys.UP)
        expect(checkboxElement.checked).toBeFalsy()
        expect(checkboxElement.getAttribute("aria-checked")).toEqual("false")

      })
    })
  })
})
