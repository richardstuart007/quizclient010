//
//  Libraries
//
import { Typography } from '@mui/material'
import { teal } from 'material-ui-colors'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizReviewAnswer from './QuizReviewAnswer'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizReviewAnswers = props => {
  if (g_log1) console.log('Start QuizReviewAnswers')
  //
  // Deconstruct Props
  //
  const { quizRow, AnswerNum } = props
  if (g_log1) console.log('quizRow ', quizRow)
  if (g_log1) console.log('AnswerNum ', AnswerNum)
  //
  //  Deconstruct row
  //
  const { qcorrect, qbad1, qbad2, qbad3 } = quizRow
  //
  //  Load answers to array
  //
  let Answers = []
  if (qcorrect) Answers.push(qcorrect)
  if (qbad1) Answers.push(qbad1)
  if (qbad2) Answers.push(qbad2)
  if (qbad3) Answers.push(qbad3)
  //...................................................................................
  //  Format Panel
  //...................................................................................
  return (
    <>
      <Typography
        variant='subtitle2'
        style={{ color: teal['A700'] }}
        sx={{ marginTop: '8px' }}
      >
        If incorrect your answer will show in Red. Correct answer in Green.
      </Typography>

      {Answers.map((answer, key) => (
        <QuizReviewAnswer
          key={key}
          answer={answer}
          AnswerNum={AnswerNum}
          FieldNum={key + 1}
        />
      ))}
    </>
  )
}

export default QuizReviewAnswers
