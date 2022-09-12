//
//  Libraries
//
import { Typography } from '@mui/material'
import { teal } from 'material-ui-colors'
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import MyButton from '../../components/controls/MyButton'
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
const QuizQuestion = params => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct params
  //
  const { quizRow, quizQuestion } = params
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const ShowQid = snapShot.v_ShowQid
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  const { qid, qkey, qdetail } = quizRow
  let hyperLink
  qdetail.substring(0, 8) === 'https://'
    ? (hyperLink = true)
    : (hyperLink = false)
  if (g_log1) console.log('hyperLink ', hyperLink)
  //
  //  Hyperlink open
  //
  const openTab = hyperlink => () => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //
  //  Question string (with ID ?)
  //
  const QCount = snapShot.v_QCount
  let QuestionString = `Question ${quizQuestion}/${QCount}`
  if (ShowQid)
    QuestionString = QuestionString.concat(`        (KEY: ${qkey} ID: ${qid})`)
  //
  //  Uppercase the question
  //
  const qdetailUpper = qdetail.toUpperCase()
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      {/* .......................................................................................... */}
      {/* Question number and ID */}
      {/* .......................................................................................... */}
      <Typography
        variant='subtitle2'
        style={{ color: teal['A700'] }}
        sx={{ marginTop: '8px' }}
      >
        {QuestionString}
      </Typography>
      {/* .......................................................................................... */}
      {/* Hyperlink Button */}
      {/* .......................................................................................... */}
      {hyperLink && (
        <MyButton
          onClick={openTab(qdetail)}
          type='submit'
          style={{ color: 'white' }}
          size='small'
          text='Click to view the Question'
        ></MyButton>
      )}
      {/* .......................................................................................... */}
      {/* Normal Text */}
      {/* .......................................................................................... */}
      {!hyperLink && (
        <Typography
          variant='body2'
          style={{ color: 'blue' }}
          sx={{ marginTop: '8px' }}
          gutterBottom
        >
          {qdetailUpper}
        </Typography>
      )}
      {/* .......................................................................................... */}
    </>
  )
}

export default QuizQuestion
