import { Highlights } from './highlights';
import { Ref } from 'preact/hooks';
import { Task } from './task';
import { TaskOptions } from './types';
import { h } from 'preact'
import { useConfig } from './util/useConfig';
import { useEffect } from 'preact/hooks';

export const Grid = ({ forwardedRef }: {forwardedRef: Ref<any> }) => {
  const store = useConfig()
  const state = store.state
  const tasks = store.state.tasks

  useEffect(() => {
    console.log(state.height)
  }, [state.height])

  return (
    <div ref={forwardedRef} style={{
      flex: 1,
      overflowX: 'auto',
      position: 'relative'
    }}
    >
      <Highlights />
      {tasks.map((task: TaskOptions) => <Task task={task} key={task.id}/>)}
      <div style={{ height: 20 }}></div>

    </div>
  )
}
