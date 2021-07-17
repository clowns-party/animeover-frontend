import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseButton } from ".";

export default {
  title: "Example/BaseButton",
  component: BaseButton,
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => (
  <BaseButton {...args}> click </BaseButton>
);

export const Important = Template.bind({});
Important.args = {
  typeComponent: "important",
};

export const Secondary = Template.bind({});
Secondary.args = {
  typeComponent: "secondary",
};

export const Download = Template.bind({});
Download.args = {
  typeComponent: "download",
};

export const Danger = Template.bind({});
Danger.args = {
  typeComponent: "danger",
};
