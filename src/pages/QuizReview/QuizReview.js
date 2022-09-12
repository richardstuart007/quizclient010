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
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizReview = () => {
  if (g_log1) console.log('Start QuizReview')
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
    if (g_log1) console.log('firstLoad ')
    //
    //  Initialise global variables
    //
    if (g_log1) console.log('Initialise global variables')
    if (g_log1) console.log('snapShot.v_Ans ', snapShot.v_Ans)
    //
    //  Get store data - Questions
    //
    let ArrQuestions = []
    snapShot.v_QFilterSort.forEach(row => {
      const rowData = { ...row }
      ArrQuestions.push(rowData)
    })
    if (g_log1) console.log('ArrQuestions ', ArrQuestions)
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
    if (g_log1) console.log('AnsReview ', AnsReview)
    if (g_log1) console.log('AnsCount ', AnsCount)
    if (g_log1) console.log('AnsPass ', AnsPass)
    if (g_log1) console.log('Ans ', Ans)
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
  }
  //...................................................................................
  //.  Next Question
  //...................................................................................
  const nextQuestion = () => {
    if (g_log1) console.log('nextQuestion ')
    if (g_log1) console.log('arrQuest ', arrQuest)
    if (g_log1) console.log('countAns ', countAns)
    if (g_log1) console.log('ansIdx ', ansIdx)
    if (g_log1) console.log('countReview ', countReview)
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
    if (g_log1) console.log('Previous Question ')
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
    if (g_log1) console.log('Quiz Row empty')
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
    if (g_log1) console.log('quizRow.qrefs[0] ', quizRow.qrefs[0])
    help = quizRow.qrefs[0]
  }
  ValtioStore.v_Help = help
  if (g_log1) console.log('help ', help)
  //
  //  Hide/Show Previous/Next Buttons
  //
  let hidePreviousButton
  ansIdx + 1 === 1 ? (hidePreviousButton = true) : (hidePreviousButton = false)
  let hideNextButton
  ansIdx + 1 === countReview
    ? (hideNextButton = true)
    : (hideNextButton = false)

  if (g_log1) console.log('quizRow ', quizRow)
  if (g_log1) console.log('ansIdx ', ansIdx)
  if (g_log1) console.log('arrAnsNum ', arrAnsNum)
  if (g_log1) console.log('arrAns ', arrAns)
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
