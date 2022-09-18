//
//  Libraries
//
import {
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Grid,
  CardMedia
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSnapshot } from 'valtio'
//
//  Common Sub Components
//
import QuizNavigation from '../../pages/Common/QuizNavigation'
//
//  Utilities
//
import { ValtioStore } from '../../pages/ValtioStore'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import cards from '../../assets/images/cards.svg'
import Ukraine from '../../assets/images/Ukraine.svg'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    page: {
      background: 'whitesmoke',
      width: '100%',
      padding: theme.spacing(1)
    },
    root: {
      display: 'flex'
    },
    title: {
      marginLeft: theme.spacing(2)
    },
    server: {
      marginLeft: theme.spacing(2)
    },
    welcome: {
      marginLeft: theme.spacing(2)
    },
    appBar: {
      background: 'green',
      width: '100%'
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function Layout({ children }) {
  if (debugLog) console.log('Start Layout')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Style overrides
  //
  const classes = useStyles()
  //
  //  Screen Width
  //
  const theme = useTheme()
  const ScreenMedium = useMediaQuery(theme.breakpoints.up('sm'))
  //
  //  Title
  //
  let title
  const CurrentPage = snapShot.v_Page
  let showWelcome = true

  switch (CurrentPage) {
    case 'QuizSettings':
      title = 'Settings'
      break
    case 'QuizRegister':
      title = 'Register'
      showWelcome = false
      break
    case 'QuizSignin':
      title = 'SignIn'
      showWelcome = false
      break
    case 'QuizServerData':
      title = 'Get Server Data'
      break
    case 'QuizSelect':
      title = 'Selection'
      break
    case 'QuizRefs':
      title = 'References'
      break
    case 'Quiz':
      title = 'Quiz'
      break
    case 'QuizReview':
      title = 'Review'
      break
    default:
      title = CurrentPage
      break
  }
  //
  //  Add server
  //
  const server = `(Server:${snapShot.v_Server})`
  //
  //  User
  //
  const welcome = `Welcome ${snapShot.v_Name}`
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      {/* .......................................................................................... */}
      {/* app bar                                         */}
      {/* .......................................................................................... */}
      <AppBar
        position='fixed'
        className={classes.appBar}
        elevation={0}
        color='primary'
      >
        <Toolbar>
          <Grid container alignItems='center'>
            {/* .......................................................................................... */}
            <Grid item>
              <Avatar className={classes.avatar} src={cards} />
            </Grid>
            {/* .......................................................................................... */}
            <Grid item>
              <Typography className={classes.title}>{title}</Typography>
            </Grid>
            {/* .......................................................................................... */}
            <Grid item>
              <Typography
                className={classes.server}
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                {server}
              </Typography>
            </Grid>
            {/* .......................................................................................... */}
            {showWelcome ? (
              <Grid item>
                <Typography
                  className={classes.welcome}
                  sx={{
                    display: { xs: 'none', sm: 'inline' },
                    color: 'yellow'
                  }}
                >
                  {welcome}
                </Typography>
              </Grid>
            ) : null}
            {/* .......................................................................................... */}
            <Grid item xs></Grid>
            {/* .......................................................................................... */}
            <Grid>
              <CardMedia
                component='img'
                sx={{
                  width: 30,
                  height: 30
                }}
                image={Ukraine}
                alt=''
              />
            </Grid>
            {/* .......................................................................................... */}
            {ScreenMedium && <QuizNavigation />}
            {/* .......................................................................................... */}
          </Grid>
        </Toolbar>
      </AppBar>
      {/* .......................................................................................... */}
      {/* main content                          */}
      {/* .......................................................................................... */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {!ScreenMedium && <QuizNavigation />}
        {children}
      </div>
    </div>
  )
}
