import { Meta, Story } from "@storybook/react/types-6-0";
import { useEffect, useState } from "react";

import { Form } from "components/Form";
import { Icon } from "components/Icon";
import { IconButton } from "components/IconButton";
import { Select, SelectOption } from "components/Select";
import { Switch } from "components/Switch";
import { TextInput } from "components/TextInput";

import { Action } from "./Action";
import { Content } from "./Content";
import { Header } from "./Header";
import { text } from "./LoremText";
import { Widget } from "./Widget";
import { WidgetProps } from "./WidgetTypes";

export default {
  title: "Components/Widget",
  component: Widget,
} as Meta<WidgetProps>;

export const BasicWidget = () => {
  return (
    <Widget>
      <Header>
        <Icon icon="chat" aria-label="chat" />
        <p>Header of widget window</p>
      </Header>
      <Content>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </Content>
    </Widget>
  );
};

export const UsageExample = () => {
  return (
    <div
      style={{
        display: "grid",
        gridColumn: 1,
        gridRowGap: 5,
      }}
    >
      <Widget>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <Action>
          <IconButton
            icon="settings"
            variant="tertiary"
            aria-label="Settings"
          ></IconButton>
        </Action>
      </Widget>
      <Widget>
        <Header>
          <p>Header of widget window</p>
        </Header>
        <Action>
          <Form inline style={{ alignItems: "flex-end", gap: 10 }}>
            <div style={{ width: 200, height: "100%" }}>
              <Select multiple aria-label="Options">
                <SelectOption>Option 1</SelectOption>
                <SelectOption disabled>Option 2</SelectOption>
                <SelectOption>Option 3</SelectOption>
                <SelectOption>Option 4</SelectOption>
              </Select>
            </div>
            <div style={{ width: 280, height: "100%" }}>
              <TextInput
                id="input-icon-left"
                aria-label="Search"
                startAddon={<Icon icon="search" aria-label="input icon" />}
                placeholder="Search"
              />
            </div>
          </Form>
        </Action>
      </Widget>
      <Widget>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <Action>
          <Form inline>
            <Switch defaultChecked aria-label="test" />
          </Form>
        </Action>
      </Widget>
    </div>
  );
};

export const EmptyWidget = () => {
  return (
    <Widget empty>
      <Header>
        <Icon icon="settings" aria-label="settings" />
        <p>Header of widget window</p>
      </Header>
    </Widget>
  );
};
export const DisabledWidget = () => {
  return (
    <Widget disabled>
      <Header>
        <Icon icon="settings" aria-label="settings" />
        <p>Header of widget window</p>
      </Header>
      <Action />
      <Content>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </Content>
    </Widget>
  );
};

const InteractiveWidgetTemplate: Story<WidgetProps> = ({
  loading,
  empty,
  disabled,
}) => {
  return (
    <div>
      <p>
        In this example, you can controll Widget by setting loading, empty, and
        disabled properties
      </p>
      <Widget loading={loading} empty={empty} disabled={disabled}>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <Action>
          <IconButton
            icon="more"
            variant="tertiary"
            aria-label="more"
          ></IconButton>
        </Action>
        <Content>
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </Content>
      </Widget>
    </div>
  );
};

export const InteractiveWidget = InteractiveWidgetTemplate.bind({});
InteractiveWidget.args = {
  empty: false,
  loading: false,
  disabled: false,
};
export const LoadingEmptyWidget = () => {
  const [loading, setloading] = useState(true);
  const [empty, setempty] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
      setempty(true);
    }, 5000);
  }, []);

  return (
    <div>
      <p>
        In this example, the Widget will display empty content after 5 seconds.
      </p>

      <Widget loading={loading} empty={empty}>
        <Header>
          <Icon icon="chat" aria-label="chat" />
          <p>Header of widget window</p>
        </Header>
        <Action></Action>
        <Content>
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </Content>
      </Widget>
    </div>
  );
};

export const ScrollableWidget = () => {
  return (
    <Widget>
      <Header>
        <Icon icon="chat" aria-label="chat" />
        <p>Header of widget window</p>
      </Header>
      <Action></Action>
      <Content asText={false}>
        <div style={{ width: 2000, marginBottom: 40 }}>
          <h3>Item 1</h3>
          <p>{text}</p>
        </div>
        <div style={{ width: 2000, marginBottom: 40 }}>
          <h3>Item 2</h3>
          <p>{text}</p>
        </div>
        <div>
          <h3>Item 3</h3>
          <p>{text}</p>
        </div>
      </Content>
    </Widget>
  );
};
