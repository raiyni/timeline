import { Action, setData } from '../actions'
import { useEffect } from 'preact/hooks'


export const useProcessData = (dispatch: (_action: Action) => void, data: any[], config: any) => {
  useEffect(() => {
    dispatch(setData(data))
  }, [data, config])
}
