import { Component, h } from 'preact'
import { View } from './view'

export default class Wrapper extends Component<any, any> {
  constructor(props: any) {
    super()
    this.state = {
      data: props.data,
      config: props.config || {},
      events: {}
    }
  }

  render() {
    const events = this.state.events
    return <View data={this.state.data} config={this.state.config} {...events} />
  }
}
