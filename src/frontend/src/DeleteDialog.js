import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ButtonWithSpinner from './ButtonWithSpinner/Index'

import { destroyUser } from './actions/users'

const DeleteDialog = ({ onDeleted, deleteDialogOpen, setDeleteDialogOpen, deleteUser }) => {
  const [sending, setSending] = useState(false)

  const handleCancel = () => {
    setDeleteDialogOpen(false)
  }

  const handleDelete = () => {
    setSending(true)

    destroyUser(deleteUser.id).then(({ data: { success } }) => {
      if (success) {
        onDeleted(deleteUser.id)
      }

      setSending(false)
      setDeleteDialogOpen(false)
    }).catch(error => {
      setSending(false)
      alert(error)
    })
  }

  return (
    <Dialog open={deleteDialogOpen} onClose={handleCancel} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Delete user</DialogTitle>
      <DialogContent>
          <DialogContentText id="delete-dialog-description">
            This will delete user <strong>{deleteUser.name}</strong> forever.
          </DialogContentText>
        </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          disabled={sending}>

          Cancel
        </Button>
        <ButtonWithSpinner
          onClick={handleDelete}
          color="primary"
          loading={sending}
          disabled={sending}>

          Delete
        </ButtonWithSpinner>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
