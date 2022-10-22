//
//  Libraries
//
import { Container, Grid, Typography } from '@mui/material'
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
    <Grid container>
      <Container>
        <Typography variant='h6' sx={{ marginTop: '8px', color: 'blue' }}>
          DATABASE VERSION 010
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          This product has been developed by Richard Stuart and is FREE to use/distribute.
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          Any suggestions or problems email me at richardstuart007@hotmail.com
        </Typography>
        <Typography variant='h6' sx={{ marginTop: '8px', color: 'red' }}>
          Please click on the CONTINUE button below to REGISTER & SIGNIN
        </Typography>

        {/*.................................................................................................*/}
        <Grid item xs={12}>
          <MyButton
            type='submit'
            text='Continue'
            value='Submit'
            onClick={() => {
              handlePage('QuizSignin')
            }}
          />
        </Grid>
      </Container>
    </Grid>
  )
}
