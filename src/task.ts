import { LabelOptions, Offset, TaskOptions, TimelineOptions, ColumnOptions, obj, Style } from './types'
import { uid } from './util'

import Plan from './plan'
import deepmerge from 'deepmerge'
import Milestone from './milestone'
import { Events, Priority } from './EventBus'
import dayjs from 'dayjs'

// @ts-ignore
import flat from 'core-js-pure/features/array/flat'
// @ts-ignore
import fill from 'core-js-pure/features/array/fill'

export default class Task {
  rows: Plan[][]
  milestones: Milestone[][]
  heights: number[]
  labels: { [key: string]: LabelOptions[] }
  options: TaskOptions & obj
  config: TimelineOptions
  id: string
  minDate: dayjs.Dayjs
  maxDate: dayjs.Dayjs
  constructor(options: TaskOptions & obj, config: TimelineOptions) {
    this.id = uid()
    this.rows = []
    this.milestones = []
    this.config = config
    this.options = options

    this.createPlans()

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

    const plans = flat(this.rows, 3)
    const milestones = flat(this.milestones, 3)

    const iconMilestones = milestones.map(m => m.getDates())
    const startDates = flat(plans.map(p => p.start).concat(iconMilestones))
    const endDates = flat(plans.map(p => p.end).concat(iconMilestones))

    this.minDate = dayjs.min(startDates)
    this.maxDate = dayjs.max(endDates)


    this.computeRowHeights()
    this.labels = {}

    if (config.columns.length == 0) return

    config.columns.forEach((c: ColumnOptions, idx: number) => {
      this.labels[c.field] = this.prepareOptions(c)
    })

    if (this.options.collapsible) {
      this.config.eventbus.on(Events.TOGGLE, (id) => {
        if (id == this.id) {
          this.toggle()
        }
      }, Priority.HIGH)

      this.config.eventbus.on(Events.COLLAPSE, () => {
        if (this.options.collapsed) {
          this.collapse()
        }
      }, Priority.HIGH)
    }
  }

  createPlans() {
    const defaults = this.config.planDefaults || {}

    if (this.options.plan) {
      this.applyDefaultStyle(this.options.plan, defaults[0] || defaults)
      this.rows = [[new Plan(this.options.plan)]]
    } else if (this.options.plans && Array.isArray(this.options.plans)) {
      // @ts-ignore
      this.rows = this.options.plans.map((p, idx) => {
        if (!Array.isArray(p)) {
          if (Array.isArray(defaults)) {
            this.applyDefaultStyle(p, defaults[idx] || {})
          } else {
            this.applyDefaultStyle(p, defaults)
          }
          return [new Plan(p)]
        }

        return p.map((pl) => {
          if (Array.isArray(defaults)) {
            this.applyDefaultStyle(pl, defaults[idx] || {})
          } else {
            this.applyDefaultStyle(pl, defaults)
          }
          return new Plan(pl)
        })
      })
    } else if (this.options.plans) {
      console.error('Plans object is not an array')
    }
  }

  computeRowHeights(): void {
    this.heights = this.rows
      .map((row) => row.map((plan) => plan.height))
      .map((row) => Math.max.apply(null, row))
  }

  getHeight(): number {
    if (this.options.collapsed) {
      return this.heights[0];
    }

    return this.heights.reduce((a, b) => a + b)
  }

  renderDivs(x: any, y: any, group: any, offset: Offset) {
    group.attr('data-id', this.id)
    this.rows.forEach((row: Plan[], idx: number) => {
      const rowHeight = this.heights[idx]
      const div = group
          .append('div')
          .style('height', rowHeight)
          .style('width', offset.x)
          .attr('class', 'task-row')
          .style('background-color', '#fff')

      const svg = div.append('svg')
                        .attr('height', this.heights[idx])
                        .attr('width', offset.x)

      row.forEach((plan: Plan) => {
        plan.render(svg, x)
      })

      const mRow = this.milestones[idx]
      mRow.forEach((milestone: Milestone) => {
        milestone.render(x, svg, rowHeight)
      })
    })
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
    if (options.length < this.rows.length) {
      options = options.concat(fill(new Array(this.rows.length - options.length), {}))
    }

    if (options.length > this.rows.length) {
      options = options.slice(0, this.rows.length)
    }

    ;(<obj[]>options).forEach((v, idx) => {
      if (typeof v == 'string' || typeof v == 'number') {
        v = { label: v }
      }

      options[idx] = v
      const defaults = columnOptions.defaults || {}
      if (Array.isArray(defaults)) {
        this.applyDefaultStyle(v, defaults[idx] || {})
      } else {
        this.applyDefaultStyle(v, defaults)
      }
    })

    return options
  }

  applyDefaultStyle(obj: Style, defaults: any) {
    if (obj.progressStyle || defaults.progressStyle) {
      obj.progressStyle = deepmerge(defaults.progressStyle || {}, obj.progressStyle || {})
    }

    if (obj.labelStyle || defaults.labelStyle) {
      obj.labelStyle = deepmerge.all([
        {
          color: '#000000'
        },
        defaults.labelStyle || {},
        obj.labelStyle || {}
      ])
    }

    if (obj.backgroundStyle || defaults.backgroundStyle) {
      obj.backgroundStyle = deepmerge(defaults.backgroundStyle || {}, obj.backgroundStyle || {})
    }

    if (!obj.height && defaults.height) {
      obj.height = defaults.height
    }

    if (obj.progress !== 0 && !obj.progress && defaults.progress) {
      obj.progress = defaults.progress
    }
  }

  getTaskSubColumns(): any {
    return this.config.wrapper
      .selectAll(`div[data-id="${this.id}"]`)
      .selectAll('.column-plan:not(:first-child)')
  }

  getTaskSubRows(): any {
    return this.config.wrapper
      .selectAll(`div[data-id="${this.id}"]`)
      .selectAll('.task-row:not(:first-child)')
  }

  collapse() {
    this.getTaskSubColumns()
      .style('display', 'none')

    this.getTaskSubRows()
      .style('display', 'none')

    this.config.wrapper
      .select(`a[data-id="${this.id}"]`)
      .attr('class', 'task-expand')
  }

  expand() {
    this.getTaskSubColumns()
      .style('display', 'flex')

    this.getTaskSubRows()
      .style('display', 'flex')

    this.config.wrapper
      .select(`a[data-id="${this.id}"]`)
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

  getButtonCls() : string {
    return this.options.collapsed ? 'task-expand' : 'task-collapse'
  }
}
