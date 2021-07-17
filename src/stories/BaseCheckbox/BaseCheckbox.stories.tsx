import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseCheckbox } from ".";

export default {
  title: "Example/BaseCheckbox",
  component: BaseCheckbox,
} as ComponentMeta<typeof BaseCheckbox>;

type Args = ComponentStory<typeof BaseCheckbox>;

const Template: Args = (args) => {
  const [checked, setchecked] = React.useState(false);
  return (
    <BaseCheckbox
      {...args}
      checked={checked}
      setChecked={() => {
        setchecked(!checked);
      }}
      label="apply"
    />
  );
};

export const Default: Args = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
