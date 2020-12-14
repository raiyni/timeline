import { Offset, TaskOptions } from "./types";
import { applyStyle, clamp } from "./util";

import Plan from "./plan";

export default class Task {
  rows: Plan[][]
  heights: number[]
  constructor(options: TaskOptions) {
    if (options.plan) {
      this.rows = [[new Plan(options.plan)]]
    } else if (options.plans && Array.isArray(options.plans)) {
      // @ts-ignore
      this.rows = options.plans.map((p) => {
        if (!Array.isArray(p)) {
          return [new Plan (p)]
        }

        return p.map(pl => new Plan(pl))
      })
    } else {
      console.error('Plans object is not an array')
    }

    this.computeRowHeights()
  }

  computeRowHeights(): void {
    this.heights = this.rows
      .map(row => row.map(plan => plan.height))
      .map(row => Math.max.apply(null, row))
  }

  render(x: any, y: any, group: any, offset: Offset) {
    offset.y += 5
    this.rows.forEach((row: Plan[], idx: number) => {
      row.forEach((plan: Plan, idx2: number) => {
        const layer = group.append('g').attr('class', 'plan')
        this.drawBackground(x, y, layer, plan, offset)
        this.drawProgress(x, y, layer, plan, offset)
      })

      offset.y += this.heights[idx]
    })
  }

  private drawBackground(x: any, y: any, group: any, plan: Plan, offset: Offset): void {
    const rect = group.append('rect')
      .attr('x', x(plan.start.toDate()))
      .attr('y', offset.y)
      .attr('height', plan.height)
      .attr('width', x(plan.end.toDate()) - x(plan.start.toDate()))
    applyStyle(rect, plan.backgroundStyle)
  }

  private drawProgress(x: any, y: any, group: any, plan: Plan, offset: Offset): void {
    const rect = group.append('rect')
      .attr('x', x(plan.start.toDate()))
      .attr('y', offset.y)
      .attr('height', plan.height)
      .attr('width', (x(plan.end.toDate()) - x(plan.start.toDate())) * clamp(plan.progress / 100, 0, 1))
    applyStyle(rect, plan.progressStyle)
  }

}
