//
//  Libraries
//
import { useState } from 'react'
import { Grid, Typography } from '@mui/material'
//
//  Utilities
//
import GetBuildOptionsOwner from '../../services/GetBuildOptionsOwner'
import GetBuildOptionsGroup1Owner from '../../services/GetBuildOptionsGroup1Owner'
import GetBuildOptionsGroup2 from '../../services/GetBuildOptionsGroup2'
import GetBuildOptionsGroup3 from '../../services/GetBuildOptionsGroup3'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_SIGNIN } = require('../../services/constants.js')
const { WAIT } = require('../../services/constants.js')
const sqlClient = 'Quiz/Signin'
//
// Debug Settings
//
const debugLog = debugSettings(true)
const debugFunStart = true
const debugModule = 'QuizSignin'
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialFValues = {
  email: '',
  password: ''
}
//===================================================================================
function QuizSignin({ handlePage }) {
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (debugFunStart) console.log('validate')
    if (debugLog) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    //
    //  email
    //
    if ('email' in fieldValues) {
      temp.email = validateEmail(fieldValues.email) ? '' : 'Email is not a valid format'
    }
    //
    //  password
    //
    if ('password' in fieldValues) {
      temp.password = fieldValues.password.length !== 0 ? '' : 'This field is required.'
    }
    //
    //  Set the errors
    //
    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')
  }
  //...................................................................................

  function validateEmail(email) {
    if (debugFunStart) console.log('validateEmail')
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const FormSubmit = e => {
    if (debugFunStart) console.log('FormSubmit')
    if (validate()) {
      FormUpdate()
    }
  }
  //...................................................................................
  //.  Update
  //...................................................................................
  const FormUpdate = () => {
    if (debugFunStart) console.log('FormUpdate')
    //
    //  Deconstruct values
    //
    const { email, password } = values
    //
    //  Post to server
    //
    const URL = Settings_URL + URL_SIGNIN
    fetch(URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sqlClient: sqlClient,
        email: email,
        password: password
      })
    })
      .then(response => response.json())

      .then(user => {
        if (user.u_id) {
          ProcessSignIn(user, email)
        } else {
          setForm_message('Please REGISTER or email/password invalid.  Try again')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
  }
  //...................................................................................
  //.  Process User Signin
  //...................................................................................
  const ProcessSignIn = (user, email) => {
    if (debugFunStart) console.log('ProcessSignIn')
    //
    //  Store the sign-in info
    //
    sessionStorage.setItem('Settings_Email', JSON.stringify(email))
    sessionStorage.setItem('Settings_Name', JSON.stringify(user.u_name))
    sessionStorage.setItem('Settings_Uid', JSON.stringify(user.u_id))
    sessionStorage.setItem('Settings_Uadmin', JSON.stringify(user.u_admin))
    sessionStorage.setItem('Settings_SignedIn', true)
    //
    //  Initialise storage status
    //
    sessionStorage.setItem('Data_Options_Owner_Loaded', false)
    sessionStorage.setItem('Data_Options_Group1Owner_Loaded', false)
    sessionStorage.setItem('Data_Options_Group2_Loaded', false)
    sessionStorage.setItem('Data_Options_Group3_Loaded', false)
    //
    //  Get the Selection Options
    //
    GetBuildOptionsOwner()
    GetBuildOptionsGroup1Owner()
    GetBuildOptionsGroup2()
    GetBuildOptionsGroup3()
    //
    //  Wait for data
    //
    let totalWAIT = 0
    const myInterval = setInterval(myTimer, WAIT)
    function myTimer() {
      if (debugLog) console.log(`Wait ${WAIT}`)
      totalWAIT = totalWAIT + WAIT
      //
      //  Get Data Status
      //
      const Data_Options_Owner_Loaded = JSON.parse(
        sessionStorage.getItem('Data_Options_Owner_Loaded')
      )
      const Data_Options_Group1Owner_Loaded = JSON.parse(
        sessionStorage.getItem('Data_Options_Group1Owner_Loaded')
      )
      const Data_Options_Group2_Loaded = JSON.parse(
        sessionStorage.getItem('Data_Options_Group2_Loaded')
      )
      const Data_Options_Group3_Loaded = JSON.parse(
        sessionStorage.getItem('Data_Options_Group3_Loaded')
      )
      if (debugLog)
        console.log(
          `Owner(${Data_Options_Owner_Loaded}) Group1(${Data_Options_Group1Owner_Loaded}) Group2(${Data_Options_Group2_Loaded}) Group3(${Data_Options_Group3_Loaded})`
        )
      //
      //  Data received, end wait
      //
      if (
        Data_Options_Owner_Loaded &&
        Data_Options_Group1Owner_Loaded &&
        Data_Options_Group2_Loaded &&
        Data_Options_Group3_Loaded
      ) {
        if (debugLog) console.log('All DATA received totalWAIT = ', totalWAIT)
        clearInterval(myInterval)
        //
        //  Change Page
        //
        handlePage('QuizSelect')
      }
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStart) console.log(debugModule)
  //
  //  Get the URL
  //
  const Settings_URL = JSON.parse(sessionStorage.getItem('Settings_URL'))
  //
  //  Get the Email
  //
  const Settings_Email = JSON.parse(sessionStorage.getItem('Settings_Email'))
  if (debugLog) console.log('Settings_Email ', Settings_Email)
  initialFValues.email = Settings_Email
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useMyForm(initialFValues, true, validate)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm>
        {/*.................................................................................................*/}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyInput
              name='email'
              label='email'
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <MyInput
              name='password'
              label='password'
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
            />
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Typography style={{ color: 'red' }}>{form_message}</Typography>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <MyButton
              text='SignIn'
              onClick={() => {
                FormSubmit()
              }}
            />
          </Grid>

          {/*.................................................................................................*/}
        </Grid>
      </MyForm>
    </>
  )
}

export default QuizSignin
