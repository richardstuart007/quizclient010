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
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LogoutIcon from '@mui/icons-material/Logout'
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
export default function QuizNavigation({ handlePage }) {
  if (debugLog) console.log('Start QuizNavigation')
  const classes = useStyles()
  //
  //  Define
  //
  const PageCurrent = JSON.parse(sessionStorage.getItem('Nav_Page_Current'))
  const User_Settings_SignedIn = JSON.parse(sessionStorage.getItem('User_Settings_SignedIn'))
  //
  //  Show SignOut Button ?
  //
  let showButton_Signin
  User_Settings_SignedIn ? (showButton_Signin = true) : (showButton_Signin = false)
  //
  //  Show  Restart Button ?
  //
  let showButton_QuizSelect
  User_Settings_SignedIn &&
  PageCurrent !== 'QuizSelect' &&
  PageCurrent !== 'QuizReview' &&
  PageCurrent !== 'Quiz'
    ? (showButton_QuizSelect = true)
    : (showButton_QuizSelect = false)
  //
  //  Show Book Button ?
  //
  let showButton_QuizRefs = false
  let Data_Reflinks = []
  const Data_ReflinksJSON = sessionStorage.getItem('Data_Reflinks')
  if (Data_ReflinksJSON && Data_ReflinksJSON.length > 0)
    Data_Reflinks = JSON.parse(Data_ReflinksJSON)
  if (
    (PageCurrent === 'QuizReview' || PageCurrent === 'QuizHistoryDetail') &&
    Data_Reflinks[0] &&
    Data_Reflinks.length > 0
  )
    showButton_QuizRefs = true
  //
  //  Show Settings Button ?
  //
  let showButton_UsersSettings
  User_Settings_SignedIn && PageCurrent !== 'UsersSettings'
    ? (showButton_UsersSettings = true)
    : (showButton_UsersSettings = false)
  //
  //  Show History Button ?
  //
  let showButton_QuizHistory
  User_Settings_SignedIn &&
  PageCurrent !== 'QuizHistory' &&
  PageCurrent !== 'QuizHistoryDetail' &&
  PageCurrent !== 'Quiz'
    ? (showButton_QuizHistory = true)
    : (showButton_QuizHistory = false)
  //
  //  Show RefLibrary Button ?
  //
  let showButton_RefLibrary
  User_Settings_SignedIn && PageCurrent !== 'RefLibrary' && PageCurrent !== 'Quiz'
    ? (showButton_RefLibrary = true)
    : (showButton_RefLibrary = false)
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {/* .......................................................................................... */}

        {showButton_RefLibrary ? (
          <MyActionButton
            startIcon={<ScoreboardIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('RefLibrary')
            }}
            text='Library'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}

        {showButton_QuizHistory ? (
          <MyActionButton
            startIcon={<ScoreboardIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              sessionStorage.setItem('QuizHistory_Reset', true)
              handlePage('QuizHistory')
            }}
            text='History'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButton_QuizRefs ? (
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
        {showButton_QuizSelect ? (
          <MyActionButton
            startIcon={<RefreshIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('QuizSelect')
            }}
            text='Quiz'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButton_UsersSettings ? (
          <MyActionButton
            startIcon={<SettingsApplicationsIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              handlePage('UsersSettings')
            }}
            text='Settings'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButton_Signin ? (
          <MyActionButton
            startIcon={<LogoutIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              sessionStorage.setItem('User_Settings_SignedIn', false)
              handlePage('QuizSignin')
            }}
            text='Signout'
          ></MyActionButton>
        ) : null}
      </Grid>
    </div>
  )
}
