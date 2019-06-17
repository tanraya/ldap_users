import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CompareArrows from '@material-ui/icons/CompareArrows'

import CreateDialog from './CreateDialog'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    float: 'right'
  },
  button: {
    margin: theme.spacing(1),
  },
  iconClass: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
}))

const ActionBar = ({ onCreate, onCompare, ...props }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        size="small"
        className={classes.button}
        onClick={onCompare}>

        <CompareArrows className={classes.iconClass} />

        Compare
      </Button>

      <CreateDialog
        onCreate={onCreate} />
    </div>
  )
}

export default ActionBar
