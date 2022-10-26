//
//  Libraries
//
import { Container, Grid, Box } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyCheckbox from '../../components/controls/MyCheckbox'
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//
//  Constants
//
const { MAX_QUESTIONS_SELECT } = require('../../services/constants.js')
//===================================================================================
const QuizSettings = ({ handlePage }) => {
  if (debugLog) console.log('Start QuizSettings')
  //
  //  Define the Store
  //
  const PagePrevious = JSON.parse(sessionStorage.getItem('Settings_Page_Previous'))
  //
  //  Initial Values
  //
  const initialFValues = {
    z_ShowLinearProgress: JSON.parse(sessionStorage.getItem('Settings_ShowLinearProgress')),
    z_ShowLinearScore: JSON.parse(sessionStorage.getItem('Settings_ShowLinearScore')),
    z_QuestionSort: JSON.parse(sessionStorage.getItem('Settings_RandomSort')),
    z_ShowQid: JSON.parse(sessionStorage.getItem('Settings_ShowQid')),
    z_ReviewSkipPass: JSON.parse(sessionStorage.getItem('Settings_ReviewSkipPass')),
    z_MaxQuestions: JSON.parse(sessionStorage.getItem('Settings_MaxQuestions'))
  }
  //
  //  Saved Values on Submit
  //
  const savedValues = {
    z_ShowLinearProgress: false,
    z_ShowLinearScore: false,
    z_QuestionSort: false,
    z_ShowQid: false,
    z_ReviewSkipPass: false,
    z_MaxQuestions: 0
  }
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (debugLog) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    if ('z_ShowLinearProgress' in fieldValues) temp.z_ShowLinearProgress = ''
    if ('z_ShowLinearScore' in fieldValues) temp.z_ShowLinearScore = ''
    if ('z_QuestionSort' in fieldValues) temp.z_QuestionSort = ''
    if ('z_ShowQid' in fieldValues) temp.z_ShowQid = ''
    if ('z_ReviewSkipPass' in fieldValues) temp.z_ReviewSkipPass = ''
    //
    //  MaxQuestions
    //
    if ('z_MaxQuestions' in fieldValues)
      temp.z_MaxQuestions =
        parseInt(fieldValues.z_MaxQuestions) > 0 &&
        parseInt(fieldValues.z_MaxQuestions) <= MAX_QUESTIONS_SELECT
          ? ''
          : `You must select between 1 and ${MAX_QUESTIONS_SELECT}.`

    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  //
  //  Validate
  //
  const SubmitForm = e => {
    if (debugLog) console.log('validate ', validate())
    if (validate()) {
      updateSelection()
    }
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  const updateSelection = () => {
    //
    //  Save data
    //
    if (debugLog) console.log(values)
    savedValues.z_ShowLinearProgress = values.z_ShowLinearProgress
    savedValues.z_ShowLinearScore = values.z_ShowLinearScore
    savedValues.z_QuestionSort = values.z_QuestionSort
    savedValues.z_ShowQid = values.z_ShowQid
    savedValues.z_ReviewSkipPass = values.z_ReviewSkipPass
    savedValues.z_MaxQuestions = values.z_MaxQuestions
    //
    //  Update Store
    //
    sessionStorage.setItem('Settings_ShowLinearProgress', savedValues.z_ShowLinearProgress)
    sessionStorage.setItem('Settings_ShowLinearScore', savedValues.z_ShowLinearScore)
    sessionStorage.setItem('Settings_RandomSort', savedValues.z_QuestionSort)
    sessionStorage.setItem('Settings_ShowQid', savedValues.z_ShowQid)
    sessionStorage.setItem('Settings_ReviewSkipPass', savedValues.z_ReviewSkipPass)
    sessionStorage.setItem('Settings_MaxQuestions', JSON.stringify(savedValues.z_MaxQuestions))
    //
    //  return to previous
    //
    handlePage(PagePrevious)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useMyForm(initialFValues, true, validate)
  if (debugLog) console.log('initialFValues ', initialFValues)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Grid container>
      <Container>
        <MyForm>
          {/*.................................................................................................*/}

          <Grid item xs={4}>
            <MyCheckbox
              name='z_ShowLinearProgress'
              label='Show Linear Progress'
              value={values.z_ShowLinearProgress}
              onChange={handleInputChange}
              error={errors.z_ShowLinearProgress}
            />
          </Grid>

          <Grid item xs={4}>
            <MyCheckbox
              name='z_ShowLinearScore'
              label='Show Linear Score'
              value={values.z_ShowLinearScore}
              onChange={handleInputChange}
              error={errors.z_ShowLinearScore}
            />
          </Grid>

          <Grid item xs={4}>
            <MyCheckbox
              name='z_QuestionSort'
              label='Sort Questions'
              value={values.z_QuestionSort}
              onChange={handleInputChange}
              error={errors.z_QuestionSort}
            />
          </Grid>

          <Grid item xs={4}>
            <MyCheckbox
              name='z_ShowQid'
              label='Show Qid'
              value={values.z_ShowQid}
              onChange={handleInputChange}
              error={errors.z_ShowQid}
            />
          </Grid>

          <Grid item xs={4}>
            <MyCheckbox
              name='z_ReviewSkipPass'
              label='Skip Review of Correct Answers'
              value={values.z_ReviewSkipPass}
              onChange={handleInputChange}
              error={errors.z_ReviewSkipPass}
            />
          </Grid>

          {/*.................................................................................................*/}

          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 200 }}>
              <MyInput
                name='z_MaxQuestions'
                label='MaxQuestions'
                value={values.z_MaxQuestions}
                onChange={handleInputChange}
                error={errors.z_MaxQuestions}
              />
            </Box>
          </Grid>

          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <MyButton type='submit' text='Update' value='Submit' onClick={() => SubmitForm()} />
          </Grid>
        </MyForm>
      </Container>
    </Grid>
  )
}

export default QuizSettings
