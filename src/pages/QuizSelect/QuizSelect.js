//
//  Libraries
//
import { useState } from 'react'
import { Grid, Typography, Box } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//
//  Utilities
//
import QuizSelectData from './QuizSelectData'
//
//  Constants
//
const { MAX_QUESTIONS } = require('../../services/constants.js')
const { WAIT } = require('../../services/constants.js')
//
let g_DataLoad = true
//
//  Settings
//
let Settings_AllowSelection
let Settings_ShowSelectionGroup2
let Settings_ShowSelectionGroup3
//
//  Data output
//
let Data_Options_Owner = []
let Data_Options_Group1Owner = []
let Data_Options_Group2 = []
let Data_Options_Group3 = []
let Data_Group1OptionsSubset = []
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'QuizSelect'
//
//  Initial Values
//
const initialFValues = {
  qowner: '',
  qgroup1: '',
  qgroup2: '',
  qgroup3: '',
  MaxQuestions: 0
}
//
//  Saved Values on Submit
//
const params = {
  qowner: '',
  qgroup1: '',
  qgroup2: '',
  qgroup3: '',
  MaxQuestions: 0
}
//
//  References to display
//
let g_PageNew
//===================================================================================
const QuizSelect = ({ handlePage }) => {
  //.............................................................................
  //.  Load Group1 Options
  //.............................................................................
  const loadGroup1Options = (InitialLoad, owner, group1) => {
    if (debugFunStart) console.log('loadGroup1Options')
    let options = []
    //
    //  Select out Owner
    //
    if (debugLog) console.log('owner ', owner)
    if (debugLog) console.log('group1 ', group1)

    Data_Options_Group1Owner.forEach(item => {
      if (item.qowner === owner || owner === 'All') {
        //
        //  Do not add duplicates
        //
        const duplicate = options.some(option => option['id'] === item.qgroup1)
        if (!duplicate) {
          const itemObj = {
            id: item.qgroup1,
            title: item.g1title
          }
          options.push(itemObj)
        }
      }
    })
    //
    //  If current group1 is not in valid value, force first
    //
    if (debugLog) console.log('owner/options ', options)
    const valid = options.some(option => option['id'] === group1)
    if (!valid) {
      const firstOption = options[0]
      if (debugLog) console.log('firstOption ', firstOption)
      if (!InitialLoad) {
        setValues({
          ...values,
          qowner: owner,
          qgroup1: firstOption.id
        })
        if (debugLog) console.log(`qgroup1 default to ${firstOption.id}`)
      }
    }

    return options
  }
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (debugFunStart) console.log('validate')
    if (debugLog) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    //
    //  qowner
    //
    if ('qowner' in fieldValues) {
      temp.qowner = fieldValues.qowner.length !== 0 ? '' : 'This field is required.'
      Data_Group1OptionsSubset = loadGroup1Options(false, fieldValues.qowner, values.qgroup1)
    }
    //
    //  qgroup1
    //
    if ('qgroup1' in fieldValues) {
      if (debugLog) console.log('group1 ', fieldValues.qgroup1)
      temp.qgroup1 = fieldValues.qgroup1.length !== 0 ? '' : 'This field is required.'
    }
    //
    //  MaxQuestions
    //
    if ('MaxQuestions' in fieldValues)
      temp.MaxQuestions =
        parseInt(fieldValues.MaxQuestions) > 0 &&
        parseInt(fieldValues.MaxQuestions) <= MAX_QUESTIONS
          ? ''
          : `You must select between 1 and ${MAX_QUESTIONS}.`
    //
    //  Set the errors
    //
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
    if (debugFunStart) console.log('SubmitForm')
    if (validate()) {
      getQuestionData()
    }
  }
  //...................................................................................
  //.  get Question Data
  //...................................................................................
  const getQuestionData = () => {
    if (debugFunStart) console.log('getQuestionData')

    //
    //  QuizSelectData
    //
    params.qowner = values.qowner
    params.qgroup1 = values.qgroup1
    params.qgroup2 = values.qgroup2
    params.qgroup3 = values.qgroup3
    params.MaxQuestions = values.MaxQuestions
    QuizSelectData(params)
    //
    //  Wait for data
    //
    let totalWAIT = 0
    const myInterval = setInterval(myTimer, WAIT)
    function myTimer() {
      if (debugLog) console.log(`Wait ${WAIT}`)
      totalWAIT = totalWAIT + WAIT
      //
      //  Data received, end wait
      //
      const Data_Questions_Received = JSON.parse(sessionStorage.getItem('Data_Questions_Received'))
      const Data_Bidding_Received = JSON.parse(sessionStorage.getItem('Data_Bidding_Received'))
      const Data_Hands_Received = JSON.parse(sessionStorage.getItem('Data_Hands_Received'))
      const Data_Reflinks_Received = JSON.parse(sessionStorage.getItem('Data_Reflinks_Received'))
      if (debugLog)
        console.log(
          `Questions(${Data_Questions_Received}) Bidding(${Data_Bidding_Received}) Hands(${Data_Hands_Received}) Reflinks(${Data_Reflinks_Received})`
        )
      if (
        Data_Questions_Received &&
        Data_Bidding_Received &&
        Data_Hands_Received &&
        Data_Reflinks_Received
      ) {
        //
        //  Update Selection
        //
        if (debugLog) console.log('All DATA received totalWAIT = ', totalWAIT)
        updateSelection()
        clearInterval(myInterval)
      }
    }
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  const updateSelection = () => {
    if (debugFunStart) console.log('updateSelection')
    //
    //  Session Storage
    //
    const Data_Questions_Quiz_Count = JSON.parse(
      sessionStorage.getItem('Data_Questions_Quiz_Count')
    )
    //
    //  No questions
    //
    if (Data_Questions_Quiz_Count === 0) {
      setForm_message('QuizSelect: No Questions found')
      if (debugLog) console.log('QuizSelect: No Questions found')
      return
    }
    //
    //  No Refs
    //
    const Data_ReflinksJSON = sessionStorage.getItem('Data_Reflinks')
    if (debugLog) console.log('Data_ReflinksJSON ', Data_ReflinksJSON)
    if (g_PageNew === 'QuizRefs') {
      if (Data_ReflinksJSON === '') {
        setForm_message('QuizSelect: No Learning Material found')
        return
      }
    }

    //
    //  Start Quiz
    //
    sessionStorage.setItem('Settings_Reset', true)
    handlePage(g_PageNew)
  }

  //...................................................................................
  //.  Initial Load of Options
  //...................................................................................
  const LoadOptions = () => {
    if (debugFunStart) console.log('LoadOptions')
    //
    //  Get Data from the Store  Data_Options_Group1Owner
    //
    const Data_Options_OwnerJSON = sessionStorage.getItem('Data_Options_Owner')
    Data_Options_Owner = JSON.parse(Data_Options_OwnerJSON)

    const Data_Options_Group1OwnerJSON = sessionStorage.getItem('Data_Options_Group1Owner')
    Data_Options_Group1Owner = JSON.parse(Data_Options_Group1OwnerJSON)

    const Data_Options_Group2JSON = sessionStorage.getItem('Data_Options_Group2')
    Data_Options_Group2 = JSON.parse(Data_Options_Group2JSON)

    const Data_Options_Group3JSON = sessionStorage.getItem('Data_Options_Group3')
    Data_Options_Group3 = JSON.parse(Data_Options_Group3JSON)
    //
    //  Set Group1 Options
    //
    Data_Group1OptionsSubset = loadGroup1Options(
      true,
      initialFValues.qowner,
      initialFValues.qgroup1
    )
    sessionStorage.setItem('Data_Group1OptionsSubset', JSON.stringify(Data_Group1OptionsSubset))
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStart) console.log(debugModule)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //
  //  Set Selection from any previous values
  //
  initialFValues.qowner = JSON.parse(sessionStorage.getItem('Settings_Owner'))
  initialFValues.qgroup1 = JSON.parse(sessionStorage.getItem('Settings_Group1'))
  initialFValues.qgroup2 = JSON.parse(sessionStorage.getItem('Settings_Group2'))
  initialFValues.qgroup3 = JSON.parse(sessionStorage.getItem('Settings_Group3'))
  initialFValues.MaxQuestions = JSON.parse(sessionStorage.getItem('Settings_MaxQuestions'))
  if (debugLog) console.log('initialFValues ', initialFValues)
  //
  //  Load setup values
  //
  Settings_AllowSelection = !JSON.parse(sessionStorage.getItem('Settings_AllowSelection'))
  Settings_ShowSelectionGroup2 = JSON.parse(sessionStorage.getItem('Settings_ShowSelectionGroup2'))
  Settings_ShowSelectionGroup3 = JSON.parse(sessionStorage.getItem('Settings_ShowSelectionGroup3'))
  //
  //  Load the data array from the store
  //
  if (g_DataLoad) {
    g_DataLoad = false
    LoadOptions()
  }
  //
  //  Interface to Form
  //
  const { values, setValues, errors, setErrors, handleInputChange } = useMyForm(
    initialFValues,
    true,
    validate
  )
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm>
        <Grid container spacing={2}>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 600 }}>
              <MySelect
                name='qowner'
                label='Owner'
                value={values.qowner}
                onChange={handleInputChange}
                options={Data_Options_Owner}
                error={errors.qowner}
                disabled={Settings_AllowSelection}
              />
            </Box>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 600 }}>
              <MySelect
                name='qgroup1'
                label='Group1'
                value={values.qgroup1}
                onChange={handleInputChange}
                options={Data_Group1OptionsSubset}
                error={errors.qgroup1}
                disabled={Settings_AllowSelection}
              />
            </Box>
          </Grid>
          {/*.................................................................................................*/}

          {Settings_ShowSelectionGroup2 ? (
            <Grid item xs={12}>
              <Box sx={{ mt: 2, maxWidth: 600 }}>
                <MySelect
                  name='qgroup2'
                  label='Group2'
                  value={values.qgroup2}
                  onChange={handleInputChange}
                  options={Data_Options_Group2}
                  disabled={Settings_AllowSelection}
                />
              </Box>
            </Grid>
          ) : null}
          {/*.................................................................................................*/}
          {Settings_ShowSelectionGroup3 ? (
            <Grid item xs={12}>
              <Box sx={{ mt: 2, maxWidth: 600 }}>
                <MySelect
                  name='qgroup3'
                  label='Group3'
                  value={values.qgroup3}
                  onChange={handleInputChange}
                  options={Data_Options_Group3}
                  disabled={Settings_AllowSelection}
                />
              </Box>
            </Grid>
          ) : null}
          {/*.................................................................................................*/}

          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 100 }}>
              <MyInput
                name='MaxQuestions'
                label='MaxQuestions'
                value={values.MaxQuestions}
                onChange={handleInputChange}
                error={errors.MaxQuestions}
              />
            </Box>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 600 }}>
              <Typography style={{ color: 'red' }}>{form_message}</Typography>
            </Box>
          </Grid>
        </Grid>
        {/*.................................................................................................*/}
        <Box sx={{ mt: 2, maxWidth: 600 }}>
          <MyButton
            text='Start Quiz'
            onClick={() => {
              g_PageNew = 'Quiz'
              SubmitForm()
            }}
          />

          <MyButton
            color='warning'
            text='Learn'
            sx={{ float: 'right' }}
            onClick={() => {
              g_PageNew = 'QuizRefs'
              SubmitForm()
            }}
          />
        </Box>
        {/* .......................................................................................... */}
      </MyForm>
    </>
  )
}

export default QuizSelect
