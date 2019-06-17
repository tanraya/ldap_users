import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'

const formMeta = [
  {
    name: 'name',
    label: 'Name',
    autoFocus: true,
    autoComplete: 'on',
  }, {
    name: 'phone',
    label: 'Phone',
    autoFocus: false,
    autoComplete: 'on',
  }, {
    name: 'password',
    label: 'Password',
    autoFocus: false,
    autoComplete: 'off',
  }
]

const FormFields = ({ handleChange, form, errors }) => {
  const renderErrors = fieldName => errors[fieldName] &&
    errors[fieldName].map((error, i) => <span key={i}>{error}<br/></span>)

  return (
    <Fragment>
      {formMeta.map(({ name, label, autoFocus, autoComplete }) => (
        <TextField
          key={name}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          margin="dense"
          name={name}
          label={label}
          type="text"
          variant="outlined"
          onChange={handleChange}
          value={form[name]}
          error={!!errors[name]}
          helperText={renderErrors(name)}
          fullWidth />
      ))}
    </Fragment>
  )
}

export default FormFields
