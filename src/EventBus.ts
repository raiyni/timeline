export enum Events {
  COLLAPSE = 'collapse',
  TOGGLE = 'toggle'
}

export enum Priority {
  LOW = 100,
  NORMAL = 0,
  HIGH = -100
}

type EventCallback = (arg: any) => void

interface CallbackHolder {
  callback: EventCallback
  priority: Priority
  id: number
}

let nextId = 0;

export default class EventBus {
  private listeners: {[key in Events]?: CallbackHolder[];}

  constructor() {
    this.listeners = {}
  }

  on(event: Events, callback: EventCallback, priority: Priority = Priority.NORMAL): number {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    const holder: CallbackHolder = {
      callback: callback,
      priority: priority,
      id: ++nextId
    };

    this.listeners[event].push(holder)
    this.listeners[event].sort((a, b) => a.priority - b.priority)
    return holder.id
  }

  un(event: Events, callback: EventCallback, id: number) {
    if (!this.listeners[event]) return;

    if (!!id) {
      this.listeners[event] = this.listeners[event].filter( item => item.id !== id)
    } else {
      this.listeners[event] = this.listeners[event].filter( item => item.callback !== callback)
    }
  }

  emit(event: Events, arg?: any) {
    if (!this.listeners[event]) return;

    this.listeners[event].forEach((holder: CallbackHolder) => holder.callback(arg))
  }

  clear() {
    Object.keys(this.listeners).forEach((k: string) => delete this.listeners[k as Events])
  }
}
