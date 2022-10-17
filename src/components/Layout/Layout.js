//
//  Libraries
//
import { Typography, AppBar, Toolbar, Avatar, Grid, CardMedia } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
//
//  Common Sub Components
//
import QuizNavigation from '../../pages/Common/QuizNavigation'
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
    clientserver: {
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
export default function Layout({ handlePage, currentPage, children }) {
  if (debugLog) console.log('Start Layout')
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
  if (debugLog) console.log('currentPage ', currentPage)
  let showWelcome = true
  switch (currentPage) {
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
    case 'QuizSplash':
      showWelcome = false
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
      title = currentPage
      break
  }
  //
  //  Add clientserver
  //
  const ShowClientServer = JSON.parse(sessionStorage.getItem('Settings_DevMode'))
  const Settings_Client = JSON.parse(sessionStorage.getItem('Settings_Client'))
  const Settings_Server = JSON.parse(sessionStorage.getItem('Settings_Server'))
  const Settings_Database = JSON.parse(sessionStorage.getItem('Settings_Database'))
  const clientserver = `Client(${Settings_Client}) Server(${Settings_Server}) Database(${Settings_Database})`
  //
  //  Welcome User
  //
  let Settings_Name = ''
  const Settings_SignedIn = JSON.parse(sessionStorage.getItem('Settings_SignedIn'))
  if (Settings_SignedIn) Settings_Name = JSON.parse(sessionStorage.getItem('Settings_Name'))
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      {/* .......................................................................................... */}
      {/* app bar                                         */}
      {/* .......................................................................................... */}
      <AppBar position='fixed' className={classes.appBar} elevation={0} color='primary'>
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
            {ShowClientServer ? (
              <Grid item>
                <Typography
                  className={classes.clientserver}
                  sx={{ display: { xs: 'none', sm: 'inline' } }}
                >
                  {clientserver}
                </Typography>
              </Grid>
            ) : null}
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
                  Welcome
                </Typography>
              </Grid>
            ) : null}
            {showWelcome ? (
              <Grid item>
                <Typography
                  className={classes.welcome}
                  sx={{
                    display: { xs: 'none', sm: 'inline' },
                    color: 'red'
                  }}
                >
                  {Settings_Name}
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
            {ScreenMedium && <QuizNavigation handlePage={handlePage} currentPage={currentPage} />}
            {/* .......................................................................................... */}
          </Grid>
        </Toolbar>
      </AppBar>
      {/* .......................................................................................... */}
      {/* main content                          */}
      {/* .......................................................................................... */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {!ScreenMedium && <QuizNavigation handlePage={handlePage} currentPage={currentPage} />}
        {children}
      </div>
    </div>
  )
}
