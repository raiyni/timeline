import { h, Ref, RefObject } from 'preact'
import { useRef, useState } from 'preact/hooks'
import { toggleTask } from './actions'
import { useEventBus } from './eventbus'
import { Icon } from './svg'
import { ColumnOptions, Icon as IconOptions, isImage, LabelOptions, TaskOptions } from './types'
import { useConfig } from './util/useConfig'

const CollapseButton = ({ collapsed, id }: { collapsed: boolean; id: string }) => {
  const store = useConfig()
  const [hover, setHover] = useState(false)
  return (
    <a
      style={{
        width: 20,
        height: 20,
        display: 'inline',
        border: '0.1em solid rgba(0, 0, 0, 0.63)',
        borderRadius: '0.12em',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'all 0.2s',
        cursor: hover ? 'pointer' : 'default',
        color: hover ? '#fff' : '#000',
        backgroundColor: hover ? '#000' : 'rgba(255, 255, 255, 0.63)',
        marginRight: 5,
        userSelect: 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => store.dispatch(toggleTask(id))}
    >
      {collapsed ? '+' : '-'}
    </a>
  )
}

const LabelIcon = ({ options }: { options: IconOptions }) => {
  if (isImage(options)) {
    return <img src={options.href} width={options.width} height={options.height} style={{ marginRight: 4, ...options.style }} />
  }

  return <Icon options={options} width={options.width} height={options.height} style={{ marginRight: 4 }} />
}

const Label = ({ label, height, idx, row, task }: { label: LabelOptions; height: number; idx: number; row: number; task: TaskOptions }) => {
  return (
    <div
      style={{
        height: height,
        paddingLeft: 4,
        paddingRight: 4,
        display: task.collapsed && row !== 0 ? 'none' : 'flex',
        alignItems: 'center',
        ...label.backgroundStyle
      }}
    >
      {idx === 0 && row === 0 && task.collapsible ? <CollapseButton id={task.id} collapsed={task.collapsed} /> : null}
      {!!label.icons
        ? (label.icons as IconOptions[])
            .filter((i) => !i.alignment || i.alignment == 'left')
            .map((l: IconOptions) => <LabelIcon options={l} />)
        : null}
      <div
        style={{
          display: 'inline-flex',
          ...label.alignmentStyle
        }}
      >
        <span
          style={{
            ...label.labelStyle
          }}
        >
          {label.label}
        </span>
      </div>

      {!!label.icons
        ? (label.icons as IconOptions[]).filter((i) => i.alignment == 'right').map((l: IconOptions) => <LabelIcon options={l} />)
        : null}
    </div>
  )
}

const LabelSection = ({ task, field, idx }: { task: TaskOptions; field: string; idx: number }) => {
  const store = useConfig()
  const eventBus = useEventBus()
  const state = store.state

  const eventTarget = useRef(null)

  Object.entries(state.events).forEach(([key, callback]) => {
    eventBus.useDomEvent(key, (e) => callback(e, task, eventBus.publish), eventTarget.current)
  })

  return (
    <div
      style={{
        borderTop: '2px solid black'
      }}
      ref={eventTarget}
    >
      {task.labels[field].map((label: LabelOptions, row: number) => (
        <Label label={label} height={task.heights[row]} idx={idx} row={row} task={task} />
      ))}
    </div>
  )
}

export const Column = ({
  column,
  gridRef,
  forwardedRef,
  idx
}: {
  column: ColumnOptions
  gridRef: RefObject<any>
  forwardedRef: Ref<any>
  idx: number
}) => {
  const store = useConfig()
  const state = store.state

  return (
    <div
      key={column.field}
      style={{
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          height: 30,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <span style={{ alignSelf: 'flex-end' }}>{column.text}</span>
      </div>
      <div
        className="column-sections"
        onWheel={(e) => {
          gridRef.current.scrollBy(0, e.deltaY)
        }}
        ref={forwardedRef}
        style={{
          display: 'flex',
          flexShrink: 0,
          flex: 1,
          overflow: 'hidden',
          flexDirection: 'column',
          whiteSpace: 'nowrap'
        }}
      >
        {state.tasks.map((task: TaskOptions) => (
          <LabelSection task={task} field={column.field} idx={idx} />
        ))}
        <div>
          <div style={{ height: 40 }}> </div>
        </div>
      </div>
    </div>
  )
}
