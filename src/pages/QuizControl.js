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
import QuizInfo from './Common/QuizInfo'
//
// Debug Settings
//
const debugLog = debugSettings()
//
//  Global Variables
//
let g_Params
let g_HideParams
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
    sessionStorage.setItem('Settings_v_Params', false)
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
    sessionStorage.setItem('Settings_v_Params', true)

    const urlParams = new URLSearchParams(queryString)
    //..............................
    //.  Dev Mode
    //..............................
    const Devmode = urlParams.get('Devmode')
    if (Devmode) {
      if (Devmode === 'true') {
        sessionStorage.setItem('Settings_v_ShowSelectionOwner', true)
        sessionStorage.setItem('Settings_v_ShowAllOwner', true)
        sessionStorage.setItem('Settings_v_ShowSelectionGroup1', true)
        sessionStorage.setItem('Settings_v_ShowSelectionGroup2', true)
        sessionStorage.setItem('Settings_v_ShowSelectionGroup3', true)
        sessionStorage.setItem('Settings_v_ShowInfo', true)
        sessionStorage.setItem('Settings_v_ShowButtonSettings', true)
      }
    }
    //..............................
    //.  Show Overrides
    //..............................
    const ShowButtonSettings = urlParams.get('ShowButtonSettings')
    if (ShowButtonSettings && ShowButtonSettings === 'true') sessionStorage.setItem('Settings_v_ShowButtonSettings', true)

    const ShowSelectionOwner = urlParams.get('ShowSelectionOwner')
    if (ShowSelectionOwner && ShowSelectionOwner === 'true') sessionStorage.setItem('Settings_v_ShowSelectionOwner', true)

    const ShowSelectionGroup1 = urlParams.get('ShowSelectionGroup1')
    if (ShowSelectionGroup1 && ShowSelectionGroup1 === 'true') sessionStorage.setItem('Settings_v_ShowSelectionGroup1', true)

    const ShowSelectionGroup2 = urlParams.get('ShowSelectionGroup2')
    if (ShowSelectionGroup2 && ShowSelectionGroup2 === 'true') sessionStorage.setItem('Settings_v_ShowSelectionGroup2', true)

    const ShowSelectionGroup3 = urlParams.get('ShowSelectionGroup3')
    if (ShowSelectionGroup3 && ShowSelectionGroup3 === 'true') sessionStorage.setItem('Settings_v_ShowSelectionGroup3', true)

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
      AllowSelection === 'true'
        ? sessionStorage.setItem('Settings_v_AllowSelection', true)
        : sessionStorage.setItem('Settings_v_AllowSelection', false)
    }

    const Owner = urlParams.get('Owner')
    if (Owner) sessionStorage.setItem('Settings_v_Owner', JSON.stringify(Owner))
    if (debugLog) console.log('Owner ', Owner)

    const Group1 = urlParams.get('Group1')
    if (Group1) sessionStorage.setItem('Settings_v_Group1', JSON.stringify(Group1))
    if (debugLog) console.log('Group1 ', Group1)

    const Group2 = urlParams.get('Group2')
    if (Group2) sessionStorage.setItem('Settings_v_Group1', JSON.stringify(Group2))

    const Group3 = urlParams.get('Group3')
    if (Group3) sessionStorage.setItem('Settings_v_Group1', JSON.stringify(Group3))
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
  //.  Main Line
  //.............................................................................
  if (debugLog) console.log('page ', page)
  //
  //  Load Store values
  //
  g_Params = JSON.parse(sessionStorage.getItem('Settings_v_Params'))
  g_HideParams = JSON.parse(sessionStorage.getItem('Settings_v_HideParams'))
  //
  //  Get the URL Parameters (once only)
  //
  if (g_Params === null) {
    UnpackParams()
  }
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
      <QuizInfo page={page} />
    </>
  )
}

export default QuizControl
