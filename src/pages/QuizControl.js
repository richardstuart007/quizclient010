//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Sub Components
//
import QuizSettings from './QuizSettings/QuizSettings'
import QuizSplash from './QuizSplash/QuizSplash'
import QuizRegister from './QuizRegister/QuizRegister'
import QuizSignin from './QuizSignin/QuizSignin'
import QuizServerData from './QuizServerData/QuizServerData'
import QuizSelect from './QuizSelect/QuizSelect'
import Quiz from './Quiz/Quiz'
import QuizReview from './QuizReview/QuizReview'
import QuizHistory from './QuizHistory/QuizHistory'
import QuizRefs from './QuizRefs/QuizRefs'
//
//  Utilities
//
import { ValtioStore } from './ValtioStore'
//
// Debug Settings
//
const debugLog = debugSettings(true)
//
//  Global Variables
//
let g_Params
let g_HideParams
let g_Page
let g_DataLoad
let g_SignedIn
//===================================================================================
function QuizControl({ handlePage, page }) {
  if (debugLog) console.log('Start QuizControl')
  //.............................................................................
  //.  Unpack Parameters
  //.............................................................................
  const UnpackParams = () => {
    if (debugLog) console.log('Get Parameters')
    //
    //  Set Params Load already done
    //
    g_Params = false
    ValtioStore.v_Params = g_Params
    //
    //  Get Query string of Parameters
    //
    const queryString = window.location.search
    if (debugLog) console.log('queryString ', queryString)
    if (!queryString) return
    //
    //  Update the Store
    //
    if (debugLog) console.log('Has Parameters')
    g_Params = true
    ValtioStore.v_Params = g_Params

    const urlParams = new URLSearchParams(queryString)
    //..............................
    //.  Dev Mode
    //..............................
    const Devmode = urlParams.get('Devmode')
    if (Devmode) {
      if (Devmode === 'true') {
        ValtioStore.v_ShowButtonSettings = true
        ValtioStore.v_ShowSelectionOwner = true
        ValtioStore.v_ShowSelectionGroup1 = true
        ValtioStore.v_ShowSelectionGroup2 = true
        ValtioStore.v_ShowSelectionGroup3 = true
        sessionStorage.setItem('Settings_v_ShowInfo', true)
      }
    }
    //..............................
    //.  Show Overrides
    //..............................
    const ShowButtonSettings = urlParams.get('ShowButtonSettings')
    if (ShowButtonSettings && ShowButtonSettings === 'true') ValtioStore.v_ShowButtonSettings = true

    const ShowSelectionOwner = urlParams.get('ShowSelectionOwner')
    if (ShowSelectionOwner && ShowSelectionOwner === 'true') ValtioStore.v_ShowSelectionOwner = true

    const ShowSelectionGroup1 = urlParams.get('ShowSelectionGroup1')
    if (ShowSelectionGroup1 && ShowSelectionGroup1 === 'true') ValtioStore.v_ShowSelectionGroup1 = true

    const ShowSelectionGroup2 = urlParams.get('ShowSelectionGroup2')
    if (ShowSelectionGroup2 && ShowSelectionGroup2 === 'true') ValtioStore.v_ShowSelectionGroup2 = true

    const ShowSelectionGroup3 = urlParams.get('ShowSelectionGroup3')
    if (ShowSelectionGroup3 && ShowSelectionGroup3 === 'true') ValtioStore.v_ShowSelectionGroup3 = true

    const ShowInfo = urlParams.get('ShowInfo')
    if (ShowInfo) {
      ShowInfo === 'true' ? sessionStorage.setItem('Settings_v_ShowInfo', true) : sessionStorage.setItem('Settings_v_ShowInfo', false)
    }

    //..............................
    //.  Selection
    //..............................
    const AllowSelection = urlParams.get('AllowSelection')
    if (debugLog) console.log('AllowSelection ', AllowSelection)
    if (AllowSelection) {
      AllowSelection === 'true' ? (ValtioStore.v_AllowSelection = true) : (ValtioStore.v_AllowSelection = false)
    }

    const Owner = urlParams.get('Owner')
    if (Owner) ValtioStore.v_Owner = Owner
    if (debugLog) console.log('Owner ', Owner)

    const Group1 = urlParams.get('Group1')
    if (Group1) ValtioStore.v_Group1 = Group1
    if (debugLog) console.log('Group1 ', Group1)

    const Group2 = urlParams.get('Group2')
    if (Group2) ValtioStore.v_Group2 = Group2

    const Group3 = urlParams.get('Group3')
    if (Group3) ValtioStore.v_Group3 = Group3
    //..............................
    //.  Remove Parameters
    //..............................
    if (g_HideParams) {
      if (debugLog) console.log('Hide Parameters')
      // eslint-disable-next-line
      history.replaceState({}, null, 'Params')
    }
  }
  //.............................................................................
  //.  Process Restart
  //.............................................................................
  const Restart = () => {
    if (debugLog) console.log('Restart')
    //
    //  Load Server data to store
    //
    if (debugLog) console.log(`Override Page: ${g_Page} to QuizServerData`)
    handlePage('QuizServerData')
    g_DataLoad = true
    ValtioStore.v_DataLoad = g_DataLoad
  }
  //.............................................................................
  //.  Force SignIn if needed
  //.............................................................................
  const CheckSignIn = () => {
    if (debugLog) console.log('CheckSignIn')
    //
    //  Override the page if Server Data and not signed in
    //
    if (debugLog) console.log('g_SignedIn ', g_SignedIn)
    if ((g_Page === 'QuizSelect' || g_Page === 'QuizServerData') & (g_SignedIn === false)) {
      const newPage = 'QuizSignin'
      if (debugLog) console.log(`Override Page: ${g_Page} to ${newPage}`)
      handlePage(newPage)
    }
  }
  //.............................................................................
  //.  Main Line
  //.............................................................................
  g_Page = page
  if (debugLog) console.log('g_Page ', g_Page)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Load Store values
  //
  g_Params = snapShot.v_Params
  g_HideParams = JSON.parse(sessionStorage.getItem('v_HideParams'))
  g_SignedIn = snapShot.v_SignedIn
  g_DataLoad = snapShot.v_DataLoad

  //
  //  Get the URL Parameters (once only)
  //
  if (g_Params === null) {
    UnpackParams()
  }
  //
  //  Override the page if QuizRestart (QuizSelect/QuizServerData)
  //
  if (g_Page === 'QuizRestart') Restart()
  //
  //  Override the page if Server Data and not signed in
  //
  CheckSignIn()
  //
  //  Present the selected component
  //
  return (
    <>
      {(() => {
        switch (page) {
          case 'QuizSplash':
            return <QuizSplash handlePage={handlePage} />
          case 'QuizSettings':
            return <QuizSettings handlePage={handlePage} />
          case 'QuizRegister':
            return <QuizRegister handlePage={handlePage} />
          case 'QuizSignin':
            return <QuizSignin handlePage={handlePage} />
          case 'QuizServerData':
            return <QuizServerData handlePage={handlePage} />
          case 'QuizSelect':
            return <QuizSelect handlePage={handlePage} />
          case 'QuizRefs':
            return <QuizRefs handlePage={handlePage} />
          case 'Quiz':
            return <Quiz handlePage={handlePage} />
          case 'QuizReview':
            return <QuizReview handlePage={handlePage} />
          case 'QuizHistory':
            return <QuizHistory handlePage={handlePage} />
          default:
            return null
        }
      })()}
    </>
  )
}

export default QuizControl
