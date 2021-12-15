// Must be the first import
import 'preact/debug'

import { TimelineOptions } from './types'
import { View } from './view'
import dayjs from 'dayjs'
import { h } from 'preact'
import minMax from 'dayjs/plugin/minMax'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { render } from 'preact'

export default class Timeline {
  target: any
  data: any[]
  config: TimelineOptions

  static version:string = process.env.VERSION
  static git: any = {
    sha: process.env.SHA,
    tag: process.env.TAG,
    date: process.env.COMMIT_DATE
  }
  static SHA:string = process.env.GIT

  constructor(id: string, data: any[], config: TimelineOptions) {

    dayjs.extend(minMax)
    dayjs.extend(customParseFormat)
    this.config = config || {}
    if (id.indexOf('.') === 0) {

    } else {
      this.target = document.getElementById(id)
    }

    this.updateData(data)
  }

  forceRender() {
     render(null, this.target)
    render(<View data={this.data} config={this.config}/>, this.target)
  }

  updateConfig(config: TimelineOptions) {
    this.config = config || {}
    this.forceRender()
  }

  updateData(data: any[]) {
    this.data = data
    this.forceRender()
  }

  update(data: any[], config: TimelineOptions) {
    this.config = config || {}
    this.data = data
    this.forceRender()
  }
}
