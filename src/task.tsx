import { PlanOptions, TaskOptions } from './types';

import { Plan } from './plan';
import { h } from 'preact';
import { useConfig } from './util/useConfig';

export const Task = ({ task }: { task: TaskOptions}) => {
  const store = useConfig()
  const state = store.state

  return (
    <div className="task-group" style={{
      width: state.scrollWidth,
      borderTop: '2px solid black'
    }}
    >
      {task.plans.map((plans: PlanOptions[], idx: number) => {
          return (
            <div className="task-row" style={{
              height: task.heights[idx],
              width: state.scrollWidth,
              backgroundColor: '#fff'
            }}
            >
              <svg height={30} width={state.scrollWidth}>
               {plans.map((plan: PlanOptions) => <Plan plan={plan} />)}
              </svg>
            </div>
          )
      })}
    </div>
  )
}
