import { ColumnOptions, TimelineOptions } from "./types";

import Column from "./column";
import Task from "./task";
import deepmerge from 'deepmerge';

export default class Columns {
  private tasks: Task[]
  private config: TimelineOptions
  private columns: Column[]
  constructor(tasks: Task[], config: TimelineOptions) {
    this.tasks = tasks
    this.config = config
    this.columns = this.config.columns.map((o: ColumnOptions) => {
      const colOptions  = deepmerge({
        taskMargin: this.config.taskMargin
      }, o)
      return new Column(this.tasks, colOptions as ColumnOptions, this.config)
    })
  }

  render(header: any, holder: any): void {
    this.columns.forEach((column: Column, idx: number) => {
      const layer = holder.append('div')
        .style('flex', '0 1 auto')
        .attr('class', 'column')

      column.render(header, layer, idx)
    })
  }
}
