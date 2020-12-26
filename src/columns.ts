import { Offset, TimelineOptions } from "./types";

import Column from "./column";
import Task from "./task";

export default class Columns {
  private tasks: Task[]
  private options: TimelineOptions
  private columns: Column[]
  dom: any
  constructor(tasks: Task[], options: TimelineOptions) {
    this.tasks = tasks
    this.options = options
    this.columns = options.columns.map(o => new Column(this.tasks, o))
  }

  render(header:any, svg: any): void {
    this.dom = svg.append('g')
      .attr('class', 'columns')
      .attr('transform', 'translate(0, 0)')

    if (this.columns.length == 0) return

    const offset: Offset = {
      x: 0, y: 20
    }
    this.columns.forEach((c: Column, idx: number) => {
      c.render(header, this.dom)
      c.dom.attr('transform', `translate(${offset.x}, ${offset.y})`)
      c.dom.attr('transform', `translate(${offset.x}, 0)`)
      offset.x += Number(c.dom.attr('width'))
    })

    header.attr('width', offset.x)
    svg.attr('width', offset.x)
  }

  getWidth(): number {
    return this.dom.node().getBBox().width
  }
}
