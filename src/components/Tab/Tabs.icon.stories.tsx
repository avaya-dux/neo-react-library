import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { IconNames, IconNamesType } from "utils";

import { tabMouseEventHandlerLogger } from "./EventHandlers";
import { Tab, TabList, TabPanel, TabPanels } from "./TabComponents";
import { Tabs } from "./Tabs";

tabMouseEventHandlerLogger.disableAll();
export interface IconProps {
  icon1: IconNamesType;
  dir1: "ltr" | "rtl";
  icon2: IconNamesType;
  dir2: "ltr" | "rtl";
  icon3: IconNamesType;
  dir3: "ltr" | "rtl";
  icon4: IconNamesType;
  dir4: "ltr" | "rtl";
  icon5: IconNamesType;
  dir5: "ltr" | "rtl";
}
const Template: Story<IconProps> = ({
  icon1,
  dir1,
  icon2,
  dir2,
  icon3,
  dir3,
  icon4,
  dir4,
  icon5,
  dir5,
}: IconProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const onTabChange = (newactiveTabIndex: number) => {
    console.log(`tab changed to ${activeTabIndex}`);
    setActiveTabIndex(newactiveTabIndex);
  };
  return (
    <div>
      <Tabs defaultIndex={1} onTabChange={onTabChange}>
        <TabList>
          <Tab id="tab1" icon={icon1} dir={dir1}>
            Tab1
          </Tab>
          <Tab id="tab2" icon={icon2} dir={dir2}>
            Tab2
          </Tab>
          <Tab id="tab3" icon={icon3} dir={dir3}>
            Tab3
          </Tab>
          <Tab id="tab4" disabled icon={icon4} dir={dir4}>
            Tab4
          </Tab>
          <Tab id="tab5" icon={icon5} dir={dir5}>
            Tab5
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h2>content1</h2>
            <p>paragraph 1</p>
          </TabPanel>
          <TabPanel>
            content 2
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aut
              harum quae aliquid laboriosam reiciendis sit tenetur, minima
              itaque quos deserunt eos fuga voluptatibus, qui expedita maiores
              porro inventore odio.
            </p>
          </TabPanel>
          <TabPanel>content 3</TabPanel>
          <TabPanel>
            content 4
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic,
              necessitatibus.
            </p>
          </TabPanel>
          <TabPanel>
            content 5
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil hic
              quod consequatur eum commodi dolorum, molestiae odio cumque
              cupiditate! Impedit illo sint iusto recusandae rem optio
              reprehenderit ipsum ab aut.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <hr />
      <p>0 based active Tab index is {activeTabIndex}</p>
    </div>
  );
};

export const IconTabs = Template.bind({});

IconTabs.args = {
  icon1: "info",
  dir1: "ltr",
  icon2: "check",
  dir2: "rtl",
  icon3: "billboard",
  dir3: "rtl",
  icon4: "email",
  dir4: "ltr",
  icon5: "agents",
  dir5: "ltr",
};

const iconArgType = {
  control: { type: "select" },
  options: IconNames,
};
const dirArgType = {
  control: { type: "radio" },
  options: ["ltr", "rtl"],
};
export default {
  title: "Components/Tab",
  component: Template,
  argTypes: {
    icon1: iconArgType,
    dir1: dirArgType,
    icon2: iconArgType,
    dir2: dirArgType,
    icon3: iconArgType,
    dir3: dirArgType,
    icon4: iconArgType,
    dir4: dirArgType,
    icon5: iconArgType,
    dir5: dirArgType,
  },
} as Meta<IconProps>;
