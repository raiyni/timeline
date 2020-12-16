import * as d3 from 'd3';

import { Offset, PlanOptions, Rect, Sides, TaskOptions, TimelineOptions, VIEW_MODE } from "./types"

import Columns from './columns';
import Task from "./task"
import { VIEW_MODE as VM } from './types'
import dayjs from 'dayjs';
import deepmerge from './deepmerge';
import minMax from 'dayjs/plugin/minMax'

export default class View {
  private svg: any
  private graph: any
  private x: any
  private y: any
  private groups: any

  private parent: HTMLElement
  private tasks: Task[]

  private minDate: dayjs.Dayjs
  private maxDate: dayjs.Dayjs

  private options: TimelineOptions

  private columns: Columns

  private id: number

  constructor(selector: string, taskOptions: TaskOptions[], options: TimelineOptions) {
    dayjs.extend(minMax)
    this.options = options

    this.tasks = taskOptions.map(t => new Task(t, this.options))
    this.columns = new Columns(this.tasks, this.options)

    this.parent = document.body.querySelector(selector)

    this.svg = d3
      .select(this.parent)
      .append('svg')

    this.render()
  }

  private computeBoundingDates(): void {
    const dates = this.tasks.map(task => task.rows).flat(3)
    const startDates = dates.map(d => d.start)
    const endDates = dates.map(d => d.end)

    this.minDate = dayjs.min(startDates)
    this.maxDate = dayjs.max(endDates)
    switch(this.options.viewMode || VM.WEEK) {
      case VM.DAY:
        this.maxDate = this.maxDate.add(1, 'day')
        break
      case VM.MONTH:
        this.maxDate = this.maxDate.add(1, 'month')
        break
      case VM.YEAR:
        this.maxDate = this.maxDate.add(1, 'year')
        break
      case VM.FILL:
        this.maxDate = this.maxDate.add(1, 'day')
        break
      case VM.WEEK:
      default:
        this.maxDate = this.maxDate.add(1, 'week')
        break
    }
  }

  private getDateMultiplier(): number {
    switch(this.options.viewMode || VM.WEEK) {
      case VM.DAY: return 30
      case VM.MONTH: return 200
      case VM.YEAR: return 400
      case VM.FILL: return -1
      case VM.WEEK:
      default: return 210
    }
  }

  private getDateDiff(): number {
    switch(this.options.viewMode || VM.WEEK) {
      case VM.DAY: return Math.ceil(this.maxDate.diff(this.minDate, 'day')) / 31
      case VM.MONTH: return Math.ceil(this.maxDate.diff(this.minDate, 'month')) / 12
      case VM.YEAR: return Math.ceil(this.maxDate.diff(this.minDate, 'year')) / 4
      case VM.FILL: return 1
      case VM.WEEK:
      default: return Math.ceil(this.maxDate.diff(this.minDate, 'week')) / 8
    }
  }

  private computeSize(viewport: number): Rect {
    const bounds = this.parent.getBoundingClientRect()

    // this.maxDate.diff(this.minDate, )
    const diff = this.getDateDiff()
    console.log(this.maxDate.diff(this.minDate, 'year') )
    const width = 1000 * diff

    const height = this.tasks.map((task) => [5].concat(task.heights)).flat(3).reduce((a, b) => a + b)
    return {
      width: width,
      height: Math.max(height, bounds.height)
    }
  }

  private render() {
    this.computeBoundingDates()
    const bounds = this.parent.getBoundingClientRect()

    this.svg
      .attr('width', bounds.width)
      .attr('height', bounds.height)

    this.graph = this.svg
      .append('g')
      .attr('transform', `translate(30, 30)`)

    this.columns.render(this.svg)

    const colWidth = Number(this.columns.dom.attr('width') || 0)
    this.graph.attr('transform', `translate(${colWidth}, 30)`)

    const viewport = bounds.width - colWidth
    const size = this.computeSize(viewport)

    console.log(size)
    this.y = d3.scaleBand()
      .range([size.height, 0])
      .domain(this.tasks.map((c, i) => i + ''))
      .padding(0.1)

    let endDate = this.maxDate
    if (size.width < viewport) {
      const multiplier = size.width / 1000
      let days = this.maxDate.diff(this.minDate, 'day')
      if (multiplier > 1) {
        days = days * multiplier
      } else {
        days = days / multiplier
      }

      endDate = this.maxDate.add(days, 'day')
    }

    this.x = d3.scaleTime()
      .range([0, Math.max(viewport, size.width)])
      .domain([this.minDate.add(-1, 'day').toDate(), endDate.toDate()])
      .nice()

    this.graph.append('g')
      .call(d3.axisLeft(this.y).tickFormat(() => '').tickSize(0))

    this.graph
      .append('g')
      .attr("class", "x axis")
      .call(d3.axisTop(this.x))
      .selectAll('text')
        .attr('x', 0)
        .attr('text-anchor', 'start')

    console.log([this.minDate.toDate(), this.maxDate.toDate()])

    this.groups = this.graph.selectAll('.group')
      .data(this.tasks)
      .enter()
      .append('g')
      .classed('group', true)

    const offset: Offset = { x: 0, y: 0}
    this.groups.each((task: Task, idx: number, arr: SVGElement[]) => {
      const group = d3.select(arr[idx]);
      task.render(this.x, this.y, group, offset)
    });


    // this.svg.attr('width', bounds.width + this.columns.getWidth())
  }
}
