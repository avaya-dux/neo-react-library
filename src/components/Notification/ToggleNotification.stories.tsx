import type { Meta } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";

import { NonEventNotificationProps, Notification } from ".";

export default {
  title: "Components/Notification",
} as Meta<NonEventNotificationProps>;

export const AlertShow = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? "Hide" : "Show"}
      </Button>

      {isOpen && (
        <Notification
          type="alert"
          header="Alert"
          description="This is an alert."
          actions={{ counter: { count: "00:00" } }}
        />
      )}
    </div>
  );
};

export const AlertShowContainer = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? "Hide" : "Show"}
      </Button>
      <div>
        <h3>Alert should popup below</h3>
      </div>

      {isOpen && (
        <Notification
          type="alert"
          header="Alert"
          description="This is an alert."
          actions={{
            closable: {
              onClick: () => alert("closed"),
              "aria-label": "Click this button will close this notification",
            },
          }}
        />
      )}
      <div>
        <h3>Alert should popup above</h3>
      </div>
    </div>
  );
};
