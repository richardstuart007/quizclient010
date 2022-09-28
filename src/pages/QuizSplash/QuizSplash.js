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
const QuizSplash = ({ handlePage }) => {
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
          This product is in Trial/Development.
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          It has been developed by Richard Stuart and is FREE to use/distribute.
        </Typography>
        <Typography variant='h6' sx={{ marginTop: '8px', color: 'red' }}>
          I will be at Congress this week, so come and say Hello
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          Alternatively email me at richardstuart007@hotmail.com
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

export default QuizSplash
