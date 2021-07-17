import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { BaseDropdown } from ".";

export default {
  title: "Example/BaseDropdown",
  component: BaseDropdown,
} as ComponentMeta<typeof BaseDropdown>;

const tags = ["ongoing", "drama", "horror", "test"];
const Template: ComponentStory<typeof BaseDropdown> = (args) => {
  const [active, setactive] = React.useState(tags[0]);
  return (
    <BaseDropdown
      {...args}
      active={active}
      select={(tag) => {
        setactive(tag);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  list: tags,
  active: tags[0],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
