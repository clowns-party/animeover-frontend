import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseTextarea } from ".";

export default {
  title: "Example/BaseTextarea",
  component: BaseTextarea,
} as ComponentMeta<typeof BaseTextarea>;

const Template: ComponentStory<typeof BaseTextarea> = (args) => (
  <BaseTextarea {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {
  hasError: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
