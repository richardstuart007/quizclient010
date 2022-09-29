//
//  Libraries
//
import { useState } from 'react'
import { Grid, Typography } from '@mui/material'
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
import randomSort from '../../services/randomSort'
import QuizSelectData from './QuizSelectData'
//
//  Constants
//
const { ROWS_MAX } = require('../../services/constants.js')
const { WAIT } = require('../../services/constants.js')
//
let g_DataLoad = null
//
//  Define State of store values
//
let g_Questions
let g_OwnerOptions
let g_Group1OptionsOwner
let g_Group2Options
let g_Group3Options
let g_Group1OptionsSubset
let g_disabled
let g_showOwner
let g_showGroup1
let g_showGroup2
let g_showGroup3
let g_RandomSort
//
//  Global workfields
//
let g_QCount = 0
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'QuizSelect'
//.............................................................................
//.  Data Input Fields
//.............................................................................
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

    if (debugLog) console.log('g_Group1OptionsOwner ', g_Group1OptionsOwner)
    g_Group1OptionsOwner.forEach(item => {
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
      g_Group1OptionsSubset = loadGroup1Options(false, fieldValues.qowner, values.qgroup1)
      if (debugLog) console.log('g_Group1OptionsSubset ', g_Group1OptionsSubset)
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
        parseInt(fieldValues.MaxQuestions) > 0 && parseInt(fieldValues.MaxQuestions) <= ROWS_MAX
          ? ''
          : `You must select between 1 and ${ROWS_MAX}.`
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
    //  Save selection
    //
    if (debugLog) console.log(values)
    params.qowner = values.qowner
    params.qgroup1 = values.qgroup1
    params.qgroup2 = values.qgroup2
    params.qgroup3 = values.qgroup3
    params.MaxQuestions = values.MaxQuestions
    //
    //  Reset the Data
    //
    sessionStorage.setItem('Data_Questions_Received', false)
    sessionStorage.setItem('Data_Bidding_Received', false)
    sessionStorage.setItem('Data_Hands_Received', false)
    sessionStorage.setItem('Data_Reflinks_Received', false)

    sessionStorage.setItem('Data_Questions', [])
    sessionStorage.setItem('Data_Bidding', [])
    sessionStorage.setItem('Data_Hands', [])
    sessionStorage.setItem('Data_Reflinks', [])

    sessionStorage.setItem('Data_Questions_Sorted', [])
    sessionStorage.setItem('Data_Questions_Count', 0)
    //
    //  QuizSelectData
    //
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
    const Data_Questions = JSON.parse(sessionStorage.getItem('Data_Questions'))
    g_Questions = Data_Questions
    if (debugLog) console.log('g_Questions ', g_Questions)
    //
    //  Sort the Questions
    //
    QuestionsSort()
    //
    //  No questions
    //
    if (debugLog) console.log('g_QCount ', g_QCount)
    if (g_QCount === 0) {
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
    //  Update store
    //
    sessionStorage.setItem('Settings_Reset', true)
    sessionStorage.setItem('Settings_Owner', JSON.stringify(params.qowner))
    sessionStorage.setItem('Settings_Group1', JSON.stringify(params.qgroup1))
    sessionStorage.setItem('Settings_Group2', JSON.stringify(params.qgroup2))
    sessionStorage.setItem('Settings_Group3', JSON.stringify(params.qgroup3))
    sessionStorage.setItem('Settings_MaxQuestions', JSON.stringify(params.MaxQuestions))
    //
    //  Start Quiz
    //
    handlePage(g_PageNew)
  }
  //...................................................................................
  //.  Sort questions
  //...................................................................................
  const QuestionsSort = () => {
    if (debugFunStart) console.log('QuestionsSort')
    //
    //  Clear Global workfields
    //
    g_QCount = 0
    const filteredData = g_Questions
    if (debugLog) console.log('filteredData ', filteredData)

    if (filteredData) {
      let sortedData = []

      g_RandomSort ? (sortedData = randomSort(filteredData)) : (sortedData = filteredData)
      if (debugLog) console.log('sortedData ', sortedData)
      //
      //  Apply max number
      //
      let Data_Questions_Sorted = []
      let i = 0
      do {
        if (i < sortedData.length) Data_Questions_Sorted.push(sortedData[i])
        i++
      } while (i < params.MaxQuestions)
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Questions_Sorted ', Data_Questions_Sorted)
      sessionStorage.setItem('Data_Questions_Sorted', JSON.stringify(Data_Questions_Sorted))

      const Data_Questions_Count = Data_Questions_Sorted.length
      sessionStorage.setItem('Data_Questions_Count', JSON.stringify(Data_Questions_Count))

      g_QCount = Data_Questions_Sorted.length
    }
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
    const Data_Options_Owner = JSON.parse(Data_Options_OwnerJSON)
    if (debugLog) console.log(Data_Options_Owner)
    g_OwnerOptions = Data_Options_Owner
    if (debugLog) console.log('g_OwnerOptions ', g_OwnerOptions)

    const Data_Options_Group1OwnerJSON = sessionStorage.getItem('Data_Options_Group1Owner')
    const Data_Options_Group1Owner = JSON.parse(Data_Options_Group1OwnerJSON)
    if (debugLog) console.log(Data_Options_Group1Owner)
    g_Group1OptionsOwner = Data_Options_Group1Owner

    const Data_Options_Group2JSON = sessionStorage.getItem('Data_Options_Group2')
    const Data_Options_Group2 = JSON.parse(Data_Options_Group2JSON)
    if (debugLog) console.log(Data_Options_Group2)
    g_Group2Options = Data_Options_Group2

    const Data_Options_Group3JSON = sessionStorage.getItem('Data_Options_Group3')
    const Data_Options_Group3 = JSON.parse(Data_Options_Group3JSON)
    if (debugLog) console.log(Data_Options_Group3)
    g_Group3Options = Data_Options_Group3

    if (debugLog) console.log('g_OwnerOptions ', g_OwnerOptions)
    if (debugLog) console.log('g_Group1OptionsOwner ', g_Group1OptionsOwner)
    if (debugLog) console.log('g_Group2Options ', g_Group2Options)
    if (debugLog) console.log('g_Group3Options ', g_Group3Options)
    //
    //  Set Group1 Options
    //
    g_Group1OptionsSubset = loadGroup1Options(true, initialFValues.qowner, initialFValues.qgroup1)
    if (debugLog) console.log('g_Group1OptionsSubset ', g_Group1OptionsSubset)
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
  //  Set Selection from any previous values / or valtio defaults
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
  g_disabled = !JSON.parse(sessionStorage.getItem('Settings_AllowSelection'))
  g_showOwner = JSON.parse(sessionStorage.getItem('Settings_ShowSelectionOwner'))
  g_showGroup1 = JSON.parse(sessionStorage.getItem('Settings_ShowSelectionGroup1'))
  g_showGroup2 = JSON.parse(sessionStorage.getItem('Settings_ShowSelectionGroup2'))
  g_showGroup3 = JSON.parse(sessionStorage.getItem('Settings_ShowSelectionGroup3'))
  g_RandomSort = JSON.parse(sessionStorage.getItem('Settings_RandomSort'))
  if (debugLog) console.log(g_disabled, g_showOwner, g_showGroup1)
  //
  //  Load the data array from the store
  //
  g_DataLoad = JSON.parse(sessionStorage.getItem('Settings_DataLoad'))
  if (g_DataLoad) {
    g_DataLoad = false
    sessionStorage.setItem('Settings_DataLoad', false)
    LoadOptions()
  }
  //
  //  Interface to Form
  //
  if (debugLog) console.log('initialFValues ', initialFValues)
  const { values, setValues, errors, setErrors, handleInputChange } = useMyForm(
    initialFValues,
    true,
    validate
  )
  //
  if (debugLog) console.log('g_OwnerOptions ', g_OwnerOptions)
  if (debugLog) console.log('g_Group1OptionsSubset ', g_Group1OptionsSubset)
  if (debugLog) console.log('g_Group2Options ', g_Group2Options)
  if (debugLog) console.log('g_Group3Options ', g_Group3Options)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm>
        <Grid container spacing={2}>
          {/*.................................................................................................*/}
          {g_showOwner ? (
            <Grid item xs={12}>
              <MySelect
                name='qowner'
                label='Owner'
                value={values.qowner}
                onChange={handleInputChange}
                options={g_OwnerOptions}
                error={errors.qowner}
                disabled={g_disabled}
              />
            </Grid>
          ) : null}

          {/*.................................................................................................*/}
          {g_showGroup1 ? (
            <Grid item xs={12}>
              <MySelect
                name='qgroup1'
                label='Group1'
                value={values.qgroup1}
                onChange={handleInputChange}
                options={g_Group1OptionsSubset}
                error={errors.qgroup1}
                disabled={g_disabled}
              />
            </Grid>
          ) : null}

          {g_showGroup2 ? (
            <Grid item xs={12}>
              <MySelect
                name='qgroup2'
                label='Group2'
                value={values.qgroup2}
                onChange={handleInputChange}
                options={g_Group2Options}
                disabled={g_disabled}
              />
            </Grid>
          ) : null}

          {g_showGroup3 ? (
            <Grid item xs={12}>
              <MySelect
                name='qgroup3'
                label='Group3'
                value={values.qgroup3}
                onChange={handleInputChange}
                options={g_Group3Options}
                disabled={g_disabled}
              />
            </Grid>
          ) : null}
          {/*.................................................................................................*/}

          <Grid item xs={6}>
            <MyInput
              name='MaxQuestions'
              label='MaxQuestions'
              value={values.MaxQuestions}
              onChange={handleInputChange}
              error={errors.MaxQuestions}
            />
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Typography style={{ color: 'red' }}>{form_message}</Typography>
          </Grid>

          {/*.................................................................................................*/}
          <Grid item xs={6}>
            <MyButton
              text='Start Quiz'
              onClick={() => {
                g_PageNew = 'Quiz'
                SubmitForm()
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <MyButton
              text='Learn'
              onClick={() => {
                g_PageNew = 'QuizRefs'
                SubmitForm()
              }}
            />
          </Grid>
          {/*.................................................................................................*/}
        </Grid>
      </MyForm>
    </>
  )
}

export default QuizSelect
