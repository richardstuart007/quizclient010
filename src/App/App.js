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
    sessionStorage.setItem('App_Settings_Client', JSON.stringify(w_Client))
    sessionStorage.setItem('App_Settings_Server', JSON.stringify(w_Server))
    sessionStorage.setItem('App_Settings_Database', JSON.stringify(w_Database))
    sessionStorage.setItem('App_Settings_URL', JSON.stringify(w_URL))
    if (debugLog)
      console.log(
        `QuizClient-PORT(${port}) CLIENT(${w_Client}) SERVER(${w_Server}) DATABASE(${w_Database}) URL(${w_URL})`
      )
    //
    //  DevMode ?
    //
    let App_Settings_DevMode
    w_Client === REMOTE_CLIENT ? (App_Settings_DevMode = false) : (App_Settings_DevMode = true)
    sessionStorage.setItem('App_Settings_DevMode', App_Settings_DevMode)
    //
    //  Navigation
    //
    sessionStorage.setItem('Nav_Page_Current', JSON.stringify('QuizSplash'))
    sessionStorage.setItem('Nav_Page_Previous', JSON.stringify(''))
    //
    //  SignedIn Status
    //
    sessionStorage.setItem('User_Settings_Email', JSON.stringify(''))
    sessionStorage.setItem('User_Settings_Uid', JSON.stringify(0))
    sessionStorage.setItem('User_Settings_Name', JSON.stringify(''))
    sessionStorage.setItem('User_Settings_SignedIn', false)
    //
    //  QuizSelect
    //
    sessionStorage.setItem('QuizSelect_ShowSelectionGroup2', false)
    sessionStorage.setItem('QuizSelect_ShowSelectionGroup3', false)
    //
    //  BuildQuizData
    //
    sessionStorage.setItem('BuildQuizData_RandomSort', true)
    sessionStorage.setItem('BuildQuizData_MaxQuestions', JSON.stringify(5))
    //
    //  Quiz
    //
    sessionStorage.setItem('Quiz_Reset', true)
    sessionStorage.setItem('Quiz_Select_Owner', JSON.stringify('NZBridge'))
    sessionStorage.setItem('Quiz_Select_Group1', JSON.stringify('NZBIMP01'))
    sessionStorage.setItem('Quiz_Select_Group2', JSON.stringify('All'))
    sessionStorage.setItem('Quiz_Select_Group3', JSON.stringify('All'))
    //
    //  QuizSettings
    //
    sessionStorage.setItem('Quiz_ShowQid', true)
    sessionStorage.setItem('Quiz_ShowLinearProgress', true)
    sessionStorage.setItem('Quiz_ShowLinearScore', true)
    //
    //  QuizReview
    //
    sessionStorage.setItem('QuizReview_SkipPass', true)
    //
    //  QuizHistory
    //
    sessionStorage.setItem('QuizHistory_Reset', true)
    sessionStorage.setItem('QuizHistory_SearchValue', JSON.stringify(''))
    sessionStorage.setItem('QuizHistory_SearchType', JSON.stringify('g1title'))
    //
    //  DevMode : Override Initial Values
    //
    if (App_Settings_DevMode) {
      sessionStorage.setItem('Quiz_Select_Owner', JSON.stringify('Richard'))
      sessionStorage.setItem('Quiz_Select_Group1', JSON.stringify('AndyRobson'))
      sessionStorage.setItem('User_Settings_Email', JSON.stringify('r@r.com'))
    }
  }
  //.............................................................................
  //.  Handle Page Change
  //.............................................................................
  const handlePage = nextPage => {
    //
    //  Retrieve the state
    //
    let PageCurrent = JSON.parse(sessionStorage.getItem('Nav_Page_Current'))
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
    sessionStorage.setItem('Nav_Page_Previous', JSON.stringify(PageCurrent))
    if (debugLog)
      console.log(
        `UPDATED Nav_Page_Previous ${JSON.parse(sessionStorage.getItem('Nav_Page_Previous'))}`
      )
    //
    //  Update NEW Page
    //
    sessionStorage.setItem('Nav_Page_Current', JSON.stringify(nextPage))
    if (debugLog)
      console.log(
        `UPDATED Nav_Page_Current ${JSON.parse(sessionStorage.getItem('Nav_Page_Current'))}`
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
