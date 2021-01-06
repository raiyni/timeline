import { LabelOptions, Offset, TaskOptions, TimelineOptions, ColumnOptions, obj } from './types'
import { applyStyle, clamp, uid } from './util'

import Plan from './plan'
import deepmerge from './deepmerge'
import Milestone from './milestone'
import { Events, Priority } from './EventBus'

export default class Task {
  rows: Plan[][]
  milestones: Milestone[][]
  heights: number[]
  labels: { [key: string]: LabelOptions[] }
  options: TaskOptions & obj
  timelineOptions: TimelineOptions
  id: string
  constructor(options: TaskOptions & obj, timelineOptions: TimelineOptions) {
    this.id = uid()
    this.rows = []
    this.timelineOptions = timelineOptions
    if (options.plan) {
      this.rows = [[new Plan(options.plan)]]
    } else if (options.plans && Array.isArray(options.plans)) {
      // @ts-ignore
      this.rows = options.plans.map((p) => {
        if (!Array.isArray(p)) {
          return [new Plan(p)]
        }

        return p.map((pl) => new Plan(pl))
      })
    } else if (options.plans) {
      console.error('Plans object is not an array')
    }

    this.milestones = []
    if (options.milestones && Array.isArray(options.milestones)) {
      // @ts-ignore
      this.milestones = options.milestones.map(m => {
        if (!Array.isArray(m)) {
          return [new Milestone(m)]
        }

          return m.map(ml => new Milestone(ml))
      })
    }

    if (this.milestones.length > this.rows.length) {
      const fill = Array.from({length: this.milestones.length - this.rows.length}, () => [])
      this.rows = this.rows.concat(fill)
    } else if (this.rows.length > this.milestones.length) {
      const fill = Array.from({length: this.rows.length - this.milestones.length}, () => [])
      this.milestones = this.milestones.concat(fill)
    }

    this.options = options
    this.computeRowHeights()
    this.labels = {}

    if (timelineOptions.columns.length == 0) return

    timelineOptions.columns.forEach((c: ColumnOptions, idx: number) => {
      this.labels[c.field] = this.prepareOptions(c)
    })

    this.timelineOptions.eventbus.on(Events.TOGGLE, (id) => {
      if (id == this.id) {
        this.toggle()
      }
    }, Priority.HIGH)

    this.timelineOptions.eventbus.on(Events.COLLAPSE, () => {
      if (this.options.collapsed) {
        this.collapse()
      }
    }, Priority.HIGH)
  }

  computeRowHeights(): void {

    this.heights = this.rows
      .map((row) => row.map((plan) => plan.height))
      .map((row) => Math.max.apply(null, row))
  }

  renderDivs(x: any, y: any, group: any, offset: Offset) {
    group.attr('data-id', this.id)
    this.rows.forEach((row: Plan[], idx: number) => {
      const div = group
          .append('div')
          .style('height', this.heights[idx])
          .style('width', offset.x)
          .attr('class', 'task-row')

      const svg = div.append('svg')
                        .attr('height', this.heights[idx])
                        .attr('width', offset.x)
      row.forEach((plan: Plan, idx2: number) => {
        const layer = svg.append('g').attr('class', 'plan')

        this.drawBackground(x, y, layer, plan)
        this.drawProgress(x, y, layer, plan)
      })

      const mRow = this.milestones[idx]
      mRow.forEach((milestone: Milestone, idx2: number) => {
        this.drawMilestone(x, svg, milestone, idx)
      })
    })
  }

  private drawBackground(x: any, y: any, group: any, plan: Plan): void {
    const rect = group
      .append('rect')
      .attr('x', x(plan.start.toDate()))
      .attr('y', 0)
      .attr('height', plan.height)
      .attr('width', x(plan.end) - x(plan.start))
    applyStyle(rect, plan.backgroundStyle)
  }

  private drawProgress(x: any, y: any, group: any, plan: Plan): void {
    const rect = group
      .append('rect')
      .attr('x', x(plan.start.toDate()))
      .attr('y', 0)
      .attr('height', plan.height)
      .attr('width', (x(plan.end) - x(plan.start)) * clamp(plan.progress / 100, 0, 1))
    applyStyle(rect, plan.progressStyle)
  }

  private drawMilestone(x: any, layer: any, milestone: Milestone, idx: number) {
    const height = this.heights[idx]
    const y = milestone.y || (height - milestone.height) / 2
    if (milestone.href) {
      layer.append('image')
        .attr('href', milestone.href)
        .attr('height', milestone.height)
        .attr('width', milestone.width)
        .attr('x', x(milestone.date))
        .attr('y', y)
    }
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
        v.labelStyle = deepmerge.all([
          {
            color: '#000000'
          },
          defaults.labelStyle || {},
          v.labelStyle || {}
        ])

        v.backgroundStyle = deepmerge(defaults.backgroundStyle || {}, v.backgroundStyle || {})
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

  getTaskSubColumns(): any {
    return this.timelineOptions.wrapper
      .selectAll(`div[data-id="${this.id}"]`)
      .selectAll('.column-plan:not(:first-child)')
  }

  getTaskSubRows(): any {
    return this.timelineOptions.wrapper
      .selectAll(`div[data-id="${this.id}"]`)
      .selectAll('.task-row:not(:first-child)')
  }

  collapse() {
    this.getTaskSubColumns()
      .style('display', 'none')

    this.getTaskSubRows()
      .style('display', 'none')

    this.timelineOptions.wrapper
      .select(`a[data-id="${this.id}]`)
      .attr('class', 'task-expand')
  }

  expand() {
    this.getTaskSubColumns()
      .style('display', 'flex')

    this.getTaskSubRows()
      .style('display', 'flex')

    this.timelineOptions.wrapper
      .select(`a[data-id="${this.id}]`)
      .attr('class', 'task-collapse')
  }

  toggle(): boolean {
    if (this.options.collapsed) {
      this.expand()
      this.options.collapsed = false
    } else {
      this.collapse()
      this.options.collapsed = true
    }

    return !!this.options.collapsed
  }
}
