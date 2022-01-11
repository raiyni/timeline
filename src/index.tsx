// Must be the first import
// Must be the first import
import "preact/debug"

import { h } from 'preact'
import { render } from 'preact'
import Wrapper from "./wrapper"

export default class Timeline {
  target: any
  wrapper: any

  static version:string = process.env.VERSION
  static git: any = {
    sha: process.env.SHA,
    tag: process.env.TAG,
    date: process.env.COMMIT_DATE
  }
  static SHA:string = process.env.GIT

  constructor(id: string, data: any[] = [], config: any = {}) {
    if (id.indexOf('.') === 0) {

    } else {
      this.target = document.getElementById(id)
    }

    this.target.innerHTML = ''


    this.initialRender(data, config)
    console.log(this)
  }

  initialRender(data: any[], config: any) {
    render(<Wrapper ref={(wrapper: any) => this.wrapper = wrapper} data={data} config={config} />, this.target)
  }

  updateConfig(config: any) {
    if (this.wrapper) {
      this.wrapper.setState({
        config: config || {}
      })
    }
  }

  updateData(data: any[]) {
    if (this.wrapper) {
      this.wrapper.setState({
        data: data
      })
    }
  }

  update(data: any[], config: any) {
    if (this.wrapper) {
      this.wrapper.setState({
        data: data,
        config: config || {}
      })
    }
  }
}
