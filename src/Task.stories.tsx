import {ComponentMeta, ComponentStory} from "@storybook/react";
import React, {useState} from "react";
import {action} from "@storybook/addon-actions";
import {TaskComponent} from "./Task";
import {TaskStatuses} from "./api/todolists-api";


export default {
    title: 'Task Component',
    component: TaskComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof TaskComponent>;

const Template: ComponentStory<typeof TaskComponent> = (args) => {
    let [statusValue, setStatusValue] = useState<TaskStatuses>(TaskStatuses.New)
    let [taskTitle, setTaskTitle] = useState<string>('task title')
    return <TaskComponent {...args}     title={taskTitle}
    status={statusValue}
    onChangeTaskCheckboxHandler={(taskId, isDone) =>setStatusValue(statusValue === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New)}
        onTaskTitleChangeHandler={(taskId: string, newTitle: string) => setTaskTitle(newTitle)}/>;
}

const deleteCallback = action('Delete was pressed')

// export const AddItemFormBaseExample = (props: any) => {
//     return <AddItemForm itemAdder={(title) => {}}/>
// }

const callback = action('Button "add" was pressed')
const taskIsDoneCallback = action('Task "isDone" changed')
const changeTaskTitlecallback = action('Task title changed')


export const TaskInteractive = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskInteractive.args = {
    taskId: '123',
    deleteTask: deleteCallback,
}

const TemplateBasic: ComponentStory<typeof TaskComponent> = (args) => <TaskComponent {...args}/>

export const TaskIsDone = TemplateBasic.bind({});
TaskIsDone.args = {
    taskId: '111',
    title: 'CSS',
    status: TaskStatuses.Completed,
    deleteTask: deleteCallback,
    onChangeTaskCheckboxHandler: taskIsDoneCallback,
    onTaskTitleChangeHandler: changeTaskTitlecallback
}

export const TaskIsNotDone = TemplateBasic.bind({});
TaskIsNotDone.args = {
    taskId: '111',
    title: 'Vue',
    status: TaskStatuses.New,
    deleteTask: deleteCallback,
    onChangeTaskCheckboxHandler: taskIsDoneCallback,
    onTaskTitleChangeHandler: changeTaskTitlecallback
}

