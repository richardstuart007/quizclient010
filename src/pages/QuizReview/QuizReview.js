//
//  Libraries
//
import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
//
//  Sub Components
//
import QuizReviewAnswers from './QuizReviewAnswers'
import QuizHands from '../QuizHands/QuizHands'
import QuizBidding from '../QuizBidding/QuizBidding'
//
//  Common Components
//
import QuizQuestion from '../Common/QuizQuestion'
//
//  Utilities
//
import writeHistory from '../../services/writeHistory'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizReview = props => {
  if (debugLog) console.log('Start QuizReview')
  //
  //  Counts
  //
  const [countPass, setCountPass] = useState(0)
  const [countAns, setCountAns] = useState(0)
  const [countReview, setCountReview] = useState(0)
  const [mark, setMark] = useState(0)
  const [quizRow, setQuizRow] = useState(null)
  //
  //  Arrays & Index
  //
  const [arrQuest, setArrQuest] = useState([])
  const [arrAns, setArrAns] = useState([])
  const [arrAnsNum, setArrAnsNum] = useState([])
  const [ansIdx, setAnsIdx] = useState(0)
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    if (debugLog) console.log('firstLoad ')
    //
    //  Initialise global variables
    //
    if (debugLog) console.log('Initialise global variables')
    //
    //  Get Store Values
    //
    const Data_Questions_Sorted = JSON.parse(sessionStorage.getItem('Data_Questions_Sorted'))
    const Data_Answers = JSON.parse(sessionStorage.getItem('Data_Answers'))
    const Answered = Data_Answers.length
    //
    //  Questions
    //
    let ArrQuestions = []
    let r_qid = []
    let count = 0
    Data_Questions_Sorted.forEach(row => {
      const rowData = { ...row }
      ArrQuestions.push(rowData)
      count++
      if (count <= Answered) r_qid.push(row.qid)
    })
    if (debugLog) console.log('ArrQuestions ', ArrQuestions)
    setArrQuest(ArrQuestions)
    //
    //  Answers
    //
    let Ans = []
    let AnsNum = []
    let AnsPass = 0
    let AnsCount = 0
    let AnsQuestIdx = -1
    let AnsReview = 0

    Data_Answers.forEach(id => {
      AnsCount++
      AnsQuestIdx++
      //
      //  Only show failed answers ?
      //
      const ReviewSkipPass = JSON.parse(sessionStorage.getItem('Settings_ReviewSkipPass'))
      if (id !== 1 || !ReviewSkipPass) {
        Ans.push(id)
        AnsNum.push(AnsQuestIdx)
        AnsReview++
      }
      if (id === 1) AnsPass++
    })
    if (debugLog) console.log('AnsReview ', AnsReview)
    if (debugLog) console.log('AnsCount ', AnsCount)
    if (debugLog) console.log('AnsPass ', AnsPass)
    if (debugLog) console.log('Ans ', Ans)
    //
    //  Set State
    //
    setCountReview(AnsReview)
    setCountAns(AnsCount)
    setCountPass(AnsPass)
    setArrAns(Ans)
    setArrAnsNum(AnsNum)
    //
    //  Mark%
    //
    if (AnsCount > 0) setMark(Math.round((100 * AnsPass) / AnsCount))
    //
    //  Nothing to review
    //
    if (AnsReview === 0) return
    //
    // Start at Answer Row 0
    //
    const AnsIdx = 0
    setAnsIdx(AnsIdx)
    const QuizIdx = AnsNum[AnsIdx]
    setQuizRow(ArrQuestions[QuizIdx])
    //
    //  Write Results
    //
    if (Answered > 0) {
      const r_email = JSON.parse(sessionStorage.getItem('Settings_Email'))
      const r_datetime = new Date()
      const r_owner = JSON.parse(sessionStorage.getItem('Settings_Owner'))
      const r_group1 = JSON.parse(sessionStorage.getItem('Settings_Group1'))
      const r_questions = AnsCount
      const r_correct = AnsPass

      const r_ans = Data_Answers
      //
      //  Build row
      //
      const sqlRow = {
        r_email: r_email,
        r_datetime: r_datetime,
        r_owner: r_owner,
        r_group1: r_group1,
        r_questions: r_questions,
        r_correct: r_correct,
        r_qid: r_qid,
        r_ans: r_ans
      }
      if (debugLog) console.log('sqlRow ', sqlRow)
      writeHistory(sqlRow)
    }
  }
  //...................................................................................
  //.  Next Question
  //...................................................................................
  const nextQuestion = () => {
    if (debugLog) console.log('nextQuestion ')
    if (debugLog) console.log('arrQuest ', arrQuest)
    if (debugLog) console.log('ansIdx ', ansIdx)
    if (debugLog) console.log('countReview ', countReview)
    //
    //  More rows
    //
    const AnsIdx = ansIdx + 1
    if (AnsIdx < countReview) {
      const QuizIdx = arrAnsNum[AnsIdx]
      setAnsIdx(AnsIdx)
      setQuizRow(arrQuest[QuizIdx])
    }
  }
  //...................................................................................
  //.  Previous Question
  //...................................................................................
  const handlePrevious = () => {
    if (debugLog) console.log('Previous Question ')
    //
    //  More rows
    //
    if (ansIdx > 0) {
      const AnsIdx = ansIdx - 1
      const QuizIdx = arrAnsNum[AnsIdx]
      setAnsIdx(AnsIdx)
      setQuizRow(arrQuest[QuizIdx])
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Load the data array from the store
  //
  useEffect(() => {
    firstLoad()
    // eslint-disable-next-line
  }, [])
  //
  //  No data to review
  //
  if (!quizRow) {
    if (debugLog) console.log('Quiz Row empty')
    if (countAns === 0) {
      return (
        <>
          <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
            No questions answered, nothing to review
          </Typography>
        </>
      )
    } else {
      return (
        <>
          <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
            Result ({mark}%) {countPass} out of {countAns}. WELL DONE !!
          </Typography>
        </>
      )
    }
  }
  //
  //  Hide/Show Previous/Next Buttons
  //
  let hidePreviousButton
  ansIdx + 1 === 1 ? (hidePreviousButton = true) : (hidePreviousButton = false)
  let hideNextButton
  ansIdx + 1 === countReview ? (hideNextButton = true) : (hideNextButton = false)

  if (debugLog) console.log('quizRow ', quizRow)
  if (debugLog) console.log('ansIdx ', ansIdx)
  if (debugLog) console.log('arrAnsNum ', arrAnsNum)
  if (debugLog) console.log('arrAns ', arrAns)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
        Result ({mark}%) {countPass} out of {countAns}
      </Typography>

      <QuizQuestion quizRow={quizRow} quizQuestion={arrAnsNum[ansIdx] + 1} />
      <QuizBidding qid={quizRow.qid} />
      <QuizHands qid={quizRow.qid} />
      <QuizReviewAnswers quizRow={quizRow} AnswerNum={arrAns[ansIdx]} />

      <Box sx={{ mt: 2 }}>
        {hideNextButton ? null : (
          <MyButton
            type='submit'
            text='Next'
            color='primary'
            variant='contained'
            onClick={() => nextQuestion()}
          />
        )}
        {hidePreviousButton ? null : (
          <MyButton
            type='submit'
            text='Previous'
            color='primary'
            variant='contained'
            onClick={() => handlePrevious()}
          />
        )}
      </Box>
    </>
  )
}

export default QuizReview
