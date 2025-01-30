import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { SideNavigation } from "../SideNavigation";

describe("TopLinkItem", () => {
	const user = userEvent.setup();
	const TopLinkItemLabel = "label for top link";

	window.HTMLElement.prototype.scrollIntoView = vi.fn();

	it("fully renders without exploding", () => {
		const { getByText } = render(
			<SideNavigation.TopLinkItem label={TopLinkItemLabel} />,
		);
		const topLinkElement = getByText(TopLinkItemLabel);
		expect(topLinkElement).toBeInTheDocument();
	});

	it("accepts override of internal setting of active state", () => {
		const { rerender } = render(
			<SideNavigation currentUrl="#test" aria-label="test-label">
				<SideNavigation.TopLinkItem href="#test" label={TopLinkItemLabel} />
			</SideNavigation>,
		);
		const linkElement = screen.getByRole("link");
		expect(linkElement).toHaveClass("active");
		rerender(
			<SideNavigation
				currentUrl="#test"
				aria-label="test-label"
				isActiveOverride
			>
				<SideNavigation.TopLinkItem href="#test" label={TopLinkItemLabel} />
			</SideNavigation>,
		);
		expect(linkElement).not.toHaveClass("active");
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<ul>
				<SideNavigation.TopLinkItem label={TopLinkItemLabel} />
			</ul>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	// TODO: skipping due to not seeing an `active` prop being used
	// it("assigns the appropriate class name when the `active` prop is passed", () => {
	//   render(
	//     <SideNavigation currentUrl="#test">
	//       <SideNavigation.TopLinkItem href="#test" label={TopLinkItemLabel} />
	//     </SideNavigation>
	//   );
	//   const linkElement = screen.getByRole("listitem");
	//   expect(linkElement).toHaveClass("neo-leftnav__main--active");
	// });
	// it("assigns the appropriate class name when `icon` prop is passed with `active` prop", () => {
	//   render(
	//     <SideNavigation.TopLinkItem
	//       label={TopLinkItemLabel}
	//       active
	//       icon="address-book"
	//       href="#"
	//     />
	//   );
	//   const linkElement = screen.getByRole("link");
	//   expect(linkElement).toHaveClass("neo-icon-address-book");
	// });
	// it("assigns the appropriate class name when `icon` prop is passed without `active` prop", () => {
	//   render(
	//     <SideNavigation.TopLinkItem
	//       label={TopLinkItemLabel}
	//       icon="address-book"
	//       href="#"
	//     />
	//   );
	//   const linkElement = screen.getByRole("link");
	//   expect(linkElement).toHaveClass("neo-icon-address-book");
	// });

	it("should simulate onclick function when not disabled", async () => {
		const mockedFunction = vi.fn();
		const { getByText } = render(
			<SideNavigation
				aria-label="Main Navigation"
				onNavigate={mockedFunction}
				currentUrl=""
			>
				<SideNavigation.TopLinkItem label={TopLinkItemLabel} href="#home" />
			</SideNavigation>,
		);
		const linkElement = getByText(TopLinkItemLabel);
		await user.click(linkElement);
		expect(mockedFunction).toHaveBeenCalled();
	});

	it("uses a `<button>` when it _is_ disabled", () => {
		const { container } = render(
			<SideNavigation.TopLinkItem label={TopLinkItemLabel} disabled />,
		);
		const linkElement = container.querySelector("a");
		const buttonElement = container.querySelector("button");
		expect(linkElement).not.toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
	});

	it("should not simulate onclick function for disable link", async () => {
		const mockedFunction = vi.fn();
		const { getByText } = render(
			<SideNavigation.TopLinkItem
				onClick={mockedFunction}
				label={TopLinkItemLabel}
				disabled
			/>,
		);
		const linkElement = getByText(TopLinkItemLabel);
		await user.click(linkElement);
		expect(mockedFunction).not.toHaveBeenCalled();
	});
});
