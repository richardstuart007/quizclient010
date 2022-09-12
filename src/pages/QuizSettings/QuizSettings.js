//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Container, Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyCheckbox from '../../components/controls/MyCheckbox'
import MyButton from '../../components/controls/MyButton'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizSettings = () => {
  if (g_log1) console.log('Start QuizSettings')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  const PagePrevious = snapShot.v_PagePrevious
  //
  //  Initial Values v_ReviewSkipPass
  //
  const initialFValues = {
    z_StaticData: snapShot.v_StaticData,
    z_HideParams: snapShot.v_HideParams,
    z_ShowInfo: snapShot.v_ShowInfo,
    z_ShowLinearProgress: snapShot.v_ShowLinearProgress,
    z_ShowLinearScore: snapShot.v_ShowLinearScore,
    z_QuestionSort: snapShot.v_RandomSort,
    z_ShowQid: snapShot.v_ShowQid,
    z_ReviewSkipPass: snapShot.v_ReviewSkipPass
  }
  //
  //  Saved Values on Submit
  //
  const savedValues = {
    z_StaticData: false,
    z_HideParams: false,
    z_ShowInfo: false,
    z_ShowLinearProgress: false,
    z_ShowLinearScore: false,
    z_QuestionSort: false,
    z_ShowQid: false,
    z_ReviewSkipPass: false
  }
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (g_log1) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    if ('z_StaticData' in fieldValues) temp.z_StaticData = ''
    if ('z_HideParams' in fieldValues) temp.z_HideParams = ''
    if ('z_ShowInfo' in fieldValues) temp.z_ShowInfo = ''
    if ('z_ShowLinearProgress' in fieldValues) temp.z_ShowLinearProgress = ''
    if ('z_ShowLinearScore' in fieldValues) temp.z_ShowLinearScore = ''
    if ('z_QuestionSort' in fieldValues) temp.z_QuestionSort = ''
    if ('z_ShowQid' in fieldValues) temp.z_ShowQid = ''
    if ('z_ReviewSkipPass' in fieldValues) temp.z_ReviewSkipPass = ''

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
    if (g_log1) console.log('validate ', validate())
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
    if (g_log1) console.log(values)
    savedValues.z_StaticData = values.z_StaticData
    savedValues.z_HideParams = values.z_HideParams
    savedValues.z_ShowInfo = values.z_ShowInfo
    savedValues.z_ShowLinearProgress = values.z_ShowLinearProgress
    savedValues.z_ShowLinearScore = values.z_ShowLinearScore
    savedValues.z_QuestionSort = values.z_QuestionSort
    savedValues.z_ShowQid = values.z_ShowQid
    savedValues.z_ReviewSkipPass = values.z_ReviewSkipPass
    //
    //  Update Store
    //
    if (g_log1)
      console.log('Update Store: z_StaticData ', savedValues.z_StaticData)
    if (g_log1) console.log('Update Store: z_ShowInfo ', savedValues.z_ShowInfo)
    ValtioStore.v_PagePrevious = CurrentPage
    ValtioStore.v_HideParams = savedValues.z_HideParams
    ValtioStore.v_ShowInfo = savedValues.z_ShowInfo
    ValtioStore.v_ShowLinearProgress = savedValues.z_ShowLinearProgress
    ValtioStore.v_ShowLinearScore = savedValues.z_ShowLinearScore
    ValtioStore.v_RandomSort = savedValues.z_QuestionSort
    ValtioStore.v_ShowQid = savedValues.z_ShowQid
    ValtioStore.v_ReviewSkipPass = savedValues.z_ReviewSkipPass
    ValtioStore.v_StaticData = savedValues.z_StaticData
    //
    //  NO Switch to/from Static data - return to previous
    //
    if (initialFValues.z_StaticData === savedValues.z_StaticData) {
      ValtioStore.v_Page = PagePrevious
    }
    //
    //  Switch to/from Static data
    //
    else {
      if (savedValues.z_StaticData === false) {
        ValtioStore.v_Page = 'QuizSignin'
      } else {
        ValtioStore.v_Page = 'QuizRestart'
      }
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useMyForm(
    initialFValues,
    true,
    validate
  )
  if (g_log1) console.log('initialFValues ', initialFValues)
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
              name='z_StaticData'
              label='Static Data'
              value={values.z_StaticData}
              onChange={handleInputChange}
              error={errors.z_StaticData}
            />
          </Grid>

          <Grid item xs={4}>
            <MyCheckbox
              name='z_HideParams'
              label='Hide Params'
              value={values.z_HideParams}
              onChange={handleInputChange}
              error={errors.z_HideParams}
            />
          </Grid>

          <Grid item xs={4}>
            <MyCheckbox
              name='z_ShowInfo'
              label='Show Info'
              value={values.z_ShowInfo}
              onChange={handleInputChange}
              error={errors.z_ShowInfo}
            />
          </Grid>

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
              label='Review Pass'
              value={values.z_ReviewSkipPass}
              onChange={handleInputChange}
              error={errors.z_ReviewSkipPass}
            />
          </Grid>

          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <MyButton
              type='submit'
              text='Update'
              value='Submit'
              onClick={() => SubmitForm()}
            />
          </Grid>
        </MyForm>
      </Container>
    </Grid>
  )
}

export default QuizSettings
