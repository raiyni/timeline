import { ColumnOptions, Offset } from "./types";
import { IS_IE, applyStyle } from "./util";

import Task from "./task";
import { text } from "d3";

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

  renderDivs(header: any, parent: any) {
    const titleDiv = header.append('div')
        .style('display', 'flex')
        .style('align-items', 'flex-end')
        .style('justify-content', 'center')
        .text(this.options.text)
        .style('box-shadow', 'inset 0 -1px 0 0 #000')
        .style('margin-bottom', '1px')

    this.tasks.forEach((task: Task, idx: number) => {
      const labels = task.labels[this.options.field]
      labels.forEach((l, idx2) => {
        const height = task.heights[idx2]
        const style = l.backgroundStyle || {}

        const div = parent.append('div')
          .style('height', height)
          .style('padding', '0 4px 0 4px')
          .style('display', 'flex')
          .style('align-items', 'center')

        if (l.label) {
          const span = div.text(l.label)

          applyStyle(span, l.labelStyle || {}, false)
        }

        if (Object.keys(style).length == 0) {
          return
        };

        applyStyle(div, style, false)
      })
    })

    const titleWidth = titleDiv.node().getBoundingClientRect().width
    const parentWidth = parent.node().getBoundingClientRect().width

    const maxWidth = Math.max(titleWidth, parentWidth)
    parent.style('width', maxWidth)
    titleDiv.style('width', maxWidth)
  }
}
