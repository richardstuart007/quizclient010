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
//  Components
//
import MyButton from '../../components/controls/MyButton'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizQuestion = params => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct params
  //
  const { quizRow, quizQuestion } = params
  const ShowQid = JSON.parse(sessionStorage.getItem('Settings_ShowQid'))
  //
  //  Deconstruct row
  //
  if (debugLog) console.log('quizRow ', quizRow)
  const { qid, qkey, qdetail } = quizRow
  let hyperLink
  qdetail.substring(0, 8) === 'https://' ? (hyperLink = true) : (hyperLink = false)
  if (debugLog) console.log('hyperLink ', hyperLink)
  //
  //  Hyperlink open
  //
  const openTab = hyperlink => () => {
    if (debugLog) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //
  //  Question string (with ID ?)
  //
  const Data_Questions_Quiz_CountJSON = sessionStorage.getItem('Data_Questions_Quiz_Count')
  const Data_Questions_Quiz_Count = JSON.parse(Data_Questions_Quiz_CountJSON)
  if (debugLog) console.log(Data_Questions_Quiz_Count)

  let QuestionString = `Question ${quizQuestion}`
  const CurrentPage = JSON.parse(sessionStorage.getItem('Settings_Page_Current'))
  if (debugLog) console.log('CurrentPage ', CurrentPage)
  if (CurrentPage === 'Quiz')
    QuestionString = QuestionString.concat(`/${Data_Questions_Quiz_Count}`)
  if (ShowQid) QuestionString = QuestionString.concat(` (KEY: ${qkey} ID: ${qid})`)
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
      <Typography variant='subtitle2' style={{ color: teal['A700'] }} sx={{ marginTop: '8px' }}>
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
