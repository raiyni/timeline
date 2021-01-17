import { Ref } from 'preact/hooks';
import { Task } from './task';
import { TaskOptions } from './types';
import { h } from 'preact'
import { useConfig } from './util/useConfig';

export const Grid = (props: any, ref: Ref<any>) => {
  const store = useConfig()
  const state = store.state
  const tasks = store.state.tasks

  return (
    <div ref={ref} style={{
      flex: 1,
      height: state.height - 35,
      overflowY: 'auto',
      overflowX: 'auto',
      position: 'relative'
    }}
    >
      {tasks.map((task: TaskOptions) => <Task task={task} />)}
    </div>
  )
}
