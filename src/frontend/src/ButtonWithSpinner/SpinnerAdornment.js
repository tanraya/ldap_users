import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Progress from '../Progress'

const withStylesProps = styles => {
  return Component => {
    const result = props => {
      const Comp = withStyles(styles(props))(Component)
      return <Comp {...props} />
    }

    return result
  }
}

const styles = props => theme => {
  let color = (props.variant && props.variant === 'raised')
    ? theme.palette[props.color].main
    : '#ffffff'

  let contrastColor = theme.palette.getContrastText(color)

  return {
    spinner: {
      color: contrastColor,
      marginLeft: '10px'
    }
  }
}

export default withStylesProps(styles)(
  props => (
    <Progress
      className={props.classes.spinner}
      color="inherit"
      size={20}
    />
  )
)
