import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";




export default {
    title: 'App Component',
    component: App,
    //Декоратор — это способ обернуть историю дополнительными функциями «рендеринга».
    // Многие надстройки определяют декораторы, чтобы дополнить ваши истории
    // дополнительным рендерингом или собрать информацию о том, как ваша история
    // отображается. Все истории далее будут обернуты в этот декоратор.
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const TemplateBasic: ComponentStory<typeof App> = () => {
    return (
        //благодаря декоратору обернется в провайдер - равносильно
        // <Provider store={store}>
        //   <App/>
        // </Provider>
        <App demo={true}/>

    )
}

export const BaseExample = TemplateBasic.bind({});
BaseExample.args = {}
