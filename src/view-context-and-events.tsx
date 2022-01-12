import { createContext, h } from 'preact'
import { useCallback, useContext, useEffect, useReducer, useState } from 'preact/hooks'

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

export const Config = createContext({
  data: [],
  dispatch: (_action: any) => {}
})


export const Label  = (props: any) => {
  const { data } = useContext(Config)
  const [state, setState] = useState(data[props.idx])

  const listener = useCallback((e) => {
    setState({
      ...state,
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
        {state[props.field]}
      </div>
    )
}

export const Row = ({ idx }: any) => {
  const { data } = useContext(Config)

  const [state, setState] = useState(data[idx])

  const sendOver = useCallback((idx, val) => {
    const event: any = new CustomEvent('task-' + idx, {
      detail: val
    });

    document.dispatchEvent(event);
    setState({
      ...state,
      over: val
    })
  }, [])

  return (
    <div style={{
      backgroundColor: state.over ? 'blue' : 'inherit'
    }}
      onPointerOver={() => sendOver(idx, true)}
      onPointerOut={() => sendOver(idx, false)}
    >
      {state.text}
    </div>
  )
}

export function View(props: any) {
  const [data, dispatch] = useReducer((state) => state, defaultData)

  const store = { data, dispatch }

  return (
    <Config.Provider value={store}>
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
              {data.map((o, idx) => <Label field={c} idx={idx}/>)}
            </div>
          )
          })}

        <div>
        {data.map((c, idx) => {
          return (
            <div>
              <Row idx={idx}  />
            </div>
          )}
        )}
        </div>
      </div>
    </Config.Provider>
  )
}
