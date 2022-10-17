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
const { CLIENT_REMOTE } = require('../services/constants.js')
const { CLIENT_LOCAL } = require('../services/constants.js')
//
//  Server
//
const { SERVER_REMOTE } = require('../services/constants.js')
const { SERVER_LOCAL_REMOTE } = require('../services/constants.js')
const { SERVER_LOCAL } = require('../services/constants.js')
//
//  Database
//
const { DATABASE_REMOTE } = require('../services/constants.js')
const { DATABASE_LOCAL } = require('../services/constants.js')
//
//  URL
//
const { URL_REMOTE } = require('../services/constants.js')
const { URL_LOCAL_REMOTE } = require('../services/constants.js')
const { URL_LOCAL } = require('../services/constants.js')
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
  const [currentPage, setCurrentPage] = useState('QuizSplash')
  //.............................................................................
  //.  Handle Page Change
  //.............................................................................
  const handlePage = nextPage => {
    //
    //  If no change of Page, return
    //
    if (nextPage === currentPage) return
    //
    //  Quiz End, write history
    //
    if (currentPage === 'Quiz' && nextPage !== 'QuizRefs') {
      writeHistory()
    }
    //
    //  Change of Page
    //
    const CurrentPage = currentPage
    if (debugLog) console.log(`Current Page ${CurrentPage} ==> New Page ${nextPage}`)
    //
    //  Update Previous Page
    //
    sessionStorage.setItem('Settings_Page_Previous', JSON.stringify(CurrentPage))
    if (debugLog)
      console.log(
        `UPDATED PREVIOUS_Page ${JSON.parse(sessionStorage.getItem('Settings_Page_Previous'))}`
      )
    //
    //  Update NEW Page
    //
    sessionStorage.setItem('Settings_Page_Current', JSON.stringify(nextPage))
    if (debugLog)
      console.log(
        `UPDATED CURRENT_PAGE ${JSON.parse(sessionStorage.getItem('Settings_Page_Current'))}`
      )
    //
    //  Update State
    //
    setCurrentPage(nextPage)
  }
  //.............................................................................
  //
  //  First Time Setup
  //
  const firstTime = () => {
    if (debugLog) console.log(`First Time APP Reset`)
    //
    //  Update URL and Server Name
    //
    let w_Client = CLIENT_REMOTE
    let w_Database = DATABASE_REMOTE
    let w_Server
    let w_URL
    let port = '9003'
    const windowport = window.location.port
    if (windowport) port = windowport
    if (debugLog) console.log(`port(${port})`)
    //
    //  Update store with URL and Server Name - REMOTE
    //
    if (port === '9003') {
      w_Client = CLIENT_LOCAL
      w_Server = SERVER_REMOTE
      w_URL = URL_REMOTE
    }
    //
    //  Update store with URL and Server Name - LOCAL-->REMOTE
    //
    if (port === '9013') {
      w_Client = CLIENT_LOCAL
      w_Server = SERVER_LOCAL_REMOTE
      w_URL = URL_LOCAL_REMOTE
    }
    //
    //  Update store with URL and Server Name - LOCAL
    //
    if (port === '8003') {
      w_Client = CLIENT_LOCAL
      w_Server = SERVER_LOCAL
      w_Database = DATABASE_LOCAL
      w_URL = URL_LOCAL
    }
    //
    //  Store Client, Server, URL
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
    //  Session Storage
    //
    sessionStorage.setItem('Settings_RandomSort', true)
    sessionStorage.setItem('Settings_ReviewSkipPass', true)
    sessionStorage.setItem('Settings_AllowSelection', true)
    sessionStorage.setItem('Settings_ShowQid', true)
    sessionStorage.setItem('Settings_ShowInfo', false)
    sessionStorage.setItem('Settings_ShowLinearProgress', false)
    sessionStorage.setItem('Settings_ShowLinearScore', false)
    sessionStorage.setItem('Settings_ShowButtonSettings', true)
    sessionStorage.setItem('Settings_ShowSelectionOwner', true)
    sessionStorage.setItem('Settings_ShowSelectionGroup1', true)
    sessionStorage.setItem('Settings_ShowAllGroup1', false)
    let Settings_DevMode
    w_Client === CLIENT_REMOTE ? (Settings_DevMode = false) : (Settings_DevMode = true)
    sessionStorage.setItem('Settings_DevMode', Settings_DevMode)
    sessionStorage.setItem('Settings_ShowSelectionGroup2', false)
    sessionStorage.setItem('Settings_ShowSelectionGroup3', false)
    sessionStorage.setItem('Settings_Page_Current', JSON.stringify('QuizSplash'))
    sessionStorage.setItem('Settings_Page_Previous', JSON.stringify(''))
    sessionStorage.setItem('Settings_DataLoad', true)
    sessionStorage.setItem('Settings_Email', JSON.stringify(''))
    sessionStorage.setItem('Settings_Uid', JSON.stringify(0))
    sessionStorage.setItem('Settings_Name', JSON.stringify(''))
    sessionStorage.setItem('Settings_SignedIn', false)
    sessionStorage.setItem('Settings_Owner', JSON.stringify('NZBridge'))
    sessionStorage.setItem('Settings_Group1', JSON.stringify('NZBIMP01'))
    sessionStorage.setItem('Settings_Group2', JSON.stringify('All'))
    sessionStorage.setItem('Settings_Group3', JSON.stringify('All'))
    sessionStorage.setItem('Settings_MaxQuestions', 20)
    sessionStorage.setItem('Settings_Reset', true)
  }
  //.............................................................................
  //
  //  First Time Setup
  //
  if (g_firstTimeFlag) {
    g_firstTimeFlag = false
    firstTime()
  }
  //.............................................................................
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Layout handlePage={handlePage} currentPage={currentPage}>
            <QuizControl handlePage={handlePage} currentPage={currentPage} />
          </Layout>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
