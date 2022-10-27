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
      background: 'white',
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
export default function Layout({ handlePage, pageCurrent, children }) {
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
  const PageCurrent = JSON.parse(sessionStorage.getItem('Nav_Page_Current'))
  let title
  if (debugLog) console.log('PageCurrent ', PageCurrent)
  if (debugLog) console.log('pageCurrent ', pageCurrent)
  let showUser_Settings_Name = true
  switch (PageCurrent) {
    case 'QuizSettings':
      title = 'Settings'
      break
    case 'QuizRegister':
      title = 'Register'
      showUser_Settings_Name = false
      break
    case 'QuizSignin':
      title = 'SignIn'
      showUser_Settings_Name = false
      break
    case 'QuizSplash':
      title = 'Splash'
      showUser_Settings_Name = false
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
      title = PageCurrent
      break
  }
  if (debugLog) console.log('title ', title)
  //
  //  Add clientserver
  //
  const ShowClientServer = JSON.parse(sessionStorage.getItem('App_Settings_DevMode'))
  const App_Settings_Client = JSON.parse(sessionStorage.getItem('App_Settings_Client'))
  const App_Settings_Server = JSON.parse(sessionStorage.getItem('App_Settings_Server'))
  const App_Settings_Database = JSON.parse(sessionStorage.getItem('App_Settings_Database'))
  const clientserver = `Client(${App_Settings_Client}) Server(${App_Settings_Server}) Database(${App_Settings_Database})`
  //
  //  Welcome User
  //
  let User_Settings_Name = ''
  const User_Settings_SignedIn = JSON.parse(sessionStorage.getItem('User_Settings_SignedIn'))
  if (User_Settings_SignedIn)
    User_Settings_Name = JSON.parse(sessionStorage.getItem('User_Settings_Name'))
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
            <Grid item>
              <Avatar className={classes.avatar} src={cards} />
            </Grid>
            {/* .......................................................................................... */}
            <Grid item>
              <Typography className={classes.title} sx={{ color: 'yellow' }}>
                {title}
              </Typography>
            </Grid>
            {/* .......................................................................................... */}
            {showUser_Settings_Name ? (
              <Grid item>
                <Typography
                  className={classes.welcome}
                  sx={{
                    display: { xs: 'none', sm: 'inline' },
                    color: 'red'
                  }}
                >
                  {User_Settings_Name}
                </Typography>
              </Grid>
            ) : null}
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
            <Grid item xs></Grid>

            {/* .......................................................................................... */}
            {ScreenMedium && <QuizNavigation handlePage={handlePage} />}
            {/* .......................................................................................... */}
          </Grid>
        </Toolbar>
      </AppBar>
      {/* .......................................................................................... */}
      {/* main content                          */}
      {/* .......................................................................................... */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {!ScreenMedium && <QuizNavigation handlePage={handlePage} />}
        {children}
      </div>
    </div>
  )
}
