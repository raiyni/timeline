import { PlanOptions } from './types'
import {h} from 'preact'
import { useConfig } from './util/useConfig';

export const Plan = ({ plan }: {plan: PlanOptions}) => {
  const store = useConfig()
  const state = store.state

  const start = state.x(plan.start)
  const end = state.x(plan.end)
  const progress = state.x(plan.progress)

  return (
    <g className="plan">
        <rect x={start} width={end - start} height={plan.height} style={plan.backgroundStyle}></rect>

        <rect x={start} width={progress - start} height={plan.height} style={plan.progressStyle}></rect>
    </g>
  )
}
