//
//  Libraries
//
import { useState } from 'react'
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
let g_quizAns = []
//===================================================================================
const Quiz = ({ handlePage }) => {
  if (debugLog) console.log('Start Quiz')
  //
  //  Show Linear Bars ?
  //
  const showLinearProgress = JSON.parse(sessionStorage.getItem('Settings_v_ShowLinearProgress'))
  const showLinearScore = JSON.parse(sessionStorage.getItem('Settings_v_ShowLinearScore'))
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
    sessionStorage.setItem('Settings_v_Reset', false)
    //
    //  Get store data & copy to State
    //
    const Data_Questions_SortedJSON = sessionStorage.getItem('Data_Questions_Sorted')
    const Data_Questions_Sorted = JSON.parse(Data_Questions_SortedJSON)
    if (debugLog) console.log(Data_Questions_Sorted)

    let quest = []
    Data_Questions_Sorted.forEach(row => {
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
    g_quizAns = []
    const Data_AnswersJSON = JSON.stringify(g_quizAns)
    sessionStorage.setItem('Data_Answers', Data_AnswersJSON)
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
    g_quizAns[g_Idx] = id
    const Data_AnswersJSON = JSON.stringify(g_quizAns)
    sessionStorage.setItem('Data_Answers', Data_AnswersJSON)

    const nextAnsCount = ansCount + 1
    setAnsCount(nextAnsCount)
    if (debugLog) console.log('nextAnsCount ', nextAnsCount)
    //
    //  End of data
    //
    if (g_Idx + 1 >= g_questCount) {
      if (debugLog) console.log('g_quizAns', g_quizAns)
      //
      //  Review
      //
      handlePage('QuizReview')
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
  const reset = JSON.parse(sessionStorage.getItem('Settings_v_Reset'))
  if (reset) handleQuizReset()
  //
  //  No data (Error)
  //
  if (g_questCount === 0) {
    if (debugLog) console.log('No data')
    return <p style={{ color: 'red' }}>No data</p>
  }
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

      <QuizPanel key={g_quizRow.qid} quizRow={g_quizRow} handleSelect={handleSelect} />
      {/* .......................................................................................... */}
      {showLinearProgress ? <QuizLinearProgress count={ansCount} total={g_questCount} text={'Progress'} /> : null}
      {/* .......................................................................................... */}
      {showLinearScore ? <QuizLinearProgress count={ansPass} total={ansCount} text={'Score'}></QuizLinearProgress> : null}
    </>
  )
}

export default Quiz
