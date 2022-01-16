import { h } from 'preact'
import { Icon } from './svg'
import { isArrow, isImage, isLine, isShape, isText, MilestoneOptions, ShapeType } from './types'
import { useConfig } from './util/useConfig'


const EmptyBox = ({ x1, x2, height }: { x1: number; x2: number; height: number }) => {
  return <rect x={x1 < x2 ? x1 : x2} width={Math.abs(x2 - x1)} height={height} fill="transparent" />
}

export const Milestone = ({ options, height }: { options: MilestoneOptions; height: number }) => {
  const store = useConfig()
  const state = store.state

  if (isText(options)) {
    const y = options.y || (height) / 2
    const x = state.x(options.date)
    return(
      <g className="timeline-milestone">
        <text x={x} y={y} style={{
          ...options.style
        }}>
          {options.text}
        </text>
      </g>
    )
  }

  if (isImage(options)) {
    const y = (height - options.height) / 2
    const offset = options.alignment == 'left' ? 0 : options.alignment == 'right' ? options.width : options.width / 2
    const x = state.x(options.date) - offset
    return (
      <g className="timeline-milestone">
        <image href={options.href} width={options.width} height={options.height} y={y} x={x} />
      </g>
    )
  }

  if (isArrow(options)) {
    const y = height / 2
    const isBackwards = options.end < options.start
    const x1 = state.x(options.start)
    const x2 = state.x(options.end)

    return (
      <g className="timeline-milestone">
        <EmptyBox x1={x1} x2={x2} height={height} />
        <line x1={x1} x2={x2} y1={y} y2={y} style={options.style} />
        <Icon
          options={{
            shape: ShapeType.TRIANGLE,
            rotate: isBackwards ? -90 : 90,
            style: options.style
          }}
          width={15}
          height={15}
          x={x2 - (isBackwards ? 15 : 1)}
          y={y / 2}
        />
      </g>
    )
  }

  if (isShape(options)) {
    const y = (height - options.height) / 2
    const offset = options.alignment == 'left' ? 0 : options.alignment == 'right' ? options.width : options.width / 2
    const x = state.x(options.date) - offset

    if (options.shape == ShapeType.DASH) {
      const x2 = state.x(options.date)
      return (
        <g className="timeline-milestone">
          <EmptyBox x1={x2 - 5} x2={x2 + 5} height={height} />
          <line x1={x2} x2={x2} y1={0} y2={height} style={options.style} stroke-dasharray={2} />
        </g>
      )
    }

    return <Icon className="timeline-milestone" options={options} width={options.width} height={options.height} x={x} y={y} />
  }

  if (isLine(options)) {
    const y = height / 2
    const x1 = state.x(options.start)
    const x2 = state.x(options.end)
    return (
      <g className="timeline-milestone">
        <EmptyBox x1={x1} x2={x2} height={height * 2} />
        <line x1={x1} x2={x2} y1={y} y2={y} style={options.style} />
      </g>
    )
  }

  return null
}
