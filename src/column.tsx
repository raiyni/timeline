import { ColumnOptions, LabelOptions, TaskOptions } from './types';
import { Ref, h } from 'preact'

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

export const Column = ({ column, forwardedRef }: { column: ColumnOptions, forwardedRef: Ref<any>}) => {
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
        {state.tasks.map((task: TaskOptions) => <LabelSection task={task} field={column.field} />)}
        <div><div style={{height: 40}}> </div></div>
      </div>
    </div>
  )
}
