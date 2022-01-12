import { h } from 'preact';
import { Ref } from 'preact/hooks';
import { Highlights } from './highlights';
import { Task } from './task';
import { TaskOptions } from './types';
import { useConfig } from './util/useConfig';

export const Grid = ({ forwardedRef }: {forwardedRef: Ref<any> }) => {
  const store = useConfig()
  const tasks = store.state.tasks

  return (
    <div ref={forwardedRef} style={{
      flex: 1,
      overflowX: 'auto',
      position: 'relative'
    }}
    >
      <Highlights />
      {tasks.map((task: TaskOptions, idx: number) => <Task task={task} key={task.id} idx={idx} />)}
      <div style={{ height: 20 }}></div>

    </div>
  )
}
