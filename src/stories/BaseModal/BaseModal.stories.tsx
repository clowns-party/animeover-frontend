import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import BaseModal from ".";
import { BaseButton } from "../BaseButton";

export default {
  title: "Example/BaseModal",
  component: BaseModal,
} as ComponentMeta<typeof BaseModal>;

const OverlayContent = styled.div`
  width: 460px;
  border-radius: 24px;
  background: #ffffff;
  padding: 40px 30px;
  @media (max-width: 576px) {
    width: 320px;
  }
  @media (max-height: 768px) {
    max-height: 90vh;
    max-width: 90vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Template: ComponentStory<typeof BaseModal> = (args) => {
  const [open, setopen] = React.useState(false);
  const show = () => {
    setopen(true);
  };
  const cancel = () => {
    setopen(false);
  };

  return (
    <>
      <BaseButton onClick={show}>Show modal </BaseButton>
      <BaseModal {...args} visible={open} show={show} cancel={cancel}>
        <OverlayContent>
          <h3>modal content</h3>
          <p>For close - click on button or outside modal content</p>
          <BaseButton onClick={cancel}>Close modal </BaseButton>
        </OverlayContent>
      </BaseModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  visible: true,
};
