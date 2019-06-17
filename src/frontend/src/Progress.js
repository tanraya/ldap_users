import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Progress = ({ size = 40, color = 'primary', ...props }) => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: '15px',
    marginLeft: '15px',
  }

  return (
    <div style={style} className={props.className}>
      <CircularProgress size={size} color={color} />
    </div>
  )
}

export default Progress
