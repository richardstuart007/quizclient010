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
//  Common Components
//
import Layout from '../components/Layout/Layout'
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
  const [page, setPage] = useState('QuizSplash')
  //.............................................................................
  //.  Handle Page Change
  //.............................................................................
  const handlePage = newPage => {
    //
    //  Update State
    //
    const CurrentPage = page
    if (debugLog) console.log(`Current Page ${CurrentPage} ==> New Page ${newPage}`)
    setPage(newPage)
    //
    //  Update Previous Page
    //
    sessionStorage.setItem('Settings_v_PagePrevious', JSON.stringify(CurrentPage))
    if (debugLog) console.log(`UPDATED Previous Page ${JSON.parse(sessionStorage.getItem('Settings_v_PagePrevious'))}`)
    //
    //  Update NEW Page
    //
    sessionStorage.setItem('Settings_v_Page', JSON.stringify(newPage))
    if (debugLog) console.log(`UPDATED PAGE ${JSON.parse(sessionStorage.getItem('Settings_v_Page'))}`)
  }
  //.............................................................................
  //
  //  First Time Setup
  //
  const firstTime = () => {
    //
    //  Update URL and Server Name
    //
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
      w_Server = SERVER_REMOTE
      w_URL = URL_REMOTE
    }
    //
    //  Update store with URL and Server Name - LOCAL-->REMOTE
    //
    if (port === '9013') {
      w_Server = SERVER_LOCAL_REMOTE
      w_URL = URL_LOCAL_REMOTE
    }
    //
    //  Update store with URL and Server Name - LOCAL
    //
    if (port === '8003') {
      w_Server = SERVER_LOCAL
      w_URL = URL_LOCAL
    }
    //
    //  Store Server
    //
    const Settings_ServerJSON = JSON.stringify(w_Server)
    sessionStorage.setItem('Settings_Server', Settings_ServerJSON)
    //
    //  Store URL
    //
    const Settings_URLJSON = JSON.stringify(w_URL)
    sessionStorage.setItem('Settings_URL', Settings_URLJSON)
    if (debugLog) console.log(`QuizClient-PORT(${port}) LOCAL: SERVER(${w_Server}) URL(${w_URL})`)
    //
    //  Session Storage
    //
    sessionStorage.setItem('Settings_v_HideParams', false)
    sessionStorage.setItem('Settings_v_RandomSort', true)
    sessionStorage.setItem('Settings_v_ReviewSkipPass', true)
    sessionStorage.setItem('Settings_v_AllowSelection', true)
    sessionStorage.setItem('Settings_v_ShowQid', true)
    sessionStorage.setItem('Settings_v_ShowInfo', false)
    sessionStorage.setItem('Settings_v_ShowLinearProgress', false)
    sessionStorage.setItem('Settings_v_ShowLinearScore', false)
    sessionStorage.setItem('Settings_v_ShowButtonSettings', false)
    sessionStorage.setItem('Settings_v_ShowSelectionOwner', true)
    sessionStorage.setItem('Settings_v_ShowAllOwner', false)
    sessionStorage.setItem('Settings_v_ShowSelectionGroup1', true)
    sessionStorage.setItem('Settings_v_ShowAllGroup1', false)
    sessionStorage.setItem('Settings_v_ShowSelectionGroup2', false)
    sessionStorage.setItem('Settings_v_ShowSelectionGroup3', false)
    sessionStorage.setItem('Settings_v_Params', null)
    sessionStorage.setItem('Settings_v_Page', JSON.stringify('QuizSplash'))
    sessionStorage.setItem('Settings_v_PagePrevious', JSON.stringify(''))
    sessionStorage.setItem('Settings_v_DataLoad', true)
    sessionStorage.setItem('Settings_v_Email', JSON.stringify('t@t.com'))
    sessionStorage.setItem('Settings_v_Name', JSON.stringify('t'))
    sessionStorage.setItem('Settings_v_SignedIn', false)
    sessionStorage.setItem('Settings_v_Owner', JSON.stringify('NZBridge'))
    sessionStorage.setItem('Settings_v_Group1', JSON.stringify('NZBIMP01'))
    sessionStorage.setItem('Settings_v_Group2', JSON.stringify('All'))
    sessionStorage.setItem('Settings_v_Group3', JSON.stringify('All'))
    sessionStorage.setItem('Settings_v_MaxQuestions', 20)
    sessionStorage.setItem('Settings_v_Reset', true)
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
          <Layout handlePage={handlePage} page={page}>
            <QuizControl handlePage={handlePage} page={page} />
          </Layout>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
