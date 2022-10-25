//
//  Libraries
//
import { Typography, Box } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function QuizSplash({ handlePage }) {
  if (debugLog) console.log('Start QuizSplash')
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Box sx={{ mt: 2, maxWidth: 600 }}>
        <Typography variant='h6' sx={{ color: 'blue' }}>
          DATABASE VERSION 010
        </Typography>
      </Box>

      <Box sx={{ mt: 2, maxWidth: 600 }}>
        <Typography variant='subtitle2'>
          This product has been developed by Richard Stuart and is FREE to use/distribute.
        </Typography>
      </Box>

      <Box sx={{ mt: 2, maxWidth: 600 }}>
        <Typography variant='subtitle2'>
          Any suggestions or problems email me at richardstuart007@hotmail.com
        </Typography>
      </Box>

      <Box sx={{ mt: 2, maxWidth: 600 }}>
        <Typography variant='h6' sx={{ color: 'red' }}>
          Please click the button below to REGISTER & SIGNIN
        </Typography>
      </Box>

      {/*.................................................................................................*/}
      <Box sx={{ mt: 2, maxWidth: 600 }}>
        <MyButton
          type='submit'
          text='Continue'
          value='Submit'
          onClick={() => {
            handlePage('QuizSignin')
          }}
        />
      </Box>
    </>
  )
}
