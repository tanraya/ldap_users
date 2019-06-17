import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import SaveIcon from '@material-ui/icons/Save'
import ButtonWithSpinner from './ButtonWithSpinner/Index'

import { createUser } from './actions/users'
import FormFields from './FormFields'

const useStyles = makeStyles(theme => ({
  iconClass: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
}))

const formInitialState = {
  name: '',
  phone: '',
  password: '',
}

const CreateDialog = ({ onCreate }) => {
  const [open, setOpen] = useState(false)
  const [form, setValues] = useState(formInitialState)
  const [formErrors, setFormErrors] = useState({})
  const [sending, setSending] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setValues(formInitialState)
    setFormErrors({})
    setOpen(false)
  }

  const handleCreate = () => {
    setSending(true)

    createUser(form).then(({ data: { success, errors, result } }) => {
      if (success) {
        onCreate(result)
        setFormErrors({})
        setOpen(false)
      } else {
        setFormErrors(errors)
      }

      setSending(false)
    }).catch(error => {
      setSending(false)
      alert(error)
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...form, [name]: value })
  }

  const classes = useStyles()

  return (
    <Fragment>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleOpen}>

        <SaveIcon className={classes.iconClass} />

        New User
      </Button>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="create-dialog-title">
        <DialogTitle id="create-dialog-title">Create New User</DialogTitle>
        <DialogContent>
          <FormFields
            handleChange={handleChange}
            form={form}
            errors={formErrors} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            disabled={sending}>

            Cancel
          </Button>
          <ButtonWithSpinner
            onClick={handleCreate}
            color="primary"
            loading={sending}
            disabled={sending}>

            Create
          </ButtonWithSpinner>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default CreateDialog
