//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Common Sub Components
//
import QuizInfo from '../Common/QuizInfo'
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
import { ValtioStore } from '../ValtioStore'
import randomSort from '../../services/randomSort'
//
//  Constants
//
const { ROWS_MAX } = require('../../services/constants.js')
//
let g_staticData = null
let g_DataLoad = null
//
//  Define State of store values
//
let g_CurrentPage
let g_Questions
let g_OwnerOptions
let g_Group1OptionsOwner
let g_Group2Options
let g_Group3Options
let g_disabled
let g_showOwner
let g_showGroup1
let g_showGroup2
let g_showGroup3
let g_Group1OptionsSubset
let g_RandomSort
//
//  Global workfields
//
let g_QFilter = []
let g_QFilterSort = []
let g_QCount = 0
let g_QRefsCount = 0
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'QuizSelect'
let debugStack = []
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
const savedValues = {
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
const QuizSelect = () => {
  //.............................................................................
  //.  Debug Logging
  //.............................................................................
  const debugLogging = (objtext, obj) => {
    if (debugLog) {
      //
      //  Object passed
      //
      let JSONobj = ''
      if (obj) {
        JSONobj = JSON.parse(JSON.stringify(obj))
      }
      //
      //  Output values
      //
      console.log('VALUES: Stack ', debugStack, objtext, JSONobj)
    }
  }
  //.............................................................................
  //.  function start
  //.............................................................................
  const debugFunStart = funname => {
    debugStack.push(funname)
    if (debugFunStartSetting)
      console.log('Stack: debugFunStart ==> ', funname, debugStack)
  }
  //.............................................................................
  //.  function End
  //.............................................................................
  const debugFunEnd = () => {
    if (debugStack.length > 1) {
      const funname = debugStack.pop()
      if (debugFunEndSetting)
        console.log('Stack: debugFunEnd <==== ', funname, debugStack)
    }
  }
  //.............................................................................
  //.  Valtio unpack
  //.............................................................................
  const vUnpack = valtioField => {
    const valtioValue = JSON.parse(JSON.stringify(valtioField))
    return valtioValue
  }
  //.............................................................................
  //.  Load Group1 Options
  //.............................................................................
  const loadGroup1Options = (InitialLoad, owner, group1) => {
    debugFunStart('loadGroup1Options')
    let options = []
    //
    //  Select out Owner
    //
    debugLogging('owner ', owner)
    debugLogging('group1 ', group1)

    debugLogging('g_Group1OptionsOwner ', g_Group1OptionsOwner)
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
          debugLogging('itemObj ', itemObj)
          options.push(itemObj)
        }
      }
    })
    //
    //  If current group1 is not in valid value, force first
    //
    debugLogging('options ', options)
    const valid = options.some(option => option['id'] === group1)
    if (!valid) {
      const firstOption = options[0]
      debugLogging('firstOption ', firstOption)
      //
      //  Initial Load
      //
      if (InitialLoad) {
        initialFValues.qgroup1 = firstOption
        debugLogging('initialFValues.qgroup1 to first, invalid group ')
      } else {
        setValues({
          ...values,
          qowner: owner,
          qgroup1: firstOption
        })
        debugLogging('values.qgroup1 to first, invalid group ')
      }
    }
    debugLogging('options ', options)
    debugFunEnd()
    return options
  }
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    debugFunStart('validate')
    debugLogging('fieldValues ', fieldValues)
    let temp = { ...errors }
    if ('qowner' in fieldValues) {
      temp.qowner =
        fieldValues.qowner.length !== 0 ? '' : 'This field is required.'
      g_Group1OptionsSubset = loadGroup1Options(
        false,
        fieldValues.qowner,
        values.qgroup1
      )
      debugLogging('g_Group1OptionsSubset ', g_Group1OptionsSubset)
    }
    if ('MaxQuestions' in fieldValues)
      temp.MaxQuestions =
        parseInt(fieldValues.MaxQuestions) > 0 &&
        parseInt(fieldValues.MaxQuestions) <= ROWS_MAX
          ? ''
          : `You must select between 1 and ${ROWS_MAX}.`
    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')

    debugFunEnd()
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  //
  //  Validate
  //
  const SubmitForm = e => {
    debugFunStart('SubmitForm')
    if (validate()) {
      updateSelection()
    }
    debugFunEnd()
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  const updateSelection = () => {
    debugFunStart('updateSelection')
    //
    //  Save selection
    //
    debugLogging(values)
    savedValues.qowner = values.qowner
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    savedValues.qgroup3 = values.qgroup3
    savedValues.MaxQuestions = values.MaxQuestions
    //
    //  Filter and sort the Questions
    //
    QuestionsFilterSort()
    //
    //  No questions
    //
    debugLogging('g_QCount ', g_QCount)
    if (g_QCount === 0) {
      setForm_message('QuizSelect: No Questions found')
      debugLogging('QuizSelect: No Questions found')
      debugFunEnd()
      return
    }
    //
    //  No Refs
    //
    debugLogging('g_QRefsCount ', g_QRefsCount)
    if (g_PageNew === 'QuizRefs') {
      if (g_QRefsCount === 0) {
        setForm_message('QuizSelect: No Learning Material found')
        debugFunEnd()
        return
      }
    }
    //
    //  Update store
    //
    ValtioStore.v_PagePrevious = g_CurrentPage
    ValtioStore.v_Page = g_PageNew
    ValtioStore.v_Reset = true
    ValtioStore.v_Owner = savedValues.qowner
    ValtioStore.v_Group1 = savedValues.qgroup1
    ValtioStore.v_Group2 = savedValues.qgroup2
    ValtioStore.v_Group3 = savedValues.qgroup3
    ValtioStore.v_MaxQuestions = savedValues.MaxQuestions

    debugFunEnd()
  }
  //...................................................................................
  //.  Load filtered
  //...................................................................................
  const loadQFilter = () => {
    debugFunStart('loadQFilter')
    debugLogging('g_Questions ', g_Questions)
    debugLogging('savedValues ', savedValues)
    //
    //  Filter
    //
    const filteredData = g_Questions.filter(question => {
      if (
        savedValues.qowner &&
        savedValues.qowner !== 'All' &&
        question.qowner !== savedValues.qowner
      ) {
        // debugLogging('rejected owner ', question)
        return false
      }
      if (
        savedValues.qgroup1 &&
        savedValues.qgroup1 !== 'All' &&
        question.qgroup1 !== savedValues.qgroup1
      ) {
        // debugLogging('rejected Group1', question)
        return false
      }
      if (
        savedValues.qgroup2 &&
        savedValues.qgroup2 !== 'All' &&
        question.qgroup2 !== savedValues.qgroup2
      ) {
        // debugLogging('rejected Group2', question)
        return false
      }
      if (
        savedValues.qgroup3 &&
        savedValues.qgroup3 !== 'All' &&
        question.qgroup3 !== savedValues.qgroup3
      ) {
        // debugLogging('rejected Group3', question)
        return false
      }
      //
      //  Selected
      //
      debugLogging('question selected ', question)
      return question
    })
    debugLogging('filteredData ', filteredData)
    //
    //  No Questions
    //
    if (filteredData.length === 0) {
      setForm_message('QuizSelect: No Questions found')
      debugLogging('QuizSelect: No Questions found')
      debugFunEnd()
      return
    }
    //
    //  Save filtered Questions
    //
    ValtioStore.v_QFilter = filteredData
    g_QFilter = filteredData
    debugLogging('g_QFilter ', g_QFilter)

    debugFunEnd()
  }
  //...................................................................................
  //.  Load filtered sorted
  //...................................................................................
  const loadQFilterSort = () => {
    debugFunStart('loadQFilterSort')

    const filteredData = g_QFilter
    debugLogging('filteredData ', filteredData)

    if (filteredData) {
      let sortedData = []

      g_RandomSort
        ? (sortedData = randomSort(filteredData))
        : (sortedData = filteredData)
      debugLogging('sortedData ', sortedData)
      //
      //  Apply max number
      //
      let quest = []
      let i = 0
      do {
        if (i < sortedData.length) quest.push(sortedData[i])
        i++
      } while (i < savedValues.MaxQuestions)
      //
      // update ValtioStore - Questions
      //
      debugLogging('update v_QFilterSort', quest)
      ValtioStore.v_QFilterSort = quest
      g_QFilterSort = quest

      ValtioStore.v_QCount = quest.length
      g_QCount = quest.length
    }

    debugFunEnd()
  }
  //...................................................................................
  //.  Load references
  //...................................................................................
  const loadQrefs = () => {
    debugFunStart('loadQrefs')

    const quest = g_QFilterSort
    debugLogging('quest ', quest)

    if (quest) {
      let refs = []
      quest.forEach(question => {
        const { qrefs } = question
        debugLogging('qrefs ', qrefs)
        if (qrefs) {
          qrefs.forEach(ref => {
            //
            //  ignore None
            //
            if (ref !== 'None') {
              const found = refs.find(element => element === ref)
              if (!found) refs.push(ref)
            }
          })
        }
      })
      //
      //  Sort the Refs
      //
      debugLogging('refs ', refs)
      refs.sort((a, b) => (a > b ? 1 : -1))
      debugLogging('refs ', refs)
      //
      // update ValtioStore - Refs
      //
      debugLogging('update v_QRefs', refs)
      ValtioStore.v_QRefs = refs
      g_QRefsCount = refs.length
      ValtioStore.QRefsCount = g_QRefsCount
    }
    debugFunEnd()
  }
  //...................................................................................
  //.  Filter v_Questions into v_QFilterSort
  //...................................................................................
  const QuestionsFilterSort = () => {
    debugFunStart('QuestionsFilterSort')
    //
    // Clear the store
    //
    ValtioStore.v_QFilter = []
    ValtioStore.v_QFilterSort = []
    ValtioStore.v_QCount = 0
    ValtioStore.v_QRefs = []
    ValtioStore.QRefsCount = 0
    //
    //  Clear Global workfields
    //
    g_QFilter = []
    g_QFilterSort = []
    g_QCount = 0
    g_QRefsCount = 0
    //
    // Sort Data
    //
    loadQFilter()
    if (g_QFilter.length === 0) {
      debugFunEnd()
      return
    }
    //
    // Sort Data
    //
    loadQFilterSort()
    if (g_QCount === 0) {
      debugFunEnd()
      return
    }
    //
    //  Load references
    //
    loadQrefs()

    debugFunEnd()
  }
  //...................................................................................
  //.  Initial Load
  //...................................................................................
  const InitialLoad = () => {
    debugFunStart('InitialLoad')
    //
    //  Get Data from the Store
    //
    g_CurrentPage = vUnpack(snapShot.v_Page)
    g_Questions = vUnpack(snapShot.v_Questions)
    g_OwnerOptions = vUnpack(snapShot.v_OwnerOptions)
    g_Group1OptionsOwner = vUnpack(snapShot.v_Group1OptionsOwner)
    g_Group2Options = vUnpack(snapShot.v_Group2Options)
    g_Group3Options = vUnpack(snapShot.v_Group3Options)
    debugLogging('g_Questions ', g_Questions)
    debugLogging('g_OwnerOptions ', g_OwnerOptions)
    debugLogging('g_Group1OptionsOwner ', g_Group1OptionsOwner)
    debugLogging('g_Group2Options ', g_Group2Options)
    debugLogging('g_Group3Options ', g_Group3Options)
    //
    //  Load setup values
    //
    g_disabled = !vUnpack(snapShot.v_AllowSelection)
    g_showOwner = vUnpack(snapShot.v_ShowSelectionOwner)
    g_showGroup1 = vUnpack(snapShot.v_ShowSelectionGroup1)
    g_showGroup2 = vUnpack(snapShot.v_ShowSelectionGroup2)
    g_showGroup3 = vUnpack(snapShot.v_ShowSelectionGroup3)
    g_RandomSort = vUnpack(snapShot.v_RandomSort)
    //
    //  Set Group1 Options
    //
    g_Group1OptionsSubset = loadGroup1Options(
      true,
      initialFValues.qowner,
      initialFValues.qgroup1
    )
    debugLogging('g_Group1OptionsSubset ', g_Group1OptionsSubset)

    debugFunEnd()
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  debugStack = []
  debugFunStart(debugModule)
  debugLogging('g_Questions ', g_Questions)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //
  //  Set Selection from any previous values / or valtio defaults
  //
  initialFValues.qowner = vUnpack(snapShot.v_Owner)
  initialFValues.qgroup1 = vUnpack(snapShot.v_Group1)
  initialFValues.qgroup2 = vUnpack(snapShot.v_Group2)
  initialFValues.qgroup3 = vUnpack(snapShot.v_Group3)
  initialFValues.MaxQuestions = vUnpack(snapShot.v_MaxQuestions)
  //
  //  Load the data array from the store - if static/server status changes (or first time)
  //
  g_DataLoad = vUnpack(snapShot.v_DataLoad)
  if (g_DataLoad || g_staticData !== snapShot.v_StaticData) {
    g_DataLoad = false
    ValtioStore.v_DataLoad = false
    g_staticData = vUnpack(snapShot.v_StaticData)
    InitialLoad()
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
      <Grid container>
        <Container>
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
        </Container>
      </Grid>
      <QuizInfo />
    </>
  )
}

export default QuizSelect
