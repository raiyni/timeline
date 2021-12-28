import { PlanOptions } from './types'
import {h} from 'preact'
import { useConfig } from './util/useConfig';
import deepmerge from 'deepmerge';


export const Plan = ({ plan }: {plan: PlanOptions}) => {
  const store = useConfig()
  const state = store.state

  const start = state.x(plan.start)
  const end = state.x(plan.end)
  const progress = state.x(plan.progress)

  const progressStyle = deepmerge(plan.progressStyle, {})

  return (
    <g className="timeline-plan" onPointerDown={(e) => {
      if (state.events.pointerdown) {
        state.events.pointerdown(e, null, plan)
      }
    }}>
        <rect x={start} width={end - start} height={plan.height} style={plan.backgroundStyle}></rect>

        <rect x={start} width={progress - start} height={plan.height} style={progressStyle}></rect>
    </g>
  )
}
