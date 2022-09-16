//
//  Libraries
//
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//=====================================================================================
export default function MySelect(props) {
  if (debugLog) console.log('Start MySelect')

  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    ...other
  } = props
  if (debugLog) console.log('props ', props)
  if (debugLog) console.log('options ', options)
  return (
    <FormControl variant='outlined' {...(error && { error: true })} {...other}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
      >
        {options.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
