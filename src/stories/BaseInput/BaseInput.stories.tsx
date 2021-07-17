import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseInput } from ".";

export default {
  title: "Example/BaseInput",
  component: BaseInput,
} as ComponentMeta<typeof BaseInput>;

const Template: ComponentStory<typeof BaseInput> = (args) => (
  <div style={{ width: "fit-content" }}>
    <BaseInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {
  hasError: true,
};

export const Search = Template.bind({});
Search.args = {
  typeComponent: "search",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
