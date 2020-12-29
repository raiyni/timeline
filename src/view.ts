import * as d3 from 'd3'

import { Offset, PlanOptions, Rect, Sides, TaskOptions, TimelineOptions, VIEW_MODE } from './types'

import Columns from './columns'
import Task from './task'
import { VIEW_MODE as VM } from './types'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import utc from 'dayjs/plugin/utc'

export default class View {
  private x: any
  private y: any
  private groups: any

  private parent: any
  private tasks: Task[]

  private minDate: dayjs.Dayjs
  private maxDate: dayjs.Dayjs

  private options: TimelineOptions

  private columns: Columns

  private id: number

  private left: any
  private right: any

  private bodyHeader: any
  private headerSvg: any

  private bodyHolder: any
  private bodySvg: any

  private columnsBody: any
  private columnsHeader: any

  constructor(selector: string, taskOptions: TaskOptions[], options: TimelineOptions) {
    dayjs.extend(minMax)
    this.options = options

    this.tasks = taskOptions.map((t) => new Task(t, this.options))
    this.columns = new Columns(this.tasks, this.options)

    this.parent = d3
      .select(document.body.querySelector(selector))
      .append('div')
      .style('display', 'flex')
      .style('flex-direction', 'row')
      .style('align-items', 'stretch')
      .style('width', '100%')
      .style('height', '100%')
      .style('overflow', 'hidden')

    this.left = this.parent
      .append('div')
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('overflow', 'hidden')
      .style('padding-bottom', 18) // for the scrollbar

    this.columnsHeader = this.left.append('div')
      .style('min-height', 30)
      .style('display', 'flex')

    this.columnsBody = this.left.append('div')
      .style('flex', 1)
      .style('flex-direction', 'row')
      .style('display', 'flex')
      .style('overflow', 'hidden')

    this.right = this.parent
      .append('div')
      .style('flex', 1)
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('align-items', 'stretch')
      .style('overflow', 'hidden')

    this.bodyHeader = this.right.append('div')
      .style('overflow', 'hidden')

    this.headerSvg = this.bodyHeader.append('svg')
      .attr('height', 30)

    this.bodyHolder = this.right.append('div')
      .style('flex', 1)
      .style('overflow-y', 'auto')

    this.renderDivs()

    this.bodyHolder.node().addEventListener('scroll', (event: any) => {
      this.updateScroll(event.target.scrollLeft, event.target.scrollTop);
    })
  }

  private updateScroll(left: number, top: number): void {
    this.columnsBody.node().scrollTop = top;
    this.bodyHeader.node().scrollLeft = left;
  }

  private computeBoundingDates(): void {
    const dates = this.tasks.map((task) => task.rows).flat(3)
    const startDates = dates.map((d) => d.start)
    const endDates = dates.map((d) => d.end)

    this.minDate = dayjs.min(startDates)
    this.maxDate = dayjs.max(endDates)
    switch (this.options.viewMode || VM.WEEK) {
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

  private getDateDiff(): number {
    switch (this.options.viewMode || VM.WEEK) {
      case VM.DAY:
        return Math.ceil(this.maxDate.diff(this.minDate, 'day'))
      case VM.MONTH:
        return Math.ceil(this.maxDate.diff(this.minDate, 'month'))
      case VM.YEAR:
        return Math.ceil(this.maxDate.diff(this.minDate, 'year'))
      case VM.FILL:
        return 1
      case VM.WEEK:
      default:
        return Math.ceil(this.maxDate.diff(this.minDate, 'week'))
    }
  }

  private getDateWidth(): number {
    switch (this.options.viewMode || VM.WEEK) {
      case VM.DAY:
        return 30
      case VM.MONTH:
      case VM.WEEK:
        return 100
      case VM.YEAR:
        return 365
      default:
        return 1
    }
  }

  private computeSize(viewport: number): Rect {
    const bounds = this.parent.node().getBoundingClientRect()

    // this.maxDate.diff(this.minDate, )
    const diff = this.getDateDiff()
    const width = this.getDateWidth() * diff

    const height = this.tasks
      .map((task) => [5].concat(task.heights))
      .flat(3)
      .reduce((a, b) => a + b)
    return {
      width: width,
      height: Math.max(height, bounds.height)
    }
  }

  private getDateType(): dayjs.OpUnitType {
    switch (this.options.viewMode || VM.WEEK) {
      case VM.DAY:
        return 'day'
      case VM.MONTH:
        return 'month'
      case VM.WEEK:
        return 'week'
      case VM.YEAR:
        return 'year'
    }

    return 'year'
  }

  private getAxis(): any {
    const width = this.getDateWidth()
    let day = dayjs()

    switch (this.options.viewMode || VM.WEEK) {
      case VM.DAY:
        day = this.minDate.add(1, 'day')
        break
      case VM.MONTH:
        day = this.minDate.add(1, 'month')
        break
      case VM.WEEK:
        day = this.minDate.add(1, 'week')
        break
      case VM.YEAR:
        day = this.minDate.add(1, 'year')
        break
      default:
        return 1
    }

    return d3.scaleTime().range([0, width]).domain([this.minDate, day])
  }

  private renderDivs() {
    this.computeBoundingDates()

    const bounds = this.bodyHolder.node().getBoundingClientRect()
    const viewport = bounds.width
    const size = this.computeSize(viewport)

    this.y = d3
      .scaleBand()
      .range([size.height, 0])
      .domain(this.tasks.map((c, i) => i + ''))
      .padding(0.1)

    const referenceAxis = this.getAxis()

    let endDate = this.maxDate
    if (size.width < viewport) {
      let date = this.maxDate
      let w = size.width
      const unit = this.getDateType()
      while (w <= viewport) {
        date = date.add(1, unit)
        w += referenceAxis(date.toDate())
      }

      endDate = date
    }

    let startDate = this.minDate
    switch (this.options.viewMode || VM.WEEK) {
      case VM.DAY:
        startDate = startDate.add(-1, 'day')
        break
      case VM.MONTH:
        startDate = startDate.add(-1, 'month')
        break
      case VM.YEAR:
        startDate = startDate.add(-1, 'year')
        break
      case VM.FILL:
        break
      case VM.WEEK:
      default:
        startDate = startDate.add(-1, 'week')
        break
    }

    const fullWidth = Math.max(size.width, viewport)
    this.x = d3.scaleTime().range([0, fullWidth]).domain([startDate, endDate]).nice()

    let xAxis = d3.axisTop(this.x)
    switch (this.options.viewMode || VM.WEEK) {
      case VM.DAY:
        xAxis = xAxis.ticks(d3.timeDay.every(3))
        break
      case VM.MONTH:
        xAxis = xAxis.ticks(d3.timeMonth.every(1))
        break
      case VM.YEAR:
        xAxis = xAxis.ticks(d3.timeYear.every(1))
        break
      case VM.FILL:
        break
      case VM.WEEK:
      default:
        xAxis = xAxis.ticks(d3.timeWeek.every(1))
        break
    }

    const xAxisSvg = this.headerSvg
      .append('g')
      .attr('transform', 'translate(-1, 28)')
      .attr('class', 'x axis')
      .call(xAxis)

    xAxisSvg.select('.tick:first-of-type').remove()

    this.headerSvg.attr('width', fullWidth)

    this.groups = this.bodyHolder
      .selectAll('.group')
      .data(this.tasks)
      .enter()
      .append('div')
      .classed('group', true)
      .style('width', fullWidth)

    const offset: Offset = { x: fullWidth, y: 0 }
    this.groups.each((task: Task, idx: number, arr: SVGElement[]) => {
      const group = d3.select(arr[idx])
      task.renderDivs(this.x, this.y, group, offset)
    })

    this.columns.renderDivs(this.columnsHeader, this.columnsBody)

    this.bodyHolder.node().scrollHeight += 30
    this.columnsBody.node().scrollHeight = this.bodyHolder.node().scrollHeight
  }
}
