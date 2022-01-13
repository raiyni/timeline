import { h } from 'preact'
import { useRef } from 'preact/hooks'
import { useEventBus } from './eventbus'
import { Milestone } from './milestone'
import { Plan } from './plan'
import { MilestoneOptions, PlanOptions, TaskOptions } from './types'
import { useConfig } from './util/useConfig'

export const Task = ({ task, idx }: { task: TaskOptions; idx: number }) => {
  const store = useConfig()
  const eventBus = useEventBus()

  const state = store.state

  const eventTarget = useRef(null)

  Object.entries(state.events).forEach(([key, callback]) => {
    eventBus.useDomEvent(key, (e) => callback(e, task, eventBus.publish), eventTarget.current)
  })

  return (
    <div
      className="timeline-task"
      data-task-idx={idx}
      style={{
        width: state.scrollWidth,
        borderTop: '2px solid black'
      }}
      ref={eventTarget}
    >
      {task.plans.map((plans: PlanOptions[], row: number) => {
        const milestones = task.milestones[row]
        return (
          <div
            className="timeline-task-row"
            style={{
              height: task.heights[row],
              width: state.scrollWidth,
              backgroundColor: '#fff',
              display: task.collapsed && row > 0 ? 'none' : 'block'
            }}
          >
            <svg height={task.heights[row]} width={state.scrollWidth}>
              {plans.map((plan: PlanOptions) => (
                <Plan plan={plan} />
              ))}
              {milestones.map((milestone: MilestoneOptions) => (
                <Milestone options={milestone} height={task.heights[row]} />
              ))}
            </svg>
          </div>
        )
      })}
    </div>
  )
}
