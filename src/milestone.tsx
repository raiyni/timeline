import { MilestoneOptions, ShapeType, Tick, isArrow, isImage, isLine, isShape } from './types';

import { Icon } from './svg';
import dayjs from 'dayjs';
import { h } from 'preact'
import { useConfig } from './util/useConfig';

export const Milestone = ({ options, height }: { options: MilestoneOptions, height: number }) => {
  const store = useConfig()
  const state = store.state


  if (isImage(options)) {
    const y = (height - options.height) / 2
    const x = state.x(options.date) - options.width / 2
    return (
      <g  className='milestone-image'>
        <image href={options.href} width={options.width} height={options.height} y={y} x={x} />
      </g>
    )
  }

  if (isShape(options)) {
    const y = (height - options.height) / 2
    const x = state.x(options.date) - options.width / 2

    if (options.shape == ShapeType.DASH) {
      const x2 = state.x(options.date)
      return (
        <g>
          <line x1={x2} x2={x2} y1={0} y2={height} style={options.style} stroke-dasharray={2} />
        </g>
      )
    }

    return (
      <Icon options={options} width={options.width} height={options.height} x={x} y={y} />
    )
  }

  if (isLine(options)) {
    const y = height / 2
    return (
      <g className='milestone-line'>
        <line x1={state.x(options.start)} x2={state.x(options.end)} y1={y} y2={y} style={options.style} />
      </g>
    )
  }

  if (isArrow(options)) {

  }

  return null
}
