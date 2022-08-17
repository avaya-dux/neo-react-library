import { Meta, Story } from "@storybook/react/types-6-0";

import { NoContent, NoContentProps } from "./";

export default {
  title: "Components/No Content",
  component: NoContent,
} as Meta<NoContentProps>;

export const Default = () => <NoContent />;

export const TakesUpDiv = () => (
  <main>
    <section
      style={{
        border: "2px solid black",
        height: 300,
        position: "relative",
        width: 500,
      }}
    >
      <NoContent text="this is centered inside it's container" />
    </section>

    <section>
      <pre>
        {`
        <section
          style={{
            border: "2px solid black",
            height: 300,
            position: "relative",
            width: 500,
          }}
        >
          <NoContent />
        </section>
        `}
      </pre>
    </section>
  </main>
);

const Template: Story<NoContentProps> = ({ icon, text }: NoContentProps) => (
  <NoContent icon={icon} text={text} />
);

export const Templated = Template.bind({});
Templated.args = {};
