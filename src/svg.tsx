import { Icon as IconOptions, Shape as ShapeOptions, ShapeType } from './types'

import { h } from 'preact'

export const Icon = ({ options, width, height, x, y }: {options: IconOptions, width: number, height: number, x: number, y: number}) => {
  return (
    <svg x={x} y={y} width={width} height={height} preserveAspectRatio='none' viewBox='0 0 20 20' style={{overflow: 'visible'}}>
      <Shape options={options} />
    </svg>
  )
}

export const Shape = ({ options }: {options: ShapeOptions}) => {
  switch(options.shape) {
    case ShapeType.TRIANGLE:
      return (
        <g transform='translate(10, 10)'>
          <g transform={`rotate(${options.rotate || 0})`}>
            <polygon style={options.style} points='10,2 2,18, 18,18' transform='translate(-10, -10)'></polygon>
          </g>
        </g>
      )

    case ShapeType.SQUARE:
      return (
        <rect x={1} y={1} width={18} height={18} style={options.style}></rect>
      )

    case ShapeType.CIRCLE:
      return (
        <g transform='translate(10, 10)'>
          <g>
            <ellipse cx={10} cy={10} rx={9} ry={9} transform='translate(-10, -10)' style={options.style}></ellipse>
          </g>
        </g>
      )

    case ShapeType.STAR:
      return (
        <polygon style={options.style} points='10,1 12,8, 19,8, 13.5,12 15.5,19 10,15, 4.5,19 6.5,12 1,8 8,8'></polygon>
      )
  }

  return null
}