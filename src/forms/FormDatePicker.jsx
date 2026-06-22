import { FormTextField } from './FormTextField'

export function FormDatePicker(props) {
  return <FormTextField {...props} type="date" InputLabelProps={{ shrink: true }} />
}
