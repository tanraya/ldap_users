import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Listing from './Listing'
import ActionBar from './ActionBar'
import ComparePopper from './ComparePopper'
import EditDialog from './EditDialog'
import DeleteDialog from './DeleteDialog'

import { allUsers, sortUsers, isSynced, sync } from './actions/users'
import Progress from './Progress'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const App = () => {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editUserId, setEditUserId] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [synced, setSynced] = useState(false)
  const [syncing, setSyncing] = useState(false)

  // Load user data when mount component
  useEffect(() => {
    setLoading(true)

    allUsers().then(({ data }) => {
      setUsers(sortUsers(data))
      setLoading(false)
    })
  }, [])

  // Add new user to state after successful create
  const onCreate = data => {
    setUsers(sortUsers([ ...users, data ]))
  }

  // Show user edit form
  const onEdit = userId => {
    setEditDialogOpen(true)
    setEditUserId(userId)
  }

  // Set updated user data to state
  const onUpdate = updatedUser => {
    setUsers(sortUsers(users.map(user => (
      user.id === updatedUser.id ? updatedUser : user
    ))))
  }

  // Show delete user confirmation dialog
  const onDelete = userId => {
    setDeleteDialogOpen(true)
    setDeleteUserId(userId)
  }

  // Remove deleted user from state
  const onDeleted = userId => {
    setUsers(sortUsers(users.filter(user => user.id !== userId)))
  }

  // Check differences between DB and LDAP users
  const onCompare = e => {
    e.preventDefault()

    setAnchorEl(anchorEl ? null : e.currentTarget)
    setChecking(true)

    isSynced().then(({ data: { synced } }) => {
      setSynced(synced)
      setChecking(false)
    })
  }

  // Sync users with LDAP
  const onSync = e => {
    e.preventDefault()

    setSyncing(true)

    sync().then(({ data: { synced } }) => {
      setSynced(synced)
      setSyncing(false)
    })
  }

  const closePopper = e => {
    e.preventDefault()
    setAnchorEl(null)
  }

  const isPopperOpen = Boolean(anchorEl)
  const editUser = users.find(user => user.id === editUserId) || {}
  const deleteUser = users.find(user => user.id === deleteUserId) || {}

  if (loading) {
    return <Progress />
  }

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            LDAP Users
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <ActionBar
            onCreate={onCreate}
            onCompare={onCompare} />

          <ComparePopper
            isPopperOpen={isPopperOpen}
            anchorEl={anchorEl}
            closePopper={closePopper}
            checking={checking}
            synced={synced}
            syncing={syncing}
            onSync={onSync} />

          <Listing
            users={users}
            onDelete={onDelete}
            onEdit={onEdit} />

          <EditDialog
            onUpdate={onUpdate}
            editDialogOpen={editDialogOpen}
            setEditDialogOpen={setEditDialogOpen}
            editUser={editUser} />

          <DeleteDialog
            onDeleted={onDeleted}
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            deleteUser={deleteUser} />
        </Paper>
      </main>
    </Fragment>
  )
}

export default App
