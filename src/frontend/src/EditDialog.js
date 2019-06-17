import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import ButtonWithSpinner from './ButtonWithSpinner/Index'

import { updateUser } from './actions/users'
import FormFields from './FormFields'

const EditDialog = ({ onUpdate, editDialogOpen, setEditDialogOpen, editUser }) => {
  const [form, setValues] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [sending, setSending] = useState(false)

  // Set current editUser data
  useEffect(() => {
    setValues(editUser)
  }, [editUser])

  const handleCancel = () => {
    setEditDialogOpen(false)
    setFormErrors({})
    setValues(editUser)
  }

  const handleUpdate = () => {
    setSending(true)

    updateUser(form).then(({ data: { success, errors, result } }) => {
      if (success) {
        onUpdate(result)
        setFormErrors({})
        setEditDialogOpen(false)
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

  return (
    <Dialog open={editDialogOpen} onClose={handleCancel} aria-labelledby="edit-dialog-title">
      <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
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
          onClick={handleUpdate}
          color="primary"
          loading={sending}
          disabled={sending}>

          Update
        </ButtonWithSpinner>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
