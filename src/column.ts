import { ColumnOptions, Offset } from "./types";

import Task from "./task";
import { applyStyle } from "./util";

export default class Column {
  private tasks: Task[]
  private options: ColumnOptions
  dom: any
  headerLayer: any
  parent: any
  constructor(tasks: Task[], options: ColumnOptions) {
    this.tasks = tasks
    this.options = options
    this.options.padding = this.options.padding || 5
  }

  render(header: any, parent: any) {
    this.parent = parent
    this.dom = parent.append('g').attr('class', 'column')

    this.headerLayer = header.append('g')

    const title = this.headerLayer.append('text')
      .text(this.options.text)

    const offset: Offset = { x:this.options.padding, y:10 }
    this.tasks.forEach((task: Task, idx: number) => {
      offset.y += 5
      const labels = task.labels[this.options.field]
      labels.forEach((l, idx2) => {
        const height = task.heights[idx2]

        const label = this.dom.append('text')
          .text(l.label)
          .attr('y', offset.y + height / 2)
          .attr('alignment-baseline', 'central')
          .attr('x', offset.x)
          offset.y += height

        applyStyle(label, l.labelStyle || {})
      })
    })

    let width = Math.max(this.getBounds().width, this.headerLayer.node().getBBox().width)
    width +=  this.options.padding
    this.dom.attr('width', width)
    this.headerLayer.attr('width', width)
    title.attr('x', width / 2).attr('text-anchor', 'middle')

    this.dom.selectAll('[textAnchor=end]')
      .each((_, i, a) => {
        const node = a[i]

        node.setAttribute('text-anchor', 'end')
        node.setAttribute('x', width - this.options.padding)
      })

    this.dom.selectAll('[textAnchor=middle]')
      .each((_, i, a) => {
        const node = a[i]

        node.setAttribute('text-anchor', 'middle')
        node.setAttribute('x', width / 2)
      })

    offset.y = 10
    offset.x = 0
    this.tasks.forEach((task: Task, idx: number) => {
      offset.y += 5
      const labels = task.labels[this.options.field]
      labels.forEach((l, idx2) => {
        const height = task.heights[idx2]

        const style = l.backgroundStyle || {}

        if (Object.keys(style).length == 0) {
          offset.y += height
          return
        };

        const rect = this.dom.insert('rect', ':first-child')
          .attr('y', offset.y)
          .attr('x', offset.x)
          .attr('height', height)
          .attr('width', width)


          offset.y += height
        applyStyle(rect, style)
      })
    })
  }

  getBounds(): DOMRect {
    return this.dom.node().getBBox()
  }
}
