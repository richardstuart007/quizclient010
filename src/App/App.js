//
// Libraries
//
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useState } from 'react'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Pages
//
import QuizControl from '../pages/QuizControl'
//
//  Utilities
//
import writeHistory from '../services/writeHistory'
//
//  Common Components
//
import Layout from '../components/Layout/Layout'
//
//  Layout Theme
//
const theme = createTheme({})
//
//  Client
//
const { REMOTE_CLIENT } = require('../services/constants.js')
const { LOC_REMOTE_REMOTE_CLIENT } = require('../services/constants.js')
const { LOC_LOC_LOC_CLIENT } = require('../services/constants.js')
const { LOC_LOC_REMOTE_CLIENT } = require('../services/constants.js')
//
//  Server
//
const { REMOTE_SERVER } = require('../services/constants.js')
const { LOC_LOC_REMOTE_SERVER } = require('../services/constants.js')
const { LOC_LOC_LOC_SERVER } = require('../services/constants.js')
//
//  Database
//
const { REMOTE_DATABASE } = require('../services/constants.js')
const { LOC_LOC_LOC_DATABASE } = require('../services/constants.js')
//
//  URL
//
const { REMOTE_SERVERURL } = require('../services/constants.js')
const { LOC_LOC_REMOTE_SERVERURL } = require('../services/constants.js')
const { LOC_LOC_LOC_SERVERURL } = require('../services/constants.js')
//
// Debug Settings
//
const debugLog = debugSettings()
//
// Global
//
let g_firstTimeFlag = true
//----------------------------------------------------------------------------
//- Main Line
//----------------------------------------------------------------------------
function App() {
  if (debugLog) console.log(`Start APP`)
  const [pageCurrent, setPageCurrent] = useState('QuizSplash')
  //
  //  First Time Setup
  //
  if (g_firstTimeFlag) {
    g_firstTimeFlag = false
    firstTime()
  }
  //.............................................................................
  //  First Time Setup
  //.............................................................................
  function firstTime() {
    if (debugLog) console.log(`First Time APP Reset`)
    //------------------------------------------------------
    //  Set Defaults for REMOTE setup
    //------------------------------------------------------
    let port = '9003'
    let w_Client = REMOTE_CLIENT
    let w_Database = REMOTE_DATABASE
    let w_Server = REMOTE_SERVER
    let w_URL = REMOTE_SERVERURL
    //------------------------------------------------------
    //  Override LOCAL if Windows port (from package.json)
    //------------------------------------------------------
    const windowport = window.location.port
    if (windowport) {
      port = windowport
      //------------------------------------------------------
      //  9003 - Local Client --> Remote Server --> Remote Database
      //------------------------------------------------------
      if (port === '9003') {
        w_Client = LOC_REMOTE_REMOTE_CLIENT
        w_Server = REMOTE_SERVER
        w_Database = REMOTE_DATABASE
        w_URL = REMOTE_SERVERURL
      }
      //------------------------------------------------------
      //  9013 - Local Client --> Local Server --> Remote Database
      //------------------------------------------------------
      if (port === '9013') {
        w_Client = LOC_LOC_REMOTE_CLIENT
        w_Server = LOC_LOC_REMOTE_SERVER
        w_Database = REMOTE_DATABASE
        w_URL = LOC_LOC_REMOTE_SERVERURL
      }
      //------------------------------------------------------
      //  8003 - Local Client --> Local Server --> Local Database
      //------------------------------------------------------
      if (port === '8003') {
        w_Client = LOC_LOC_LOC_CLIENT
        w_Server = LOC_LOC_LOC_SERVER
        w_Database = LOC_LOC_LOC_DATABASE
        w_URL = LOC_LOC_LOC_SERVERURL
      }
    }
    //
    //  Store Client, Server, Database, URL
    //
    sessionStorage.setItem('Settings_Client', JSON.stringify(w_Client))
    sessionStorage.setItem('Settings_Server', JSON.stringify(w_Server))
    sessionStorage.setItem('Settings_Database', JSON.stringify(w_Database))
    sessionStorage.setItem('Settings_URL', JSON.stringify(w_URL))
    if (debugLog)
      console.log(
        `QuizClient-PORT(${port}) CLIENT(${w_Client}) SERVER(${w_Server}) DATABASE(${w_Database}) URL(${w_URL})`
      )
    //
    //  DevMode ?
    //
    let Settings_DevMode
    w_Client === REMOTE_CLIENT ? (Settings_DevMode = false) : (Settings_DevMode = true)
    sessionStorage.setItem('Settings_DevMode', Settings_DevMode)
    //
    //  Session Storage
    //
    sessionStorage.setItem('Settings_RandomSort', true)
    sessionStorage.setItem('Settings_ReviewSkipPass', true)
    sessionStorage.setItem('Settings_AllowSelection', true)
    sessionStorage.setItem('Settings_ShowQid', true)
    sessionStorage.setItem('Settings_ShowLinearProgress', true)
    sessionStorage.setItem('Settings_ShowLinearScore', true)
    sessionStorage.setItem('Settings_ShowSelectionGroup2', false)
    sessionStorage.setItem('Settings_ShowSelectionGroup3', false)
    sessionStorage.setItem('Settings_Page_Current', JSON.stringify('QuizSplash'))
    sessionStorage.setItem('Settings_Page_Previous', JSON.stringify(''))
    sessionStorage.setItem('Settings_Email', JSON.stringify(''))
    sessionStorage.setItem('Settings_Uid', JSON.stringify(0))
    sessionStorage.setItem('Settings_Name', JSON.stringify(''))
    sessionStorage.setItem('Settings_SignedIn', false)
    sessionStorage.setItem('Settings_Owner', JSON.stringify('NZBridge'))
    sessionStorage.setItem('Settings_Group1', JSON.stringify('NZBIMP01'))
    sessionStorage.setItem('Settings_Group2', JSON.stringify('All'))
    sessionStorage.setItem('Settings_Group3', JSON.stringify('All'))
    sessionStorage.setItem('Settings_MaxQuestions', JSON.stringify(5))
    sessionStorage.setItem('Quiz_Reset', true)
    //
    //  DevMode : Override Initial Values
    //
    if (Settings_DevMode) {
      sessionStorage.setItem('Settings_Owner', JSON.stringify('Richard'))
      sessionStorage.setItem('Settings_Group1', JSON.stringify('AndyRobson'))
      sessionStorage.setItem('Settings_Email', JSON.stringify('r@r.com'))
    }
  }
  //.............................................................................
  //.  Handle Page Change
  //.............................................................................
  const handlePage = nextPage => {
    //
    //  Retrieve the state
    //
    let PageCurrent = JSON.parse(sessionStorage.getItem('Settings_Page_Current'))
    //
    //  If no change of Page, return
    //
    if (nextPage === PageCurrent) return
    //
    //  Quiz End, write history
    //
    if (PageCurrent === 'Quiz') {
      writeHistory()
    }
    //
    //  Change of Page
    //
    if (debugLog) console.log(`Current Page ${PageCurrent} ==> New Page ${nextPage}`)
    //
    //  Update Previous Page
    //
    sessionStorage.setItem('Settings_Page_Previous', JSON.stringify(PageCurrent))
    if (debugLog)
      console.log(
        `UPDATED Settings_Page_Previous ${JSON.parse(
          sessionStorage.getItem('Settings_Page_Previous')
        )}`
      )
    //
    //  Update NEW Page
    //
    sessionStorage.setItem('Settings_Page_Current', JSON.stringify(nextPage))
    if (debugLog)
      console.log(
        `UPDATED Settings_Page_Current ${JSON.parse(
          sessionStorage.getItem('Settings_Page_Current')
        )}`
      )
    //
    //  Update State
    //
    setPageCurrent(nextPage)
  }
  //.............................................................................
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Layout handlePage={handlePage} pageCurrent={pageCurrent}>
            <QuizControl handlePage={handlePage} />
          </Layout>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
