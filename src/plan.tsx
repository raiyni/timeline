import { PlanOptions } from './types'
import {h} from 'preact'
import {  useConfig, useEvents } from './util/useConfig';
import deepmerge from 'deepmerge';


export const Plan = ({ plan }: {plan: PlanOptions}) => {
  const events = useEvents()
  const config = useConfig()

  const state = config.state

  const start = state.x(plan.start)
  const end = state.x(plan.end)
  const progress = state.x(plan.progress)

  const progressStyle = deepmerge(plan.progressStyle, {})

  return (
    <g className="timeline-plan" onPointerDown={(e) => {
      console.log(events.state)
      if (events.state.pointerdown) {
        events.state.pointerdown(e, null, plan)
      }
    }}>
        <rect x={start} width={end - start} height={plan.height} style={plan.backgroundStyle}></rect>

        <rect x={start} width={progress - start} height={plan.height} style={progressStyle}></rect>
    </g>
  )
}
