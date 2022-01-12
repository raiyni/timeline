import { Component } from "preact";
import { View } from "./view-context";

import { h } from 'preact'

export default class Wrapper extends Component<any, any> {

  constructor(props: any) {
    super();
    this.state = {
      data: props.data,
      config: props.config || {},
      events: {}
    };
  }

  render() {
    return (
      <View />
    )
  }
}
