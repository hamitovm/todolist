import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AddItemForm} from "./AddItemForm";
import {Button} from "./stories/Button";
import React from "react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    }
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

const callback = action('Button "add" was pressed')

// export const AddItemFormBaseExample = (props: any) => {
//     return <AddItemForm itemAdder={(title) => {}}/>
// }


export const BaseExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BaseExample.args = {
    itemAdder: callback
}
