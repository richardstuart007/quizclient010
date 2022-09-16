//
//  Libraries
//
import { TextField } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//=====================================================================================
export default function MyInput(props) {
  if (debugLog) console.log('Start MyInput')
  //
  //  Deconstruct
  //
  const { name, label, value, error = null, onChange, ...other } = props
  if (debugLog) console.log('props: ', props)
  //
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
