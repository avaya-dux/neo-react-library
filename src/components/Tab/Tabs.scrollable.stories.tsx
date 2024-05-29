import type { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { tabMouseEventHandlerLogger } from "./EventHandlers";
import { Tab, TabList, TabPanel, TabPanels } from "./TabComponents";
import { Tabs } from "./Tabs";

tabMouseEventHandlerLogger.disableAll();

interface Scrollable {
	scrollable?: boolean;
}
const Template: Story<Scrollable> = ({ scrollable }: Scrollable) => {
	const [activeTabIndex, setActiveTabIndex] = useState(1);
	const onTabChange = (newIndex: number) => {
		console.log(`tab changed to ${activeTabIndex}`);
		setActiveTabIndex(newIndex);
	};
	return (
		<div style={{ height: "200px" }}>
			<Tabs
				defaultIndex={1}
				scrollable={scrollable}
				onTabChange={onTabChange}
				orientation="vertical"
			>
				<TabList>
					<Tab id="tab1" icon="settings">
						Tab1
					</Tab>
					<Tab id="tab2" icon="chat" dir="rtl">
						Tab2
					</Tab>
					<Tab id="tab3" icon="info">
						Tab3
					</Tab>
					<Tab id="tab4" disabled icon="agents">
						Tab4
					</Tab>
					<Tab id="tab5" icon="email" dir="rtl">
						Tab5
					</Tab>
					<Tab id="tab6">Tab6</Tab>
					<Tab id="tab7">Tab7</Tab>
					<Tab id="tab8">Tab8</Tab>
					<Tab id="tab9">Tab9</Tab>
					<Tab id="tab10">Tab10</Tab>
					<Tab id="tab11">Tab11</Tab>
					<Tab id="tab12">Tab12</Tab>
					<Tab id="tab13">Tab13</Tab>
					<Tab id="tab14">Tab14</Tab>
					<Tab id="tab15">Tab15***</Tab>
					<Tab id="tab16">Tab16*</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<h2>content1</h2>
						<p>paragraph 1</p>
					</TabPanel>
					<TabPanel>content 2</TabPanel>
					<TabPanel>content 3</TabPanel>
					<TabPanel>content 4</TabPanel>
					<TabPanel>content 5</TabPanel>
					<TabPanel>content 6</TabPanel>
					<TabPanel>content 7</TabPanel>
					<TabPanel>content 8</TabPanel>
					<TabPanel>content 9</TabPanel>
					<TabPanel>content 10</TabPanel>
					<TabPanel>content 11</TabPanel>
					<TabPanel>content 12</TabPanel>
					<TabPanel>content 13</TabPanel>
					<TabPanel>content 14</TabPanel>
					<TabPanel>
						content 15
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
							eveniet, eius aut consequatur accusantium quam sapiente, non
							eligendi aspernatur eaque odio quibusdam beatae! Fuga obcaecati
							dolores dignissimos excepturi facilis incidunt. Temporibus aperiam
							fugiat dolore modi recusandae dolor aliquam beatae expedita? Aut
							consequuntur, veritatis nostrum architecto minus placeat ipsum
							soluta ex officiis sint reiciendis quae, ducimus adipisci tenetur
							a vero cumque error quas ullam magni, et tempora sequi eveniet?
							Doloribus tempore, non eligendi deserunt deleniti modi mollitia
							aliquam veniam hic, laudantium rem eum. Quasi ipsum, accusamus
							explicabo ad molestias unde fugiat totam modi dicta vel veritatis,
							assumenda cupiditate consequuntur repudiandae, natus recusandae
							exercitationem tenetur inventore rerum adipisci vero? Molestias
							culpa perspiciatis, in suscipit omnis quod totam ipsum a impedit
							reiciendis voluptatem minus animi soluta, nihil sunt. Non ea
							repellendus aperiam, suscipit esse rerum maiores deserunt voluptas
							veritatis architecto ipsa tempora minima odio quae quis quibusdam
							iste. Neque excepturi fuga delectus ea ad? Magni ex quos eum
							consequuntur aut dolorem sed cupiditate, voluptate aperiam soluta
							non a perspiciatis maiores debitis asperiores inventore ullam
							doloremque? Nostrum fugit autem quod dolorum, eligendi voluptas
							amet necessitatibus cumque odio nisi soluta magni beatae libero
							natus nobis quo iure dicta nam alias velit rerum! Repudiandae
							vitae ipsa neque. Minus cumque blanditiis labore ipsa dicta
							quisquam deleniti corrupti non! Maxime numquam est nisi quis
							soluta similique voluptatum tempora hic vitae, quam consequuntur.
							A quaerat, porro ab officia totam quod quis deleniti unde veniam
							fugit iusto. Soluta voluptate quae delectus voluptates. Excepturi
							distinctio ad architecto harum autem molestiae illum qui cum
							quidem eum fuga magni totam repellendus molestias deserunt
							dignissimos maiores deleniti sequi assumenda, vel rem
							exercitationem a illo labore. Commodi, ipsa, eos ipsum deserunt
							aliquam blanditiis delectus recusandae placeat neque accusamus,
							sequi doloremque nihil incidunt aperiam accusantium nemo. Dolor
							aliquid aspernatur tenetur similique accusantium ut corrupti
							architecto sapiente! Quidem possimus alias et commodi nostrum
							fugiat porro eius illo fugit voluptates officia, nesciunt quod sed
							odio, excepturi facere neque amet doloremque quaerat odit, ea
							eaque dignissimos. Hic deserunt perferendis autem asperiores
							consequatur, consequuntur perspiciatis sunt itaque quia eaque,
							aspernatur placeat pariatur vero minima impedit neque ducimus.
							Temporibus, sint repellat. Quis, hic magnam! Natus voluptatum et,
							temporibus officia in animi doloribus? Debitis illo maiores esse
							vero dolorem animi temporibus consequatur quis provident
							architecto harum ut, dignissimos libero tempora voluptatem rerum
							nihil? Dolor, a ipsum perspiciatis architecto maxime, fugiat omnis
							odit est, quibusdam beatae excepturi illum blanditiis in repellat
							hic non sint voluptates corrupti eveniet aperiam deserunt
							reprehenderit sunt. Ad cum illo et corporis eum tempora error quo
							unde itaque cupiditate. Qui veniam voluptate facilis est itaque
							accusantium voluptatibus, vel nobis dolor, iusto autem aut in a
							laborum aspernatur molestiae, fuga maxime repudiandae quidem!
							Laboriosam, reiciendis. Facilis officiis quis velit, consectetur
							nemo dignissimos. Possimus praesentium ab cumque harum, repellat,
							at minus obcaecati, necessitatibus quod quaerat mollitia aliquid
							id illum saepe nihil aperiam rerum. Autem laudantium modi error
							itaque sit possimus, ipsa eligendi! Omnis, error porro. Iure
							dolor, possimus nisi velit harum fugiat cupiditate omnis, minus
							quasi quae odio impedit porro ad!
						</p>
					</TabPanel>
					<TabPanel>
						content 16
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Perferendis vero minima nihil impedit deleniti consequuntur
							assumenda repudiandae voluptas eveniet. Sunt expedita sint ratione
							rem a mollitia molestiae aliquid cupiditate harum!
						</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
			<hr />
			<p>0 based active Tab index is {activeTabIndex}</p>
		</div>
	);
};
export const ScrollableVerticalTabs = Template.bind({});
ScrollableVerticalTabs.args = {
	scrollable: true,
};

export default {
	title: "Components/Tab",
	component: Template,
} as Meta<Scrollable>;
