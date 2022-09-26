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
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//
//  Common Sub Components
//
import QuizInfo from '../Common/QuizInfo'
//
//  Utilities
//
import { useSnapshot } from 'valtio'
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_SIGNIN } = require('../../services/constants.js')
const sqlClient = 'Quiz/Signin'
//
// Debug Settings
//
const debugLog = debugSettings()
// const debugLogTest = false
const debugFunStartSetting = false
const debugModule = 'QuizRegister'

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
    if (debugFunStartSetting) console.log('validate')
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
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  //
  //  Validate
  //
  const FormSubmit = e => {
    if (debugFunStartSetting) console.log('FormSubmit')
    if (validate()) {
      FormUpdate()
    }
  }
  //...................................................................................
  //.  Update
  //...................................................................................
  const FormUpdate = () => {
    if (debugFunStartSetting) console.log('FormUpdate')
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
          setForm_message(`Signin successful with ID(${user.u_id})`)
          handlePage('QuizRestart')
          ValtioStore.v_Email = email
          ValtioStore.v_Name = user.u_name
          ValtioStore.v_SignedIn = true
        } else {
          setForm_message('Please REGISTER or email/password invalid')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStartSetting) console.log(debugModule)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  initialFValues.email = snapShot.v_Email
  //
  //  Get the URL
  //
  const Settings_URLJSON = sessionStorage.getItem('Settings_URL')
  const Settings_URL = JSON.parse(Settings_URLJSON)
  if (debugLog) console.log('Settings_URL ', Settings_URL)
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
            <MyInput name='email' label='email' value={values.email} onChange={handleInputChange} error={errors.email} />
          </Grid>
          <Grid item xs={12}>
            <MyInput name='password' label='password' value={values.password} onChange={handleInputChange} error={errors.password} />
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
      <QuizInfo />
    </>
  )
}

export default QuizSignin
