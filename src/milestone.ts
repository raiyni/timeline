import { Image, Line, MilestoneOptions, Shape, ShapeType, isImage, isLine, isShape } from './types'

import { applyStyle } from './util'
import dayjs from 'dayjs'
import deepmerge from 'deepmerge'

export default class Milestone {
  x?: number
  y?: number

  image?: Image
  line?: Line
  shape?: Shape

  constructor(options: MilestoneOptions) {
    this.y = options.y
    this.x = options.x

    if (isImage(options)) {
      this.image = {
        date: dayjs(options.date),
        href: options.href,
        width: options.width || 15,
        height: options.height || 15,
        style: deepmerge({}, options.style || {})
      }
    } else if (isLine(options)) {
      this.line = {
        start: dayjs(options.start),
        end: dayjs(options.end),
        style: deepmerge({
          stroke: 'black'
        }, options.style || {})
      }
    } else if (isShape(options)) {
      this.shape = {
        date: dayjs(options.date),
        shape: options.shape,
        width: options.width || 15,
        height: options.height || 15,
        rotate: options.rotate || 0,
        style: deepmerge({
          stroke: '#000',
          fill: '#fff',
          'stroke-width': 2,
          'stroke-linejoin':"miter"
        }, options.style || {})
      }
    }
  }

  getDates() {
    if (this.image) {
      return this.image.date
    }

    if (this.line) {
      return [this.line.start, this.line.end]
    }

    if (this.shape) {
      return this.shape.date
    }

    return []
  }

  render(x: any, layer: any, height: number) {
    if (this.image) {
      const y = this.y || (height - this.image.height) / 2
      const image = layer.append('image')
        .attr('href', this.image.href)
        .attr('height', this.image.height)
        .attr('width', this.image.width)
        .attr('x', x(this.image.date) - this.image.width / 2)
        .attr('y', y)

      applyStyle(image, this.image.style)
    } else if (this.line) {
      const y = this.y || height / 2
      const line = layer.append('line')
        .attr('x1', x(this.line.start))
        .attr('x2', x(this.line.end))
        .attr('y1', y)
        .attr('y2', y)

      applyStyle(line, this.line.style)
    } else if (this.shape) {
      const y = this.y || (height - this.shape.height) / 2
      let shape = null
      switch(this.shape.shape) {
        case ShapeType.SQUARE: {
          shape = layer.append('rect')
            .attr('x', x(this.shape.date) - this.shape.width / 2)
            .attr('y', y)
            .attr('width', this.shape.width)
            .attr('height', this.shape.height)
          break
        }
        case ShapeType.CIRCLE: {
          shape = layer.append('ellipse')
            .attr('cx', x(this.shape.date))
            .attr('cy', height / 2)
            .attr('rx', this.shape.width / 2)
            .attr('ry', this.shape.height / 2)
          break
        }
        case ShapeType.TRIANGLE: {
          shape = layer.append('svg')
            .attr('width', this.shape.width)
            .attr('height', this.shape.height)
            .attr('preserveAspectRatio', 'none')
            .attr('x', x(this.shape.date) - this.shape.width / 2)
            .attr('y', y)
            .attr('viewBox', '0 0 20 20')
              .append('g')
              .attr('transform', `translate(10, 10)`)
                .append('g')
                .attr('transform', `rotate(${this.shape.rotate})`)
                  .append('polygon')
                  .attr('points', '10,2 2,18 18,18')
                  .attr('transform', `translate(-10, -10)`)
          break
        }
        case ShapeType.STAR: {
          shape = layer.append('svg')
            .attr('width', this.shape.width)
            .attr('height', this.shape.height)
            .attr('x', x(this.shape.date) - this.shape.width / 2)
            .attr('y', y)
            .attr('preserveAspectRatio', 'none')
            .attr('viewBox', '0 0 20 20')
              .append('polygon')
              .attr('points', "10,1 12,8, 19,8, 13.5,12 15.5,19 10,15, 4.5,19 6.5,12 1,8 8,8")
        }
      }


      if (shape) {
        applyStyle(shape, this.shape.style)
      }
    }
  }
}
