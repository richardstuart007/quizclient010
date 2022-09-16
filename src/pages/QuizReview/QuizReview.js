//
//  Libraries
//
import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
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
import QuizInfo from '../Common/QuizInfo'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
import writeUsersResults from '../../services/writeUsersResults'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizReview = () => {
  if (debugLog) console.log('Start QuizReview')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Counts
  //
  const [countPass, setCountPass] = useState(0)
  const [countAns, setCountAns] = useState(0)
  const [countReview, setCountReview] = useState(0)
  //
  //
  //
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
    if (debugLog) console.log('snapShot.v_Ans ', snapShot.v_Ans)
    //
    //  Get store data - Questions
    //
    let ArrQuestions = []
    snapShot.v_QFilterSort.forEach(row => {
      const rowData = { ...row }
      ArrQuestions.push(rowData)
    })
    if (debugLog) console.log('ArrQuestions ', ArrQuestions)
    setArrQuest(ArrQuestions)
    //
    //  Get store data - Answers
    //
    let Ans = []
    let AnsNum = []
    let AnsPass = 0
    let AnsCount = 0
    let AnsQuestIdx = -1
    let AnsReview = 0
    snapShot.v_Ans.forEach(id => {
      AnsCount++
      AnsQuestIdx++
      //
      //  Only show failed answers ?
      //
      const ReviewSkipPass = snapShot.v_ReviewSkipPass
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
    const sqlURL = snapShot.v_URL
    const r_email = snapShot.v_Email
    const r_datetime = new Date()
    const r_owner = snapShot.v_Owner
    const r_group1 = snapShot.v_Group1
    const r_questions = AnsCount
    const r_correct = AnsPass
    //
    //  Build row
    //
    const sqlRow = {
      r_email: r_email,
      r_datetime: r_datetime,
      r_owner: r_owner,
      r_group1: r_group1,
      r_questions: r_questions,
      r_correct: r_correct
    }
    //
    //  Build Parameters & Write Results
    //
    const props = {
      sqlURL: sqlURL,
      sqlRow: sqlRow
    }
    writeUsersResults(props)
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
    return (
      <>
        <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
          Result ({mark}%) {countPass} out of {countAns}. No incorrect answers
          to review.
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{ marginTop: '8px' }}
          style={{ color: 'red' }}
        >
          WELL DONE !!
        </Typography>
      </>
    )
  }
  //
  //  Set Help Article
  //
  let help = null
  if (quizRow.qrefs[0]) {
    if (debugLog) console.log('quizRow.qrefs[0] ', quizRow.qrefs[0])
    help = quizRow.qrefs[0]
  }
  ValtioStore.v_Help = help
  if (debugLog) console.log('help ', help)
  //
  //  Hide/Show Previous/Next Buttons
  //
  let hidePreviousButton
  ansIdx + 1 === 1 ? (hidePreviousButton = true) : (hidePreviousButton = false)
  let hideNextButton
  ansIdx + 1 === countReview
    ? (hideNextButton = true)
    : (hideNextButton = false)

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

      <QuizInfo />
    </>
  )
}

export default QuizReview
