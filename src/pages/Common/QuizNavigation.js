//
//  Libraries
//
import { Grid } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Icons
//
import RefreshIcon from '@mui/icons-material/Refresh'
import ScoreboardIcon from '@mui/icons-material/Scoreboard'
import HelpIcon from '@mui/icons-material/Help'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import MenuBookIcon from '@mui/icons-material/MenuBook'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import MyActionButton from '../../components/controls/MyActionButton'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex'
    }
  }
})
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function QuizNavigation({ handlePage, page }) {
  if (debugLog) console.log('Start QuizNavigation')
  const classes = useStyles()
  //
  //  Define
  //
  const CurrentPage = page
  if (debugLog) console.log('page ', page)
  //
  //  Show Signin Button ?
  //
  let showButtonSignin = false
  if (CurrentPage === 'QuizRegister') showButtonSignin = true
  //
  //  Show Register Button ?
  //
  let showButtonRegister = false
  if (CurrentPage === 'QuizSignin') showButtonRegister = true
  //
  //  Show  Restart Button ?
  //
  let showButtonRestart = false
  if (CurrentPage === 'QuizRefs' || CurrentPage === 'Quiz' || CurrentPage === 'QuizHistory' || CurrentPage === 'QuizReview')
    showButtonRestart = true
  //
  //  Show Review Button ?
  //
  let showButtonReview = false
  if (CurrentPage === 'Quiz') {
    showButtonReview = true
    // const Data_AnswersJSON = sessionStorage.getItem('Data_Answers')
    // const Data_Answers = JSON.parse(Data_AnswersJSON)
    // if (debugLog) console.log('CurrentPage ', CurrentPage)
    // if (debugLog) console.log('Data_Answers ', Data_Answers)
    // if (Data_Answers && Data_Answers.length > 0) showButtonReview = true
  }
  //
  //  Show Book Button ?
  //
  let showMenuBook = false
  const Data_ReflinksJSON = sessionStorage.getItem('Data_Reflinks')
  const Data_Reflinks = JSON.parse(Data_ReflinksJSON)

  if ((CurrentPage === 'Quiz' || CurrentPage === 'QuizReview') && Data_Reflinks[0] && Data_Reflinks.length > 0) showMenuBook = true
  //
  //  Show Settings Button ?
  //
  let showButtonSettings = JSON.parse(sessionStorage.getItem('Settings_v_ShowButtonSettings'))
  if (debugLog) console.log('showButtonSettings ', showButtonSettings)
  if (showButtonSettings) {
    showButtonSettings = false
    if (
      CurrentPage === 'Quiz' ||
      CurrentPage === 'QuizReview' ||
      CurrentPage === 'QuizRefs' ||
      CurrentPage === 'QuizSignin' ||
      CurrentPage === 'QuizRegister' ||
      CurrentPage === 'QuizServerData' ||
      CurrentPage === 'QuizSelect'
    )
      showButtonSettings = true
  }
  //
  //  Show History Button ?
  //
  let showButtonHistory = false
  if (CurrentPage === 'QuizSelect') showButtonHistory = true

  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {/* .......................................................................................... */}
        {showButtonSignin ? (
          <MyActionButton
            startIcon={<HelpIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizSignin')
            }}
            text='SignIn'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButtonRegister ? (
          <MyActionButton
            startIcon={<HelpIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizRegister')
            }}
            text='Register'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}

        {showButtonHistory ? (
          <MyActionButton
            startIcon={<ScoreboardIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizHistory')
            }}
            text='History'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}

        {showButtonReview ? (
          <MyActionButton
            startIcon={<ScoreboardIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizReview')
            }}
            text='Review'
          ></MyActionButton>
        ) : null}

        {/* .......................................................................................... */}
        {showMenuBook ? (
          <MyActionButton
            startIcon={<MenuBookIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizRefs')
            }}
            text='Learn'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButtonRestart ? (
          <MyActionButton
            startIcon={<RefreshIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizSelect')
            }}
            text='Restart'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButtonSettings ? (
          <MyActionButton
            startIcon={<SettingsApplicationsIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizSettings')
            }}
            text='Settings'
          ></MyActionButton>
        ) : null}
      </Grid>
    </div>
  )
}
