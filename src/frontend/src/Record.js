import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

const Record = ({ name, phone, ...props }) => {
  const classes = useStyles()

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell align="right">
        <IconButton
          size="small"
          className={classes.button}
          aria-label="Delete User"
          onClick={props.onDelete}>

          <DeleteIcon />
        </IconButton>

        <IconButton
          size="small"
          className={classes.button}
          aria-label="Edit User"
          color="primary"
          onClick={props.onEdit}>

          <CreateIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default Record
