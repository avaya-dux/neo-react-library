import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import {
  Avatar,
  getAvatarFigureProps,
  getAvatarImageProps,
  getAvatarStatusProps,
} from "./Avatar";

const errorSpy = jest
  .spyOn(global.console, "error")
  .mockImplementationOnce(() => null);

beforeEach(() => {
  errorSpy.mockReset();
});

describe("getAvatarFigureProps", () => {
  it("returns expected props", () => {
    expect(getAvatarFigureProps({ label: "Jeff" })).toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jeff",
        "className": "neo-avatar neo-avatar--generic",
      }
    `);

    expect(getAvatarFigureProps({ label: "Jim", size: "sm", variant: "bot" }))
      .toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jim",
        "className": "neo-avatar neo-avatar--small neo-avatar--small--bot",
      }
    `);

    expect(getAvatarFigureProps({ label: "Jenna", size: "md", variant: "bot" }))
      .toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jenna",
        "className": "neo-avatar neo-avatar--bot",
      }
    `);

    expect(
      getAvatarFigureProps({ label: "Jezebel", size: "lg", variant: "bot" })
    ).toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jezebel",
        "className": "neo-avatar neo-avatar--large neo-avatar--large--bot",
      }
    `);

    expect(
      getAvatarFigureProps({
        label: "Jerry",
        size: "sm",
        variant: "generic",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jerry",
        "className": "neo-avatar neo-avatar--small neo-avatar--small--generic",
      }
    `);

    expect(
      getAvatarFigureProps({
        label: "Jordan",
        size: "md",
        variant: "generic",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jordan",
        "className": "neo-avatar neo-avatar--generic",
      }
    `);

    expect(
      getAvatarFigureProps({
        label: "Jemima",
        size: "lg",
        variant: "generic",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jemima",
        "className": "neo-avatar neo-avatar--large neo-avatar--large--generic",
      }
    `);

    expect(getAvatarFigureProps({ label: "Jonah", initials: "JJ" }))
      .toMatchInlineSnapshot(`
      Object {
        "aria-label": "Jonah",
        "className": "neo-avatar",
        "data-initials": "JJ",
      }
    `);

    expect(getAvatarFigureProps({ label: "Joey", border: "default" }))
      .toMatchInlineSnapshot(`
      Object {
        "aria-label": "Joey",
        "className": "neo-avatar neo-avatar--generic neo-avatar--default",
      }
    `);

    // and finally a bit of everything
    expect(
      getAvatarFigureProps({
        size: "lg",
        variant: "bot",
        label: "John",
        initials: "JJ",
        border: "success",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "aria-label": "John",
        "className": "neo-avatar neo-avatar--large neo-avatar--large--bot neo-avatar--success",
        "data-initials": "JJ",
      }
    `);
  });

  it("does not set aria-label if no `label` passed", () => {
    expect(getAvatarFigureProps()).toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar neo-avatar--generic",
      }
    `);
  });

  it("does not set aria-label if there is an image", () => {
    expect(getAvatarFigureProps({ label: "Jonah", image: "jjonah.jpg" }))
      .toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar",
      }
    `);
  });
});

describe("getAvatarImageProps", () => {
  it("returns expected props", () => {
    expect(
      getAvatarImageProps({ label: "Free Guy", image: "/images/freeguy.png" })
    ).toMatchInlineSnapshot(`
      Object {
        "alt": "Free Guy",
        "className": "neo-img",
        "src": "/images/freeguy.png",
      }
    `);
  });
});
describe("getAvatarStatusProps", () => {
  it("returns expected props", () => {
    expect(getAvatarStatusProps()).toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar-status",
      }
    `);

    expect(getAvatarStatusProps({ status: "available" }))
      .toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar-status neo-avatar-status--available",
      }
    `);
    expect(getAvatarStatusProps({ status: "busy" })).toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar-status neo-avatar-status--busy",
      }
    `);
    expect(getAvatarStatusProps({ status: "away" })).toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar-status neo-avatar-status--away",
      }
    `);
    expect(getAvatarStatusProps({ status: "do-not-disturb" }))
      .toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar-status neo-avatar-status--do-not-disturb",
      }
    `);
    expect(getAvatarStatusProps({ status: "offline" })).toMatchInlineSnapshot(`
      Object {
        "className": "neo-avatar-status neo-avatar-status--offline",
      }
    `);
  });
});

// putting at the bottom of the file because if the above tests fail
// then they are probably causing the following tests to fail
describe("Avatar", () => {
  it("fully renders without exploding", () => {
    const { container, getByLabelText } = render(<Avatar label="My Label" />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <figure
          aria-label="My Label"
          class="neo-avatar neo-avatar--generic"
        />
      </div>
    `);

    expect(getByLabelText("My Label")).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Avatar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders images as expected", () => {
    const { container } = render(
      <Avatar
        label="Joey Joe Joe Jr."
        image="https://www.simpsons.com/joeyjoejoe.jpg"
        size="lg"
        border="default"
        status="available"
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <figure
          class="neo-avatar neo-avatar--large neo-avatar--default"
        >
          <img
            alt="Joey Joe Joe Jr."
            class="neo-img"
            src="https://www.simpsons.com/joeyjoejoe.jpg"
          />
          <div
            class="neo-avatar-status neo-avatar-status--available"
          />
        </figure>
      </div>
    `);
  });

  it("renders a complicated example as expected", () => {
    const { container } = render(
      <Avatar
        initials="JJ"
        label="J. Jonah Jameson"
        size="sm"
        variant="generic"
        border="alert"
        status="available"
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <figure
          aria-label="J. Jonah Jameson"
          class="neo-avatar neo-avatar--small neo-avatar--small--generic neo-avatar--alert"
          data-initials="JJ"
        >
          <div
            class="neo-avatar-status neo-avatar-status--available"
          />
        </figure>
      </div>
    `);
  });
  it("Small Avatar accessibility ok", async () => {
    const { container } = render(<Avatar size="sm" variant="bot" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
