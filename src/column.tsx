import { ColumnOptions, LabelOptions, TaskOptions } from './types';

import { h } from 'preact'
import { useConfig } from './util/useConfig';

const Label = ({ label, height }: {label: LabelOptions, height: number}) => {
  return (
    <div style={{
      height: height,
      paddingLeft: 4,
      paddingRight: 4,
      display: 'flex',
      alignItems: 'center',
      ...label.backgroundStyle
    }}>
      <span style={{
        ...label.labelStyle
      }}>{label.label}</span>
    </div>
  )
}

const LabelSection = ({ task, field }: {task: TaskOptions, field: string}) => {
  return (
    <div style={{
      borderTop: '2px solid black'
    }}>
      {task.labels[field].map((label: LabelOptions, idx: number) => <Label label={label} height={task.heights[idx]} />)}
    </div>
  )
}

export const Column = ({ column }: { column: ColumnOptions}) => {
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
      <div style={{
        display: 'flex',
        flexShrink: 0,
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'column',
        whiteSpace: 'nowrap'
      }}>
        {state.tasks.map((task: TaskOptions) => <LabelSection task={task} field={column.field} />)}
      </div>
    </div>
  )
}
