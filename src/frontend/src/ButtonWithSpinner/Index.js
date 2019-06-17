import React from 'react'
import Button from '@material-ui/core/Button'
import SpinnerAdornment from './SpinnerAdornment'

const ButtonWithSpinner = ({ children, loading = false, ...props }) => (
  <Button {...props}>
    {children}
    {loading && <SpinnerAdornment {...props} />}
  </Button>
)

export default ButtonWithSpinner
