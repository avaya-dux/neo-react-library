import { render } from "@testing-library/react";

import {
	ClosableTab,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
} from "./TabComponents";

describe("TabComponets", () => {
	it("Tab holds props correctly", () => {
		const tab = (
			<Tab className="class1" dir="rtl">
				this is a tab
			</Tab>
		);

		expect(tab.props.dir).toBe("rtl");
		expect(tab.props.className).toBe("class1");
		expect(tab.props.children).toBe("this is a tab");
		expect(tab.type).toBe(Tab);
		const { container } = render(tab);
		expect(container).toBeEmptyDOMElement();
	});
	it("ClosableTab holds props correctly", () => {
		const tab = (
			<ClosableTab id="closable" icon="accept" className="class1">
				this is a tab
			</ClosableTab>
		);
		expect(tab.props.id).toBe("closable");
		expect(tab.props.icon).toBe("accept");
		expect(tab.props.className).toBe("class1");
		expect(tab.props.dir).not.toBeDefined();
		expect(tab.props.children).toBe("this is a tab");
		expect(tab.type).toBe(ClosableTab);
		const { container } = render(tab);
		expect(container).toBeEmptyDOMElement();
	});
	it("TabList holds props correctly", () => {
		const tabList = (
			<TabList id="list1">
				<Tab>tab1</Tab>
			</TabList>
		);
		expect(tabList.props.children.type).toBe(Tab);
		expect(tabList.type).toBe(TabList);
		const { container } = render(tabList);
		expect(container).toBeEmptyDOMElement();
	});
	it("TabPanel holds props correctly", () => {
		const tabPanel = (
			<TabPanel className="class1" dir="rtl">
				content
			</TabPanel>
		);
		expect(tabPanel.props.dir).toBe("rtl");
		expect(tabPanel.props.className).toBe("class1");
		expect(tabPanel.props.children).toBe("content");
		expect(tabPanel.type).toBe(TabPanel);
		const { container } = render(tabPanel);
		expect(container).toBeEmptyDOMElement();
	});
	it("TabPanels holds props correctly", () => {
		const tabPanels = (
			<TabPanels id="list1">
				<TabPanel>panel1</TabPanel>
			</TabPanels>
		);
		expect(tabPanels.props.children.type).toBe(TabPanel);
		expect(tabPanels.type).toBe(TabPanels);
		const { container } = render(tabPanels);
		expect(container).toBeEmptyDOMElement();
	});
});
