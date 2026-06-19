import MuiButton from '@mui/material/Button'

/** App-styled button — defaults: no elevation, no uppercase */
export function Button({ disableElevation = true, ...props }) {
  return <MuiButton disableElevation={disableElevation} {...props} />
}
