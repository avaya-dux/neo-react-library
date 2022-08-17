import { Meta, Story } from "@storybook/react/types-6-0";
import {
  ToastOptions,
  usePopup,
  removePopupManagerContainer,
} from "components/PopupManager";
import { IconNames } from "utils";
import { Toast, toastLogger as logger, ToastProps } from "./Toast";
import { Button } from "components/Button";
import { useEffect } from "react";

const ToastTemplate: Story<ToastProps> = (props) => {
  useEffect(() => {
    return () => {
      logger.debug("remove container");
      removePopupManagerContainer();
    };
  }, [removePopupManagerContainer]);
  return <Toast {...props} />;
};

export default {
  title: "Components/Toast",
  component: ToastTemplate,
  argTypes: {
    icon: {
      options: IconNames,
      control: { type: "select" },
    },
  },
} as Meta<ToastOptions>;

export const Default = ToastTemplate.bind({});
Default.args = {
  children: "Default toast, positoned top and center, for 5 seconds",
  "aria-label": "Passed in aria label: toast lasts 5 seconds",
};
export const IconBottomCenter = ToastTemplate.bind({});
IconBottomCenter.args = {
  children: "Toast, positoned bottom and center, for 5 seconds",
  icon: "align-bottom",
  position: "bottom",
};

export const TwoToasts = () => {
  useEffect(() => {
    return () => {
      removePopupManagerContainer();
    };
  }, [removePopupManagerContainer]);
  return (
    <div>
      <Toast>Toast 1</Toast>
      <Toast>Toast 2</Toast>
    </div>
  );
};
export const InteractiveToasts = () => {
  const { mounted, toast } = usePopup("interactive-toast");
  useEffect(() => {
    return () => {
      removePopupManagerContainer();
    };
  }, [removePopupManagerContainer]);
  const duration = 5000;
  return !mounted ? (
    <div>not ready</div>
  ) : (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 100px)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 33%)" }}>
        <Button
          onClick={() => {
            toast({
              message: "Top-left Toast",
              duration,
              position: "top-left",
            });
          }}
        >
          Open a Top Left Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Top Toast",
              duration,
              position: "top",
              icon: "align-top",
            })
          }
        >
          Open a Top Center Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Top-right Toast",
              duration,
              position: "top-right",
            })
          }
        >
          Open a Top Right Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Bottom-left Toast",
              duration,
              position: "bottom-left",
            })
          }
        >
          Open a Bottom Left Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Bottom Toast",
              duration,
              position: "bottom",
              icon: "align-bottom",
            })
          }
        >
          Open a Bottom Center Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Bottom-right Toast",
              duration,
              position: "bottom-right",
            })
          }
        >
          Open a Bottom Right Toast
        </Button>
      </div>
    </div>
  );
};
