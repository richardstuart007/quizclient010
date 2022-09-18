//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizSplash = () => {
  if (debugLog) console.log('Start QuizSplash')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Grid container>
      <Container>
        <Typography variant='h6' sx={{ marginTop: '8px' }}>
          This product is in Trial/Development.
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          It has been developed by Richard Stuart and is FREE to use/distribute.
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          If your URL does not work try the ones below
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          <a href='https://richardstuart007.github.io/quizclientstatic010/'>
            Static version
          </a>
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          <a href='https://richardstuart007.github.io/quizclient010/'>
            Database Server Version
          </a>
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
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizRestart'
            }}
          />
        </Grid>
      </Container>
    </Grid>
  )
}

export default QuizSplash
