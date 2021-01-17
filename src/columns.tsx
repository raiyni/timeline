import { Fragment, h } from 'preact'

import { Column } from './column';
import { ColumnOptions } from './types';

export const Columns = ({ columns }: { columns: ColumnOptions[] }) => {
  return (
    <Fragment>
      {columns.map(c => <Column column={c}/>)}
    </Fragment>
  )
}
