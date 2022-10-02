import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    argTypes: {}
} as ComponentMeta<typeof EditableSpan>;

const changeTitle = action('Title value was changed')


const TemplateBasic: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const BaseExample = TemplateBasic.bind({});
BaseExample.args = {
    title: 'Span title',
    onChange: changeTitle
}


