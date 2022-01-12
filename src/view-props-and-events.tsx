import {  h } from 'preact'
import { useCallback,  useEffect, useState } from 'preact/hooks'

const cols = ['col1', 'col2']
const defaultData = [
  {
    text: 'abc',
    col1: '123',
    col2: '324'
  },
  {
    text: 'abc',
    col1: '123',
    col2: '324'
  },
  {
    text: 'abc',
    col1: '123',
    col2: '324'
  },
  {
    text: 'abc',
    col1: '123',
    col2: '324'
  },
  {
    text: 'abc',
    col1: '123',
    col2: '324'
  }
];


export const Label  = (props: any) => {
  const [state, setState] = useState({})

  const listener = useCallback((e) => {
    setState({
      over: e.detail
    })
  }, [])

  useEffect(() => {
    document.addEventListener('task-' + props.idx, listener)

    return () => {
      document.removeEventListener('task-' + props.idx, listener)
    }
  }, [])

    return (
      <div style={{
        'background-color': state.over ? 'blue' : 'inherit'
      }}>
        {props[props.field]}
      </div>
    )
}

export const Row = (props: any) => {
  const [rowState, setState] = useState(props)

  const sendOver = useCallback((idx, val) => {
    const event: any = new CustomEvent('task-' + idx, {
      detail: val
    });

    document.dispatchEvent(event);
    setState({
      ...rowState,
      over: val
    })
  }, [])

  return (
    <div style={{
      backgroundColor: rowState.over ? 'blue' : 'inherit'
    }}
      onPointerOver={() => sendOver(props.idx, true)}
      onPointerOut={() => sendOver(props.idx, false)}
    >
      {rowState.text}
    </div>
  )
}

export function View(props: any) {
  return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          'flex-direction': 'row',
          gap: '10px'
        }}
      >
        {cols.map((c) => {
          return (
            <div>
              {defaultData.map((o, idx) => <Label field={c} {...o} idx={idx}/>)}
            </div>
          )
          })}

        <div>
        {defaultData.map((c, idx) => {
          return (
            <div>
              <Row idx={idx} {...c} />
            </div>
          )}
        )}
        </div>
      </div>
  )
}
