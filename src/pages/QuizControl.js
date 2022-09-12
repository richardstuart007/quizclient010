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
import QuizRefs from './QuizRefs/QuizRefs'
//
//  Static Data
//
import QuizStaticData from '../datastatic/QuizStaticData'
//
//  Utilities
//
import { ValtioStore } from './ValtioStore'
//
// Debug Settings
//
const g_log1 = debugSettings()
//
//  Global Variables
//
let g_StaticData
let g_Params
let g_HideParams
let g_Page
let g_DataLoad
let g_SignedIn
//===================================================================================
function QuizControl() {
  if (g_log1) console.log('Start QuizControl')
  //.............................................................................
  //.  Unpack Parameters
  //.............................................................................
  const UnpackParams = () => {
    if (g_log1) console.log('Get Parameters')
    //
    //  Set Params Load already done
    //
    g_Params = false
    ValtioStore.v_Params = g_Params
    //
    //  Get Query string of Parameters
    //
    const queryString = window.location.search
    if (g_log1) console.log('queryString ', queryString)
    if (!queryString) return
    //
    //  Update the Store
    //
    if (g_log1) console.log('Has Parameters')
    g_Params = true
    ValtioStore.v_Params = g_Params

    const urlParams = new URLSearchParams(queryString)
    //..............................
    //.  Dev Mode
    //..............................
    const Devmode = urlParams.get('Devmode')
    if (Devmode) {
      if (Devmode === 'true') {
        ValtioStore.v_ShowButtonHelp = true
        ValtioStore.v_ShowButtonSettings = true
        ValtioStore.v_ShowSelectionOwner = true
        ValtioStore.v_ShowSelectionGroup1 = true
        ValtioStore.v_ShowSelectionGroup2 = true
        ValtioStore.v_ShowSelectionGroup3 = true
        ValtioStore.v_ShowInfo = true
      }
    }
    //..............................
    //.  Show Overrides
    //..............................
    const ShowButtonHelp = urlParams.get('ShowButtonHelp')
    if (ShowButtonHelp && ShowButtonHelp === 'true')
      ValtioStore.v_ShowButtonHelp = true

    const ShowButtonSettings = urlParams.get('ShowButtonSettings')
    if (ShowButtonSettings && ShowButtonSettings === 'true')
      ValtioStore.v_ShowButtonSettings = true

    const ShowSelectionOwner = urlParams.get('ShowSelectionOwner')
    if (ShowSelectionOwner && ShowSelectionOwner === 'true')
      ValtioStore.v_ShowSelectionOwner = true

    const ShowSelectionGroup1 = urlParams.get('ShowSelectionGroup1')
    if (ShowSelectionGroup1 && ShowSelectionGroup1 === 'true')
      ValtioStore.v_ShowSelectionGroup1 = true

    const ShowSelectionGroup2 = urlParams.get('ShowSelectionGroup2')
    if (ShowSelectionGroup2 && ShowSelectionGroup2 === 'true')
      ValtioStore.v_ShowSelectionGroup2 = true

    const ShowSelectionGroup3 = urlParams.get('ShowSelectionGroup3')
    if (ShowSelectionGroup3 && ShowSelectionGroup3 === 'true')
      ValtioStore.v_ShowSelectionGroup3 = true

    const ShowInfo = urlParams.get('ShowInfo')
    if (ShowInfo && ShowInfo === 'true') ValtioStore.v_ShowInfo = true

    //..............................
    //.  Data Source
    //..............................
    const StaticData = urlParams.get('StaticData')
    if (StaticData) {
      StaticData === 'true' ? (g_StaticData = true) : (g_StaticData = false)
      ValtioStore.v_StaticData = g_StaticData
    }
    //..............................
    //.  Selection
    //..............................
    const AllowSelection = urlParams.get('AllowSelection')
    if (g_log1) console.log('AllowSelection ', AllowSelection)
    if (AllowSelection) {
      AllowSelection === 'true'
        ? (ValtioStore.v_AllowSelection = true)
        : (ValtioStore.v_AllowSelection = false)
    }

    const Owner = urlParams.get('Owner')
    if (Owner) ValtioStore.v_Owner = Owner
    if (g_log1) console.log('Owner ', Owner)

    const Group1 = urlParams.get('Group1')
    if (Group1) ValtioStore.v_Group1 = Group1
    if (g_log1) console.log('Group1 ', Group1)

    const Group2 = urlParams.get('Group2')
    if (Group2) ValtioStore.v_Group2 = Group2

    const Group3 = urlParams.get('Group3')
    if (Group3) ValtioStore.v_Group3 = Group3
    //..............................
    //.  Remove Parameters
    //..............................
    if (g_HideParams) {
      if (g_log1) console.log('Hide Parameters')
      // eslint-disable-next-line
      history.replaceState({}, null, 'Params')
    }
  }
  //.............................................................................
  //.  Process Restart
  //.............................................................................
  const Restart = () => {
    if (g_log1) console.log('Restart')
    //
    //  Load Server data to store
    //
    if (g_StaticData === false) {
      if (g_log1) console.log(`Override Page: ${g_Page} to QuizServerData`)
      g_Page = 'QuizServerData'
      ValtioStore.v_Page = g_Page

      g_DataLoad = true
      ValtioStore.v_DataLoad = g_DataLoad
    }
    //
    //  Load Static data to Store (Once only)
    //
    else {
      if (g_log1) console.log('g_DataLoad ', g_DataLoad)
      if (g_DataLoad) {
        g_DataLoad = false
        ValtioStore.v_DataLoad = g_DataLoad

        if (g_log1) console.log('call QuizStaticData ')
        QuizStaticData()
      }
      if (g_log1) console.log(`Override Page: ${g_Page} to QuizSelect`)
      ValtioStore.v_Page = 'QuizSelect'
      g_Page = 'QuizSelect'
    }
  }
  //.............................................................................
  //.  Force SignIn if neded
  //.............................................................................
  const CheckSignIn = () => {
    if (g_log1) console.log('CheckSignIn')
    //
    //  Override the page if Server Data and not signed in
    //
    if (g_log1) console.log('g_Page ', g_Page)
    if (g_log1) console.log('g_SignedIn ', g_SignedIn)
    if (
      (g_Page === 'QuizSelect' || g_Page === 'QuizServerData') &
      (g_StaticData === false) &
      (g_SignedIn === false)
    ) {
      const newPage = 'QuizSignin'
      if (g_log1) console.log(`Override Page: ${g_Page} to ${newPage}`)
      g_Page = newPage
      ValtioStore.v_Page = g_Page
    }
  }
  //.............................................................................
  //  Main Line
  //.............................................................................
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Load Store values
  //
  g_StaticData = snapShot.v_StaticData
  g_Params = snapShot.v_Params
  g_HideParams = snapShot.v_HideParams
  g_Page = snapShot.v_Page
  g_SignedIn = snapShot.v_SignedIn
  g_DataLoad = snapShot.v_DataLoad
  if (g_log1) console.log('g_HideParams ', g_HideParams)
  if (g_log1) console.log('g_Params ', g_Params)
  if (g_log1) console.log('g_StaticData ', g_StaticData)
  if (g_log1) console.log('g_DataLoad ', g_DataLoad)
  if (g_log1) console.log('g_SignedIn ', g_SignedIn)
  if (g_log1) console.log('g_Page ', g_Page)
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
  switch (g_Page) {
    case 'QuizSplash':
      return <QuizSplash />
    case 'QuizSettings':
      return <QuizSettings />
    case 'QuizRegister':
      return <QuizRegister />
    case 'QuizSignin':
      return <QuizSignin />
    case 'QuizServerData':
      return <QuizServerData />
    case 'QuizSelect':
      return <QuizSelect />
    case 'QuizRefs':
      return <QuizRefs />
    case 'Quiz':
      return <Quiz />
    case 'QuizReview':
      return <QuizReview />
    default:
      return <QuizSplash />
  }
}

export default QuizControl
