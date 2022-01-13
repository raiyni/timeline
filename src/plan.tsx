import deepmerge from 'deepmerge'
import { h } from 'preact'
import { PlanOptions } from './types'
import { useConfig } from './util/useConfig'

export const Plan = ({ plan }: { plan: PlanOptions }) => {
  const config = useConfig()

  const state = config.state

  const start = state.x(plan.start)
  const end = state.x(plan.end)
  const progress = state.x(plan.progress)

  const progressStyle = deepmerge(plan.progressStyle, {})

  return (
    <g
      className="timeline-plan"
    >
      <rect y={plan.y} x={start} width={end - start} height={plan.height} style={plan.backgroundStyle}></rect>

      <rect y={plan.y} x={start} width={progress - start} height={plan.height} style={progressStyle}></rect>
    </g>
  )
}
