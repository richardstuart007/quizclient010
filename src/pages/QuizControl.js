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
import QuizSelect from './QuizSelect/QuizSelect'
import Quiz from './Quiz/Quiz'
import QuizReview from './QuizReview/QuizReview'
import QuizHistory from './QuizHistory/QuizHistory'
import QuizHistoryDetail from './QuizHistory/QuizHistoryDetail'
import QuizRefs from './QuizRefs/QuizRefs'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
function QuizControl({ handlePage }) {
  if (debugLog) console.log('Start QuizControl')
  //.............................................................................
  //.  Main Line
  //.............................................................................
  //
  //  Retrieve the state
  //
  const pageCurrent = JSON.parse(sessionStorage.getItem('Settings_Page_Current'))
  //
  //  Present the selected component
  //
  return (
    <>
      {(() => {
        switch (pageCurrent) {
          case 'QuizSplash':
            return <QuizSplash handlePage={handlePage} />
          case 'QuizSettings':
            return <QuizSettings handlePage={handlePage} />
          case 'QuizRegister':
            return <QuizRegister handlePage={handlePage} />
          case 'QuizSignin':
            return <QuizSignin handlePage={handlePage} />
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
          case 'QuizHistoryDetail':
            return <QuizHistoryDetail handlePage={handlePage} />
          default:
            return null
        }
      })()}
    </>
  )
}

export default QuizControl
