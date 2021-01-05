export enum Events {
  COLLAPSE = 'collapse',
  TOGGLE = 'toggle'
}

type EventCallback = (arg: any) => void

export default class EventBus {
  private listeners: {[key in Events]?: EventCallback[];}

  constructor() {
    this.listeners = {}
  }

  on(event: Events, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  un(event: Events, callback: EventCallback) {
    if (!this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter( item => item !== callback)
  }

  publish(event: Events, arg: any) {
    if (!this.listeners[event]) return;

    this.listeners[event].forEach((callback: EventCallback) => callback(arg))
  }

  clear() {
    Object.keys(this.listeners).forEach((k: string) => delete this.listeners[k as Events])
  }
}
