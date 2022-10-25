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
export default function QuizNavigation({ handlePage, currentPage }) {
  if (debugLog) console.log('Start QuizNavigation')
  const classes = useStyles()
  //
  //  Define
  //
  const CurrentPage = currentPage
  if (debugLog) console.log('currentPage ', currentPage)
  //
  //  Show SignOut Button ?
  //
  let showButtonSignOut = false
  if (
    CurrentPage !== 'QuizSignin' &&
    CurrentPage !== 'QuizRegister' &&
    CurrentPage !== 'QuizSplash'
  )
    showButtonSignOut = true
  //
  //  Show  Restart Button ?
  //
  let showButtonRestart = false
  if (
    CurrentPage === 'QuizRefs' ||
    CurrentPage === 'Quiz' ||
    CurrentPage === 'QuizHistory' ||
    CurrentPage === 'QuizHistoryDetail'
  )
    showButtonRestart = true
  //
  //  Show Book Button ?
  //
  let showMenuBook = false
  let Data_Reflinks = []
  const Data_ReflinksJSON = sessionStorage.getItem('Data_Reflinks')
  if (Data_ReflinksJSON && Data_ReflinksJSON.length > 0)
    Data_Reflinks = JSON.parse(Data_ReflinksJSON)
  if (debugLog) console.log('Data_ReflinksJSON ', Data_ReflinksJSON)
  if (debugLog) console.log('Data_Reflinks ', Data_Reflinks)
  if (
    (CurrentPage === 'Quiz' ||
      CurrentPage === 'QuizReview' ||
      CurrentPage === 'QuizHistoryDetail') &&
    Data_Reflinks[0] &&
    Data_Reflinks.length > 0
  )
    showMenuBook = true
  //
  //  Show Settings Button ?
  //
  let showButtonSettings = JSON.parse(sessionStorage.getItem('Settings_ShowButtonSettings'))
  if (debugLog) console.log('showButtonSettings ', showButtonSettings)
  if (showButtonSettings) {
    showButtonSettings = false
    if (CurrentPage === 'Quiz' || CurrentPage === 'QuizSelect') showButtonSettings = true
  }
  //
  //  Show History Button ?
  //
  let showButtonHistory = false
  if (CurrentPage === 'QuizSelect' || CurrentPage === 'QuizReview') showButtonHistory = true
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
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
