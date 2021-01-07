import { ColumnOptions, TimelineOptions } from "./types";

import { Events } from "./EventBus";
import Task from "./task";
import { applyStyle } from "./util";

export default class Column {
  private tasks: Task[]
  private options: ColumnOptions
  private config: TimelineOptions
  constructor(tasks: Task[], options: ColumnOptions, config: TimelineOptions) {
    this.tasks = tasks
    this.options = options
    this.config = config
    this.options.padding = this.options.padding || 5
  }

  render(header: any, parent: any, columnIdx: number) {
    const titleDiv = header.append('div')
        .style('display', 'flex')
        .style('align-items', 'flex-end')
        .style('justify-content', 'center')
        .text(this.options.text)

    this.tasks.forEach((task: Task, idx: number) => {
      const layer = parent.append('div')
        .style('border-top', `${this.options.taskMargin}px solid black`)
        .attr('class', 'column-task')
        .attr('data-id', task.id)

      const labels = task.labels[this.options.field]
      labels.forEach((l, idx2) => {
        const height = task.heights[idx2]
        const style = l.backgroundStyle || {}

        const div = layer.append('div')
          .style('height', height)
          .style('padding', '0 4px 0 4px')
          .style('display', 'flex')
          .style('align-items', 'center')
          .attr('class', 'column-plan')
          .style('background-color', '#fff')

        if (l.label) {
          const span = div.append('span').text(l.label)
          applyStyle(span, l.labelStyle || {}, false)
        }

        if (Object.keys(style).length == 0) {
          return
        };

        applyStyle(div, style, false)
      })

      if (task.options.collapsible && columnIdx == 0) {
        const button = layer
          .selectAll("div:first-child")
          .insert('a', ':first-child')
          .attr('class', task.getButtonCls())
          .attr('data-id', task.id)

        button.node().addEventListener('click', (e: MouseEvent) => {
          this.config.eventbus.emit(Events.TOGGLE, button.node().getAttribute('data-id'))
        })

        layer.selectAll('div:first-child span')
          .style('margin-left', 5)
      }
    })

    const titleWidth = titleDiv.node().getBoundingClientRect().width
    const parentWidth = parent.node().getBoundingClientRect().width

    const maxWidth = Math.max(titleWidth, parentWidth)
    parent.style('width', maxWidth)
    titleDiv.style('width', maxWidth)
  }
}
