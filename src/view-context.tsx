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
    return (
      <div style={{
        'background-color': props.over ? 'blue' : 'inherit'
      }}>
        {props[props.field]}
      </div>
    )
}

export const Row = (props: any) => {
  return (
    <div style={{
      backgroundColor: props.over ? 'blue' : 'inherit'
    }}
      onPointerOver={() => props.setOvers(props.idx, true)}
      onPointerOut={() => props.setOvers(props.idx, false)}
    >
      {props.text}
    </div>
  )
}

export function View(props: any) {
  const [state, setState] = useState({})

  const setOver = useCallback((idx, val) => {
    const obj = {
      ...state,
    }
    obj[idx] = val
    setState(obj)
  }, [])

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
              {defaultData.map((o, idx) => <Label key={idx}  field={c} {...o} idx={idx}  />)}
            </div>
          )
          })}

        <div>
        {defaultData.map((c, idx) => {
          return (
            <div>
              <Row key={idx} idx={idx} {...c} over={state[idx]} setOvers={setOver} />
            </div>
          )}
        )}
        </div>
      </div>
  )
}
