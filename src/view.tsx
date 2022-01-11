import { h } from 'preact'
import {  useReducer } from 'preact/hooks'
import { ProplessColumn } from './proplessColumn'
import { ProplessContainer } from './proplessContainer'
import { Config, DEFAULT_STATE, reducer } from './store'
import { useProcessData } from './util/useProcessData'

const cols = [
  'col1', 'col2'
]


export function View({ data, config }: any) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
  const store = { state, dispatch }

  useProcessData(dispatch, data, config)

  return (
    <Config.Provider value={store}>
      <div
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          display: 'flex',
          'flex-direction': 'row',
          'align-items': 'stretch',
          overflow: 'hidden',
          'background-color': 'white',
          'gap': '10px'
        }}
      >
        {cols.map(c => <ProplessColumn field={c} key={c} />)}
        <ProplessContainer />
      </div>
    </Config.Provider>
  )
}
