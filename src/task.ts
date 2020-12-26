import { LabelOptions, Offset, TaskOptions, TimelineOptions, ColumnOptions, obj } from "./types";
import { applyStyle, clamp } from "./util";

import Plan from "./plan";
import deepmerge from "./deepmerge";

export default class Task {
  rows: Plan[][]
  heights: number[]
  labels: {[key: string]: LabelOptions[];}
  options: TaskOptions & obj
  constructor(options: TaskOptions & obj, timelineOptions: TimelineOptions) {
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

    this.options = options

    this.computeRowHeights()
    this.labels = {}

    if (timelineOptions.columns.length == 0) return

    timelineOptions.columns.forEach((c: ColumnOptions, idx: number) => {
      this.labels[c.field] = this.prepareOptions(c)
    })
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
      .attr('x', x(plan.start.toDate()) + offset.x)
      .attr('y', offset.y)
      .attr('height', plan.height)
      .attr('width', x(plan.end) - x(plan.start))
    applyStyle(rect, plan.backgroundStyle)
  }

  private drawProgress(x: any, y: any, group: any, plan: Plan, offset: Offset): void {
    const rect = group.append('rect')
      .attr('x', x(plan.start.toDate()) + offset.x)
      .attr('y', offset.y)
      .attr('height', plan.height)
      .attr('width', (x(plan.end) - x(plan.start)) * clamp(plan.progress / 100, 0, 1))
    applyStyle(rect, plan.progressStyle)
  }

  private prepareOptions(columnOptions: ColumnOptions): LabelOptions[] {
    let options = this.options[columnOptions.field]
    if (!options) return []

    if (typeof options == 'string' || typeof options == 'number') {
      options = { label: options }
    }

    if (options.label) {
      options = [options]
    }

    console.assert(Array.isArray(options), "Column options isn't a string, array, nor label")
    ;(<obj[]>options).forEach((v, idx) => {
      if (typeof v == 'string' || typeof v == 'number') {
        v = { label: v }
      }

      options[idx] = v
      const defaults = columnOptions.defaults || {}
      if (defaults) {
        v.labelStyle = deepmerge.all([{
          fill: '#000000'
        },  defaults.labelStyle || {}, v.labelStyle || {}])

        console.log(v)
        v.backgroundStyle = deepmerge(defaults.backgroundStyle || {}, v.backgroundStyle || {})
        // v.verticalAlign = v.verticalAlign || defaults.verticalAlign || VERTICAL_ALIGN.MIDDLE
        // v.horizontalAlign = v.horizontalAlign || defaults.horizontalAlign || HORIZONTAL_ALIGN.LEFT
      } else {
        // v.verticalAlign = v.verticalAlign || VERTICAL_ALIGN.MIDDLE
        // v.horizontalAlign = v.horizontalAlign || HORIZONTAL_ALIGN.LEFT
      }
    })

    if (options.length < this.rows.length) {
      options = options.concat(new Array(this.rows.length - options.length).fill({}))
    }

    if (options.length > this.rows.length) {
      options = options.slice(0, this.rows.length)
    }
    return options
  }
}
