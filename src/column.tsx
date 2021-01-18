import { ColumnOptions, LabelOptions, TaskOptions } from './types';
import { Ref, h } from 'preact'

import { toggleTask } from './actions';
import { useConfig } from './util/useConfig';
import { useState } from 'preact/hooks';

const CollapseButton = ({collapsed, id} : {collapsed: boolean, id: string}) => {
  const store = useConfig()
  const [hover, setHover] = useState(false)
  return (
    <a style={{
      width: 20,
      display: 'inline-block',
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

const Label = ({ label, height, idx, row, task }: {label: LabelOptions, height: number, idx: number, row: number, task: TaskOptions}) => {
  return (
    <div style={{
      height: height,
      paddingLeft: 4,
      paddingRight: 4,
      display: task.collapsed && row !== 0 ? 'none' : 'flex',
      alignItems: 'center',
      ...label.backgroundStyle,
    }}>
      {idx === 0 && row === 0 && task.collapsible ? <CollapseButton id={task.id} collapsed={task.collapsed}/> : null}
      <span style={{
        ...label.labelStyle
      }}>{label.label}</span>
    </div>
  )
}

const LabelSection = ({ task, field, idx }: {task: TaskOptions, field: string, idx: number}) => {
  return (
    <div style={{
      borderTop: '2px solid black'
    }}>
      {task.labels[field].map((label: LabelOptions, row: number) => <Label label={label} height={task.heights[row]} idx={idx} row={row} task={task}/>)}
    </div>
  )
}

export const Column = ({ column, forwardedRef, idx }: { column: ColumnOptions, forwardedRef: Ref<any>, idx: number}) => {
  const store = useConfig()
  const state = store.state

  return (
    <div key={column.field} style={{
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column'
    }}>
      <div style={{
        height: 30,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <span style={{alignSelf: 'flex-end'}}>{column.text}</span>
      </div>
      <div className="colum-sections" ref={forwardedRef} style={{
        display: 'flex',
        flexShrink: 0,
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'column',
        whiteSpace: 'nowrap'
      }}>
        {state.tasks.map((task: TaskOptions) => <LabelSection task={task} field={column.field} idx={idx}/>)}
        <div><div style={{height: 40}}> </div></div>
      </div>
    </div>
  )
}
