import log from "loglevel";
import { vi } from "vitest";

import {
	ClosableTab,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
} from "./TabComponents";
import {
	buildTabProps,
	buildTabPropsNoPanel,
	debugTabs,
	getContentClasses,
	getTabItemClasses,
	isValidPanelElement,
	isValidTabElement,
} from "./TabUtils";
import { Tabs } from "./Tabs";

describe("TabUtils", () => {
	describe("isValidTabElement", () => {
		it("when element is fragment, return false", () => {
			const element = <></>;
			expect(isValidTabElement(element)).toBeFalsy();
		});
		it("when element is html element, return false", () => {
			const element = <div />;
			expect(isValidTabElement(element)).toBeFalsy();
		});
		it("when element is tab element, return true", () => {
			const element = <Tab>Tab one</Tab>;
			expect(isValidTabElement(element)).toBeTruthy();
		});
		it("when element is closable tab element, return true", () => {
			const element = <ClosableTab>Tab one</ClosableTab>;
			expect(isValidTabElement(element)).toBeTruthy();
		});
	});

	describe("isValidPanelElement", () => {
		it("when element is fragment, return false", () => {
			const element = <></>;
			expect(isValidPanelElement(element)).toBeFalsy();
		});
		it("when element is html element, return false", () => {
			const element = <div />;
			expect(isValidPanelElement(element)).toBeFalsy();
		});
		it("when element is tab element, return false", () => {
			const element = <Tab>Tab one</Tab>;
			expect(isValidPanelElement(element)).toBeFalsy();
		});
		it("when element is tab panel element, return true", () => {
			const element = <TabPanel>content one</TabPanel>;
			expect(isValidPanelElement(element)).toBeTruthy();
		});
	});

	describe("getContentClasses", () => {
		it("when className is undefined and active is true, should return neo-tabs__container--active", () => {
			expect(getContentClasses(true)).toBe("neo-tabs__container--active");
		});
		it("when className is undefined and active is false, should return neo-tabs__container", () => {
			expect(getContentClasses(false)).toBe("neo-tabs__container");
		});
		it("when className is defined and active is true, should return neo-tabs__container--active and className", () => {
			const className = "my-class";
			expect(getContentClasses(true, className)).toBe(
				`${className} neo-tabs__container--active`,
			);
		});
		it("when className is defined and active is false, should return neo-tabs__container and className", () => {
			const className = "my-class";
			expect(getContentClasses(false, className)).toBe(
				`${className} neo-tabs__container`,
			);
		});
	});

	describe("getTabItemClasses", () => {
		describe("when active = true and disabled = true", () => {
			it(" and vertical = false, return neo-tabs__item--active-disabled and neo-tabs__item", () => {
				const result = getTabItemClasses({
					active: true,
					disabled: true,
					vertical: false,
				});
				expect(result).toContain("neo-tabs__item--active-disabled");
				expect(result).toContain("neo-tabs__item");
			});
			it("and vertical = true, return neo-tabs__item--vertical--active-disabled and neo-tabs__item", () => {
				const result = getTabItemClasses({
					active: true,
					disabled: true,
					vertical: true,
				});
				expect(result).toContain("neo-tabs__item--vertical--active-disabled");
				expect(result).toContain("neo-tabs__item");
			});
		});
		describe("when active = true and disabled = false ", () => {
			it("and vertical = false, return neo-tabs__item--active and neo-tabs__item", () => {
				const result = getTabItemClasses({
					active: true,
					disabled: false,
					vertical: false,
				});
				expect(result).toContain("neo-tabs__item--active");
				expect(result).toContain("neo-tabs__item");
				expect(result.split(" ").length).toBe(2);
				expect(result).not.toContain("neo-tabs__item--vertical");
			});
			it("and vertical = true, return 3 classes: neo-tabs__item--vertical--active, neo-tabs__item--vertical, and neo-tabs__item", () => {
				const result = getTabItemClasses({
					active: true,
					disabled: false,
					vertical: true,
				});
				expect(result).toContain("neo-tabs__item--vertical--active");
				expect(result).toContain("neo-tabs__item--vertical");
				expect(result).toContain("neo-tabs__item");
				expect(result.split(" ").length).toBe(3);
			});
		});
		describe("when active = false and disabled = true ", () => {
			it("and vertical = false, correct classes are returned", () => {
				const result = getTabItemClasses({
					active: false,
					disabled: true,
					vertical: false,
				});
				expect(result).toContain("neo-tabs__item--disabled");
				expect(result).toContain("neo-tabs__item");
				expect(result.split(" ").length).toBe(2);
			});
			it("and vertical = true, return neo-tabs__item--disabled and neo-tabs__item", () => {
				const result = getTabItemClasses({
					active: false,
					disabled: true,
					vertical: true,
				});
				expect(result).toContain("neo-tabs__item--disabled");
				expect(result).toContain("neo-tabs__item");
				expect(result.split(" ").length).toBe(2);
			});
		});
		describe("when active = false and disabled = false", () => {
			it("and vertical = false, return only neo-tabs__item", () => {
				const result = getTabItemClasses({ active: false, disabled: false });
				expect(result).toContain("neo-tabs__item");
				expect(result.split(" ").length).toBe(1);
			});
			it("and vertical = true, return only neo-tabs__item", () => {
				const result = getTabItemClasses({
					active: false,
					disabled: false,
					vertical: true,
				});
				expect(result).toContain("neo-tabs__item");
				expect(result.split(" ").length).toBe(1);
			});
		});
	});

	describe("buildTabProps", () => {
		it("returns a value for 'id' if this property was not initially defined", () => {
			const tabs = (
				<Tabs>
					<TabList>
						<Tab>tab1</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>content1</TabPanel>
					</TabPanels>
				</Tabs>
			);
			const actual = buildTabProps(tabs.props.children);
			expect(actual.length).toBe(1);
			expect(actual[0].id).toBeDefined();
		});
		it("parses correctly given proper tags", () => {
			const tabs = (
				<Tabs defaultTabId="tab1">
					<TabList>
						<Tab id="tab1" dir="ltr" onClose={() => null}>
							tab1
						</Tab>

						<Tab id="tab2" disabled>
							tab2
						</Tab>
						<ClosableTab id="tab3" closable>
							tab3
						</ClosableTab>
					</TabList>
					<TabPanels>
						<TabPanel id="panel1">
							<h2>content1</h2>
							<p>paragraph 1</p>
						</TabPanel>
						<TabPanel id="panel2" className="customClass" dir="ltr">
							content 2
						</TabPanel>
						<TabPanel id="panel3">content 3</TabPanel>
					</TabPanels>
				</Tabs>
			);
			const propsBuilt = buildTabProps(tabs.props.children);
			expect(propsBuilt.length).toBe(3);
			expect(propsBuilt[0]).toMatchInlineSnapshot(`
      {
        "closable": false,
        "content": {
          "children": [
            <h2>
              content1
            </h2>,
            <p>
              paragraph 1
            </p>,
          ],
          "id": "panel1",
        },
        "dir": "ltr",
        "disabled": false,
        "id": "tab1",
        "name": "tab1",
        "onClose": [Function],
      }
      `);
			expect(propsBuilt[1]).toMatchInlineSnapshot(`
      {
        "closable": false,
        "content": {
          "children": "content 2",
          "className": "customClass",
          "dir": "ltr",
          "id": "panel2",
        },
        "disabled": true,
        "id": "tab2",
        "name": "tab2",
        "onClose": undefined,
      }
      `);

			expect(propsBuilt[2]).toMatchInlineSnapshot(
				{ closableId: expect.any(String) },
				`
       {
          "closable": true,
          "closableId": Any<String>,
          "content": {
            "children": "content 3",
            "id": "panel3",
          },
          "disabled": false,
          "id": "tab3",
          "name": "tab3",
          "onClose": undefined,
        }
        `,
			);
		});
	});

	describe("buildTabPropsNoPanel", () => {
		it("returns a value for 'id' if this property was not initially defined", () => {
			const tabs = (
				<Tabs>
					<TabList>
						<Tab>tab1</Tab>
					</TabList>
				</Tabs>
			);
			const actual = buildTabPropsNoPanel(tabs.props.children);
			expect(actual.length).toBe(1);
			expect(actual[0].id).toBeDefined();
		});
		it("parses correctly given proper tags", () => {
			const tabs = (
				<Tabs defaultTabId="tab1">
					<TabList>
						<Tab id="tab1" dir="ltr" onClose={() => null}>
							tab1
						</Tab>
						<Tab id="tab2" disabled>
							tab2
						</Tab>
						<ClosableTab id="tab3" closable>
							tab3
						</ClosableTab>
					</TabList>
				</Tabs>
			);
			const tabsBuilt = buildTabPropsNoPanel(tabs.props.children);

			expect(tabsBuilt[0]).toMatchInlineSnapshot(
				`
        {
          "closable": false,
          "dir": "ltr",
          "disabled": false,
          "id": "tab1",
          "name": "tab1",
          "onClose": [Function],
        }
      `,
			);
			expect(tabsBuilt[1]).toMatchInlineSnapshot(
				`
        {
          "closable": false,
          "disabled": true,
          "id": "tab2",
          "name": "tab2",
          "onClose": undefined,
        }
      `,
			);
			expect(tabsBuilt[2]).toMatchInlineSnapshot(
				{ closableId: expect.any(String) },
				`
        {
          "closable": true,
          "closableId": Any<String>,
          "disabled": false,
          "id": "tab3",
          "name": "tab3",
          "onClose": undefined,
        }
      `,
			);
		});
	});

	describe("debugTabs", () => {
		it("should call debug when log level is debug", () => {
			const logger = {
				getLevel: () => log.levels.DEBUG,
				debug: vi.fn(),
			};
			debugTabs(logger, [{ id: "tab1", disabled: true }]);
			expect(logger.debug).toBeCalledTimes(1);
		});
		it("should not call debug when log level is info", () => {
			const logger = {
				getLevel: () => log.levels.INFO,
				debug: vi.fn(),
			};
			debugTabs(logger, [{ id: "tab1", disabled: true }]);
			expect(logger.debug).toBeCalledTimes(0);
		});
	});
});
