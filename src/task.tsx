import { MilestoneOptions, PlanOptions, TaskOptions } from './types';

import { Milestone } from './milestone';
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
      {task.plans.map((plans: PlanOptions[], row: number) => {
        const milestones = task.milestones[row]
          return (
            <div className="task-row" style={{
              height: task.heights[row],
              width: state.scrollWidth,
              backgroundColor: '#fff',
              display: task.collapsed && row > 0 ? 'none' : 'block'
            }}
            >
              <svg height={task.heights[row]} width={state.scrollWidth}>
               {plans.map((plan: PlanOptions) => <Plan plan={plan} />)}
               {milestones.map((milestone: MilestoneOptions) => <Milestone options={milestone} height={task.heights[row]} />)}
              </svg>
            </div>
          )
      })}
    </div>
  )
}
