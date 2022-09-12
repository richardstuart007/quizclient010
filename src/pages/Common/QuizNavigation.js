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
//  Valtio Store
//
import { useSnapshot } from 'valtio'
import { ValtioStore } from '../../pages/ValtioStore'
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
const g_log1 = debugSettings()
//===================================================================================
export default function QuizNavigation() {
  const classes = useStyles()
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  //
  //  Show Refresh Button ?
  //
  let showButtonRefresh = false
  if (
    CurrentPage === 'QuizRefs' ||
    CurrentPage === 'Quiz' ||
    CurrentPage === 'QuizReview' ||
    (CurrentPage === 'QuizSelect' && !snapShot.v_StaticData)
  )
    showButtonRefresh = true
  //
  //  Show Review Button ?
  //
  if (g_log1) console.log('snapShot.v_Ans ', snapShot.v_Ans)
  let showButtonReview = false
  if (CurrentPage === 'Quiz' && snapShot.v_Ans.length > 0)
    showButtonReview = true
  //
  //  Show Help Button ?
  //
  const helpHyperlink = snapShot.v_Help
  let showButtonHelp = snapShot.v_ShowButtonHelp
  if (showButtonHelp) {
    showButtonHelp = false
    if (
      (CurrentPage === 'Quiz' || CurrentPage === 'QuizReview') &&
      helpHyperlink &&
      helpHyperlink !== 'None' &&
      helpHyperlink.length > 0
    )
      showButtonHelp = true
  }
  //
  //  Show Book Button ?
  //
  let showMenuBook = false
  const Refs = snapShot.v_QRefs
  if (
    (CurrentPage === 'Quiz' || CurrentPage === 'QuizReview') &&
    Refs[0] &&
    Refs.length > 0
  )
    showMenuBook = true
  //
  //  Show Settings Button ?
  //
  let showButtonSettings = snapShot.v_ShowButtonSettings
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
  //...................................................................................
  //
  //  Hyperlink open
  //
  const openHyperlink = linkRef => () => {
    if (g_log1) console.log('linkRef ', linkRef)
    //
    //  Find reference link
    //
    const links = snapShot.v_RefLinks
    const linkelement = links.find(link => link.rref === linkRef)
    //
    //  Reference found
    //
    if (linkelement) {
      if (g_log1) console.log('linkelement ', linkelement)
      //
      //  Link value
      //
      const hyperlink = linkelement.rlink
      if (hyperlink) {
        if (g_log1) console.log('hyperlink ', hyperlink)
        window.open(hyperlink, '_blank')
      }
    }
  }
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {/* .......................................................................................... */}
        {showButtonHelp ? (
          <MyActionButton
            startIcon={<HelpIcon fontSize='small' />}
            color='warning'
            onClick={openHyperlink(helpHyperlink)}
            text='Help'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}

        {showButtonReview ? (
          <MyActionButton
            startIcon={<ScoreboardIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizReview'
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
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizRefs'
            }}
            text='Learn'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButtonRefresh ? (
          <MyActionButton
            startIcon={<RefreshIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizRestart'
            }}
            text='Refresh'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButtonSettings ? (
          <MyActionButton
            startIcon={<SettingsApplicationsIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizSettings'
            }}
            text='Settings'
          ></MyActionButton>
        ) : null}
      </Grid>
    </div>
  )
}
