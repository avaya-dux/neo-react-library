import { Meta } from "@storybook/react/types-6-0";
import log from "loglevel";

import { LeftNav } from "../LeftNav";

const logger = log.getLogger("ListItem");
logger.disableAll();

export default {
  title: "Components/Left Navigation/Link Item",
  component: LeftNav.LinkItem,
} as Meta;

const handleClick = (id: string, url: string) => {
  alert(`clicked on the item with id: ${id}, url: ${url}`);
};
const handleHover = () => {
  logger.debug("hovered on the item");
};
const handleFocus = () => {
  logger.debug("foucused on the item");
};

export const LinkItems = () => (
  <LeftNav aria-label="Main Navigation" currentUrl="" onNavigate={handleClick}>
    <LeftNav.NavCategory label="Main Category">
      <LeftNav.LinkItem
        onMouseOver={handleHover}
        onFocus={handleFocus}
        href="http://bing.com"
      >
        Normal Link
      </LeftNav.LinkItem>

      <LeftNav.LinkItem
        href="http://avaya.com"
        onMouseOver={handleHover}
        onFocus={handleFocus}
      >
        Active Link
      </LeftNav.LinkItem>

      <LeftNav.LinkItem
        href="http://avaya.com"
        onMouseOver={handleHover}
        onFocus={handleFocus}
        disabled={true}
      >
        Disabled Link
      </LeftNav.LinkItem>
    </LeftNav.NavCategory>
  </LeftNav>
);
