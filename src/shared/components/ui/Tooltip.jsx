import MuiTooltip from '@mui/material/Tooltip'

export function Tooltip({ arrow = true, enterDelay = 200, ...props }) {
  return <MuiTooltip arrow={arrow} enterDelay={enterDelay} {...props} />
}
