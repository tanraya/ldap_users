import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Record from './Record'

const useStyles = makeStyles(() => ({
  listing: {
    width: '100%',
  },
}))

const Listing = ({ users, onDelete, onEdit }) => {
  const renderRecords = () => {
    return users.map(user => (
      <Record
        onDelete={() => onDelete(user.id)}
        onEdit={() => onEdit(user.id)}
        key={user.id}
        {...user} />
    ))
  }

  const classes = useStyles()

  return (
    <Table className={classes.listing} size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderRecords()}
      </TableBody>
    </Table>
  )
}

export default Listing
