import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NeoThemeProvider, useNeoTheme } from "./ThemeProvider";

describe("NeoThemeProvider", () => {
  it("fully renders without exploding", () => {
    const view = render(<NeoThemeProvider>Testing</NeoThemeProvider>);

    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-global-colors"
        >
          Testing
        </div>
      </div>
    `);
  });

  it("renders with given initialMode as dark", () => {
    const view = render(
      <NeoThemeProvider initialMode="dark">Testing</NeoThemeProvider>
    );

    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-global-colors neo-dark"
        >
          Testing
        </div>
      </div>
    `);
  });

  it("renders with given initialMode as dynamic", () => {
    const view = render(
      <NeoThemeProvider initialMode="dynamic">Testing</NeoThemeProvider>
    );

    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-global-colors neo-dynamic"
        >
          Testing
        </div>
      </div>
    `);
  });

  it("context provider hook `useNeoTheme` allows changing mode", () => {
    const view = render(
      <NeoThemeProvider>
        <ChildComponent />
      </NeoThemeProvider>
    );

    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-global-colors"
        >
          <button>
            Set Dark
          </button>
        </div>
      </div>
    `);

    userEvent.click(view.getByText("Set Dark"));

    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-global-colors neo-dark"
        >
          <button>
            Set Light
          </button>
        </div>
      </div>
    `);
  });
});

const ChildComponent = () => {
  const { mode, setMode } = useNeoTheme();

  if (mode === "light") {
    return <button onClick={() => setMode("dark")}>Set Dark</button>;
  }

  return <button onClick={() => setMode("light")}>Set Light</button>;
};
