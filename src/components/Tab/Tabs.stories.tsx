import { Meta } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Button } from "components";

import { tabMouseEventHandlerLogger } from "./EventHandlers";
import {
  ClosableTab,
  Tab,
  TabLink,
  TabList,
  TabPanel,
  TabPanels,
} from "./TabComponents";
import { Tabs } from "./Tabs";
import { TabsProps } from "./TabTypes";

tabMouseEventHandlerLogger.disableAll();

export default {
  title: "Components/Tab",
  component: Tab,
} as Meta<TabsProps>;

export const ControlledActiveTabStory = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const onTabChange = (activeTabIndex: number) => {
    console.log(`tab changed to ${activeTabIndex}`);
    setActiveTabIndex(activeTabIndex);
  };

  const [disabledFlags, setDisabledFlags] = useState({
    0: false,
    1: false,
    2: false,
  });

  function disableActiveTab() {
    console.log("disable active tab");

    setDisabledFlags({ ...disabledFlags, [activeTabIndex]: true });
  }
  function enableActiveTab() {
    console.log("enable active tabs");
    setDisabledFlags({ ...disabledFlags, [activeTabIndex]: false });
  }

  function disableAllTabs() {
    console.log("disable all tabs");
    setDisabledFlags({
      0: true,
      1: true,
      2: true,
    });
  }

  function enableAllTabs() {
    console.log("enable all tabs");

    setDisabledFlags({
      0: false,
      1: false,
      2: false,
    });
  }
  return (
    <div>
      <div>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => disableActiveTab()}
        >{`Disable ${activeTabIndex}`}</Button>
        <Button style={{ marginRight: 10 }} onClick={() => enableActiveTab()}>
          {`Enable ${activeTabIndex}`}
        </Button>
        <Button style={{ marginRight: 10 }} onClick={() => disableAllTabs()}>
          Disable All Tabs
        </Button>
        <Button style={{ marginRight: 10 }} onClick={() => enableAllTabs()}>
          Enable All Tabs
        </Button>
      </div>

      <Tabs index={activeTabIndex} onTabChange={onTabChange}>
        <TabList>
          <Tab id="tab1" disabled={disabledFlags[0]}>
            Tab1
          </Tab>
          <Tab id="tab2" disabled={disabledFlags[1]}>
            Tab2
          </Tab>
          <Tab id="tab3" disabled={disabledFlags[2]}>
            Tab3
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h2>content1</h2>
            <p>paragraph 1</p>
          </TabPanel>
          <TabPanel>content 2</TabPanel>
          <TabPanel>content 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
ControlledActiveTabStory.storyName = "Disable|Enable Tabs";

export const UncontrolledActiveTabStory = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onTabChange = (activeTabIndex: number) => {
    console.log(`tab changed to ${activeTabIndex}`);
    setActiveTabIndex(activeTabIndex);
  };
  const [showTab2, setShowTab2] = useState(true);
  const onCloseTab2 = (index: number) => {
    console.log(`closing tab at index ${index}`);
    setShowTab2(false);
  };

  return (
    <div>
      <Tabs defaultIndex={1} onTabChange={onTabChange}>
        <TabList>
          <Tab id="tab1">Tab1</Tab>

          {showTab2 ? (
            <ClosableTab id="tab2" icon="accept" onClose={onCloseTab2}>
              Tab2
            </ClosableTab>
          ) : (
            <></>
          )}

          <Tab id="tab3">Tab3</Tab>

          <Tab id="tab4" disabled>
            Tab4
          </Tab>

          <ClosableTab id="tab5" disabled>
            Tab5
          </ClosableTab>

          <TabLink href="https://kagi.com/faq">Kagi Search Engine</TabLink>
        </TabList>

        <TabPanels>
          <TabPanel>
            <h2>content1</h2>

            <p>paragraph 1</p>
          </TabPanel>

          {showTab2 ? <TabPanel>content 2</TabPanel> : <></>}
          <TabPanel>content 33333</TabPanel>

          <TabPanel>content 4</TabPanel>

          <TabPanel>content 5</TabPanel>
        </TabPanels>
      </Tabs>

      <hr />

      <p>0 based active Tab Index is {activeTabIndex}</p>
    </div>
  );
};
UncontrolledActiveTabStory.storyName = "Basic Tabs";
