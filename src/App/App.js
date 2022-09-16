//
// Libraries
//
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
//
//  Pages
//
import QuizControl from '../pages/QuizControl'
//
//  Common Components
//
import Layout from '../components/Layout/Layout'
//
//  Utilities
//
import { ValtioStore } from '../pages/ValtioStore'
//
//  Layout Theme
//
const theme = createTheme({})
//
//  Server
//
const { SERVER_REMOTE } = require('../services/constants.js')
const { URL_REMOTE } = require('../services/constants.js')
const { SERVER_LOCAL_REMOTE } = require('../services/constants.js')
const { URL_LOCAL_REMOTE } = require('../services/constants.js')
const { SERVER_LOCAL } = require('../services/constants.js')
const { URL_LOCAL } = require('../services/constants.js')
//----------------------------------------------------------------------------
//- Main Line
//----------------------------------------------------------------------------
function App() {
  //
  //  Update Valtio store with URL and Server Name
  //
  let port = '9003'
  const windowport = window.location.port
  if (windowport) port = windowport
  console.log(`port(${port})`)
  //
  //  Update Valtio store with URL and Server Name - REMOTE
  //
  if (port === '9003') {
    ValtioStore.v_Server = SERVER_REMOTE
    ValtioStore.v_URL = URL_REMOTE
    console.log(
      `QuizClient-PORT(${port}) REMOTE: SERVER(${SERVER_REMOTE}) URL(${URL_REMOTE})`
    )
  }
  //
  //  Update Valtio store with URL and Server Name - LOCAL-->REMOTE
  //
  if (port === '9013') {
    ValtioStore.v_Server = SERVER_LOCAL_REMOTE
    ValtioStore.v_URL = URL_LOCAL_REMOTE
    console.log(
      `QuizClient-PORT(${port}) LOCAL: SERVER(${SERVER_LOCAL_REMOTE}) URL(${URL_LOCAL_REMOTE})`
    )
  }
  //
  //  Update Valtio store with URL and Server Name - LOCAL
  //
  if (port === '8003') {
    ValtioStore.v_Server = SERVER_LOCAL
    ValtioStore.v_URL = URL_LOCAL
    console.log(
      `QuizClient-PORT(${port}) LOCAL: SERVER(${SERVER_LOCAL}) URL(${URL_LOCAL})`
    )
  }
  //
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Layout>
            <QuizControl />
          </Layout>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
