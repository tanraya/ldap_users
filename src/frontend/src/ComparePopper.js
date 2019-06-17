import React, { Fragment } from 'react'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Progress from './Progress'
import ButtonWithSpinner from './ButtonWithSpinner/Index'

const FADE_TIMEOUT = 350

const ComparePopper = ({ arrowRef, anchorEl, isPopperOpen, closePopper, checking, synced, onSync, syncing, ...props }) => {
  let content = ''
  let actions = ''

  const title = synced
    ? 'Done'
    : 'Attention'

  const closeBtnCaption = synced
    ? 'Close'
    : 'Cancel'

  if (checking) {
    content = <Progress />
  } else {
    content = synced
      ? 'All users already synchronized with LDAP.'
      : 'Differences were found belween LDAP and local DB. Syncronize?'

    content = <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
  }

  const closeBtn = <Button onClick={closePopper}>{closeBtnCaption}</Button>
  const syncBtn = <ButtonWithSpinner
    loading={syncing}
    disabled={syncing}
    onClick={onSync}
    color="primary"
    autoFocus>Syncronize</ButtonWithSpinner>

  if (!checking) {
    if (synced) {
      actions = closeBtn
    } else {
      actions = <Fragment>
        {closeBtn}
        {syncBtn}
      </Fragment>
    }
  }

  return (
    <Popper
      transition
      placement="bottom"
      disablePortal={false}
      open={isPopperOpen}
      anchorEl={anchorEl}
      modifiers={{
        flip: {
          enabled: true,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent',
        }
      }}>

      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={FADE_TIMEOUT}>
          <Paper>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              {content}
            </DialogContent>
            <DialogActions>
              {actions}
            </DialogActions>
          </Paper>
        </Fade>
      )}

    </Popper>
  )
}

export default ComparePopper
