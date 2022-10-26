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
  const PageCurrent = JSON.parse(sessionStorage.getItem('Settings_Page_Current'))
  const Settings_SignedIn = JSON.parse(sessionStorage.getItem('Settings_SignedIn'))
  //
  //  Show SignOut Button ?
  //
  let showButtonSignOut
  Settings_SignedIn ? (showButtonSignOut = true) : (showButtonSignOut = false)
  //
  //  Show  Restart Button ?
  //
  let showButtonRestart
  Settings_SignedIn &&
  PageCurrent !== 'QuizSelect' &&
  PageCurrent !== 'QuizReview' &&
  PageCurrent !== 'Quiz'
    ? (showButtonRestart = true)
    : (showButtonRestart = false)
  //
  //  Show Book Button ?
  //
  let showMenuBook = false
  let Data_Reflinks = []
  const Data_ReflinksJSON = sessionStorage.getItem('Data_Reflinks')
  if (Data_ReflinksJSON && Data_ReflinksJSON.length > 0)
    Data_Reflinks = JSON.parse(Data_ReflinksJSON)
  if (
    (PageCurrent === 'QuizReview' || PageCurrent === 'QuizHistoryDetail') &&
    Data_Reflinks[0] &&
    Data_Reflinks.length > 0
  )
    showMenuBook = true
  //
  //  Show Settings Button ?
  //
  let showButtonSettings
  Settings_SignedIn && PageCurrent !== 'QuizSettings'
    ? (showButtonSettings = true)
    : (showButtonSettings = false)
  //
  //  Show History Button ?
  //
  let showButtonHistory
  Settings_SignedIn && PageCurrent !== 'QuizHistory' && PageCurrent !== 'QuizHistoryDetail'
    ? (showButtonHistory = true)
    : (showButtonHistory = false)
  //
  //  Show RefLibrary Button ?
  //
  let showButtonRefLibrary
  Settings_SignedIn && PageCurrent !== 'RefLibrary'
    ? (showButtonRefLibrary = true)
    : (showButtonRefLibrary = false)
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {/* .......................................................................................... */}

        {showButtonRefLibrary ? (
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
            text='Quiz'
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
        {/* .......................................................................................... */}
        {showButtonSignOut ? (
          <MyActionButton
            startIcon={<LogoutIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              sessionStorage.setItem('Settings_SignedIn', false)
              handlePage('QuizSignin')
            }}
            text='Signout'
          ></MyActionButton>
        ) : null}
      </Grid>
    </div>
  )
}
