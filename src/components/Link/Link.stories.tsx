import { Meta } from "@storybook/react/types-7-0";

import { Link, LinkProps } from "./";

import "./Stories_shim.css";

export default {
  title: "Components/Link",
  component: Link,
} as Meta<LinkProps>;

export const Default = () => {
  return <Link href="#main">Default</Link>;
};
export const Misc = () => {
  return (
    <ul>
      <li>
        <Link href="#main">Standalone</Link>
      </li>
      <li>
        <Link href="#main" icon="print">
          Standalone + Left Icon
        </Link>
      </li>
      <li>
        <Link href="#main" icon="print" placement="right">
          Standalone + Right Icon
        </Link>
      </li>
      <li>
        <Link href="#inline" inline>
          Inline
        </Link>
      </li>
      <li>
        <Link href="#main" disabled>
          Standalone + disabled
        </Link>
      </li>
      <li>
        <Link href="#main" icon="print" placement="left" disabled>
          Standalone + Left Icon + disabled
        </Link>
      </li>
      <li>
        <Link href="#main" icon="print" placement="right" disabled>
          Standalone + right Icon + disabled
        </Link>
      </li>
      <li>
        <Link href="#inline" inline disabled>
          Inline
        </Link>
      </li>
      {/* uncomment to see compiler error
      <li>
        <Link href="#inline" inline icon="print">
          Inline X Icon
        </Link>
      </li> 
      */}
    </ul>
  );
};
