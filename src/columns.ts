import { Offset, TimelineOptions } from "./types";

import Column from "./column";
import Task from "./task";
import deepmerge from './deepmerge';

export default class Columns {
  private tasks: Task[]
  private options: TimelineOptions
  private columns: Column[]
  dom: any
  constructor(tasks: Task[], options: TimelineOptions) {
    this.tasks = tasks
    this.options = options
    this.columns = options.columns.map(o => {
      const colOptions = deepmerge({
        taskMargin: options.taskMargin
      }, o)
      return new Column(this.tasks, colOptions)
    })
  }

  renderDivs(header: any, holder: any): void {
    this.columns.forEach((column: Column, idx: number) => {
      const layer = holder.append('div')
        .style('flex', '0 1 auto')
        .attr('class', 'column')

      column.renderDivs(header, layer, idx)
    })
  }

  getWidth(): number {
    return this.dom.node().getBBox().width
  }
}
