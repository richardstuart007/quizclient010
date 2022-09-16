//
//  Libraries
//
import { useState } from 'react'
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizPanel from './QuizPanel'
import QuizHands from '../QuizHands/QuizHands'
import QuizBidding from '../QuizBidding/QuizBidding'
//
//  Common Sub Components
//
import QuizQuestion from '../Common/QuizQuestion'
import QuizLinearProgress from '../Common/QuizLinearProgress'
import QuizInfo from '../Common/QuizInfo'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//
//  Global store variables
//
let g_Idx = 0
let g_quizQuest = []
let g_questCount = 0
let g_quizRow = {}
//===================================================================================
const Quiz = () => {
  if (debugLog) console.log('Start Quiz')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  //
  //  Show Linear Bars ?
  //
  const showLinearProgress = snapShot.v_ShowLinearProgress
  const showLinearScore = snapShot.v_ShowLinearScore
  //
  //  Define the State variables
  //
  const [ansPass, setAnsPass] = useState(0)
  const [ansCount, setAnsCount] = useState(0)
  //...................................................................................
  //.  Reset the Quiz
  //...................................................................................
  const handleQuizReset = () => {
    //
    //  Reset flag
    //
    if (debugLog) console.log('quizReset')
    ValtioStore.v_Reset = false
    //
    //  Get store data & copy to State
    //
    if (debugLog) console.log('snapShot.v_QFilterSort ', snapShot.v_QFilterSort)
    let quest = []
    snapShot.v_QFilterSort.forEach(row => {
      const rowData = { ...row }
      if (debugLog) console.log('rowData ', rowData)
      quest.push(rowData)
    })
    //
    // Update Questions from Store
    //
    g_quizQuest = quest
    g_questCount = quest.length
    g_Idx = 0
    g_quizRow = g_quizQuest[g_Idx]
    if (debugLog) console.log('g_quizQuest ', g_quizQuest)
    if (debugLog) console.log('g_questCount ', g_questCount)
    if (debugLog) console.log('g_quizRow ', g_quizRow)
    //
    // Reset Answers
    //
    ValtioStore.v_Help = ''
    ValtioStore.v_Ans = []
    setAnsPass(0)
    setAnsCount(0)
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = id => {
    //
    //  Update count
    //
    if (debugLog) console.log('g_Idx ', g_Idx, 'id ', id)
    if (id === 1) {
      const nextAnsPass = ansPass + 1
      setAnsPass(nextAnsPass)
    }
    //
    //   Write Answers
    //
    if (debugLog) console.log('g_Idx ', g_Idx, 'id ', id)
    ValtioStore.v_Ans[g_Idx] = id
    const nextAnsCount = ansCount + 1
    setAnsCount(nextAnsCount)
    if (debugLog) console.log('nextAnsCount ', nextAnsCount)
    //
    //  End of data
    //
    if (g_Idx + 1 >= g_questCount) {
      if (debugLog) console.log('v_Ans', snapShot.v_Ans)
      //
      //  Review
      //
      ValtioStore.v_PagePrevious = CurrentPage
      ValtioStore.v_Page = 'QuizReview'
      return
    }
    //
    //  Next row
    //
    g_Idx++
    g_quizRow = g_quizQuest[g_Idx]
    if (debugLog) console.log('g_quizRow', g_quizRow)
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    if (debugLog) console.log(`ID selected ${id}`)
    if (debugLog) console.log('g_Idx ', g_Idx, 'qid ', g_quizRow.qid)
    onSubmitForm(id)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Reset Quiz State
  //
  const reset = snapShot.v_Reset
  if (reset) handleQuizReset()
  //
  //  No data (Error)
  //
  if (g_questCount === 0) {
    if (debugLog) console.log('No data')
    return <p style={{ color: 'red' }}>No data</p>
  }
  //
  //  Set Help Article (for layout button)
  //
  let help = null
  if (g_quizRow.qrefs) {
    if (debugLog) console.log('g_quizRow.qrefs[0] ', g_quizRow.qrefs[0])
    help = g_quizRow.qrefs[0]
  }
  ValtioStore.v_Help = help
  if (debugLog) console.log('help ', help)

  if (debugLog) console.log('g_quizRow ', g_quizRow)
  if (debugLog) console.log('g_quizRow.qid ', g_quizRow.qid)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <QuizQuestion quizRow={g_quizRow} quizQuestion={g_Idx + 1} />
      <QuizBidding qid={g_quizRow.qid} />
      <QuizHands qid={g_quizRow.qid} />

      <QuizPanel
        key={g_quizRow.qid}
        quizRow={g_quizRow}
        handleSelect={handleSelect}
      />
      {/* .......................................................................................... */}
      {showLinearProgress ? (
        <QuizLinearProgress
          count={ansCount}
          total={g_questCount}
          text={'Progress'}
        />
      ) : null}
      {/* .......................................................................................... */}
      {showLinearScore ? (
        <QuizLinearProgress
          count={ansPass}
          total={ansCount}
          text={'Score'}
        ></QuizLinearProgress>
      ) : null}

      <QuizInfo />
    </>
  )
}

export default Quiz
