import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";




export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    //Декоратор — это способ обернуть историю дополнительными функциями «рендеринга».
    // Многие надстройки определяют декораторы, чтобы дополнить ваши истории
    // дополнительным рендерингом или собрать информацию о том, как ваша история
    // отображается. Все истории далее будут обернуты в этот декоратор.
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const TemplateBasic: ComponentStory<typeof AppWithRedux> = () => {
    return (
        //благодаря декоратору обернется в провайдер - равносильно
        // <Provider store={store}>
        //   <AppWithRedux/>
        // </Provider>
        <AppWithRedux/>

    )
}

export const BaseExample = TemplateBasic.bind({});
BaseExample.args = {}
