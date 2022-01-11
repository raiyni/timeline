import { MilestoneOptions, PlanOptions, TaskOptions } from './types';

import { Milestone } from './milestone';
import { Plan } from './plan';
import { h } from 'preact';
import { useConfig } from './util/useConfig';
import { setOverTask } from './actions';

export const Task = ({ task, idx }: { task: TaskOptions, idx: number}) => {
  const store = useConfig()
  const state = store.state

  return (
    <div className="timeline-task" data-task-idx={idx} style={{
      width: state.scrollWidth,
      borderTop: '2px solid black'
    }}
    onPointerOver={(e) => { store.dispatch(setOverTask(task.id, true))}}
    onPointerOut={(e) => { store.dispatch(setOverTask(task.id, false))}}
    >
      {task.plans.map((plans: PlanOptions[], row: number) => {
        const milestones = task.milestones[row]
          return (
            <div className="timeline-task-row" style={{
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
