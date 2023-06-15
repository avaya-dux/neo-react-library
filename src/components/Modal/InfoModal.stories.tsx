import { Meta, Story } from "@storybook/react";

import { Button } from "components/Button";
import { Icon } from "components/Icon";

import { InfoModal, InfoModalProps } from "./";
import useModal from "./useModal";

export default {
  title: "Components/Modal/Info Modal",
  component: InfoModal,
} as Meta<InfoModalProps>;

export const PortalInfoModalExample = () => {
  const { isOpen, toggle } = useModal(true);
  return (
    <div>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          toggle();
        }}
      >
        Show
      </Button>

      <InfoModal open={isOpen} onClose={toggle} title="This is the title">
        <p>
          This is just some plain text inside a paragraph tag, let&apos;s try
          longer text to see how it <strong>wraps</strong> and aligns
        </p>
      </InfoModal>
    </div>
  );
};

export const InfoModalWithDefaultProps: Story<InfoModalProps> = (
  props: InfoModalProps
) => {
  return (
    <div>
      <p>
        Use Storybook&apos;s &quot;Show Add ons&quot; and set &apos;open&apos;
        prop to true
      </p>
      <InfoModal {...props}>
        This is a plain InfoModal with just default props
      </InfoModal>
    </div>
  );
};

const titleWithIcon = (
  <div>
    <Icon
      role="img"
      aria-label="star icon"
      data-testid="neo-icon-star"
      id="icon-star"
      icon="star"
    />
    <span>This is the title with an icon to the left</span>
  </div>
);

export const InfoModalWithCompositeTitle = () => {
  const { isOpen, toggle } = useModal(true);
  return (
    <div>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          toggle();
        }}
      >
        Show
      </Button>

      <InfoModal open={isOpen} onClose={toggle} title={titleWithIcon}>
        <p>
          The title in this modal should have an icon on the left. This content
          is just plain text.
        </p>
      </InfoModal>
    </div>
  );
};

export const InfoModalWithCompositeContent = () => {
  const { isOpen, toggle } = useModal(true);
  return (
    <div>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          toggle();
        }}
      >
        Show
      </Button>

      <InfoModal open={isOpen} onClose={toggle} title="This is the title">
        <div className="vertical">
          <p className="neo-icon-star-filled star-color">Brent Davidson</p>
          <p className="neo-body-small neo-icon-call-outbound">
            2020-10-15 10:33 AM
          </p>
          <p className="neo-body-small">01:59:24</p>
        </div>
      </InfoModal>
    </div>
  );
};
