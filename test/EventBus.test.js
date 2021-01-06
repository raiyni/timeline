import EventBus, { Events, Priority } from './../src/EventBus';

it('subscribe should add a callback', () => {
  const eb = new EventBus()

  eb.on(Events.TOGGLE, () => true)

  expect(Array.isArray(eb.listeners.toggle)).toBe(true)
  expect(eb.listeners.toggle.length).toBe(1)
  expect(eb.listeners.toggle[0].callback()).toBe(true)
})


it('subscribe should sort callbacks', () => {
  const eb = new EventBus()

  eb.on(Events.TOGGLE, () => true)
  eb.on(Events.TOGGLE, () => true, Priority.HIGH)

  expect(eb.listeners.toggle.length).toBe(2)
  expect(eb.listeners.toggle[0].priority).toBe(Priority.HIGH)
})


it('callbacks should be called on emit', () => {
  const eb = new EventBus()

  let counter = 0
  eb.on(Events.TOGGLE, () => counter++)
  eb.on(Events.TOGGLE, () => counter++, Priority.HIGH)
  eb.on(Events.COLLAPSE, () => counter++)

  eb.emit(Events.TOGGLE)
  expect(counter).toBe(2)
})


it('un should remove callbacks', () => {
  const eb = new EventBus()

  let counter = 0
  const cb = () => counter++

  eb.on(Events.TOGGLE, cb)
  const id = eb.on(Events.TOGGLE, () => counter++)

  eb.emit(Events.TOGGLE)
  expect(counter).toBe(2)

  eb.un(Events.TOGGLE, cb)
  expect(eb.listeners.toggle.length).toBe(1)

  eb.un(Events.TOGGLE, null, id)
  expect(eb.listeners.toggle.length).toBe(0)
})
