//
//  Libraries
//
import { useState } from 'react'
import { Paper, Grid, Typography } from '@mui/material'
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
//
// Constants
//
const { URL_SIGNIN } = require('../../services/constants.js')
const sqlClient = 'Quiz/Signin'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'QuizSignin'
//
//  Initial Values
//
const initialFValues = {
  email: '',
  password: ''
}
//...................................................................................
//.  Main Line
//...................................................................................
function QuizSignin({ handlePage }) {
  if (debugFunStart) console.log(debugModule)
  //
  //  Get the URL
  //
  const App_Settings_URL = JSON.parse(sessionStorage.getItem('App_Settings_URL'))
  //
  //  Get User
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  if (User_Settings_User) initialFValues.email = User_Settings_User.u_email
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useMyForm(initialFValues, true, validate)
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  function validate(fieldValues = values) {
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
  function FormSubmit(e) {
    if (debugFunStart) console.log('FormSubmit')
    if (validate()) {
      FormUpdate()
    }
  }
  //...................................................................................
  //.  Update
  //...................................................................................
  function FormUpdate() {
    if (debugFunStart) console.log('FormUpdate')
    //
    //  Deconstruct values
    //
    const { email, password } = values
    setForm_message('Email/Password being checked')
    //
    //  Post to server
    //
    const URL = App_Settings_URL + URL_SIGNIN
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
          setForm_message('Email/Password correct, signin being processed')
          ProcessSignIn(user, email)
        } else {
          setForm_message('KEEP TRYING (else REGISTER first)')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
  }
  //...................................................................................
  //.  Process User Signin
  //...................................................................................
  function ProcessSignIn(user, email) {
    if (debugFunStart) console.log('ProcessSignIn')
    //
    //  User Info
    //
    sessionStorage.setItem('User_Settings_User', JSON.stringify(user))
    sessionStorage.setItem('User_Settings_UserAdmin', JSON.stringify(user.u_admin))
    sessionStorage.setItem('User_Settings_UserSwitch', JSON.stringify(false))
    //
    //  Signed In
    //
    sessionStorage.setItem('User_Settings_SignedIn', true)
    //
    //  Initialise storage status
    //
    sessionStorage.setItem('Data_Options_Owner_Received', false)
    sessionStorage.setItem('Data_Options_Group1Owner_Received', false)
    sessionStorage.setItem('Data_Options_Group2_Received', false)
    sessionStorage.setItem('Data_Options_Group3_Received', false)
    //
    //  Get the Selection Options
    //
    GetBuildOptionsOwner()
    GetBuildOptionsGroup1Owner()
    GetBuildOptionsGroup2()
    GetBuildOptionsGroup3()
    //
    //  Change Page
    //
    handlePage('RefLibrary')
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm>
        <Paper
          sx={{
            margin: 3,
            padding: 1,
            maxWidth: 400,
            backgroundColor: 'whitesmoke',
            elevation: 12
          }}
        >
          <Grid
            container
            spacing={2}
            justify='center'
            alignItems='center'
            direction='column'
            style={{ minheight: '100vh' }}
          >
            {/*.................................................................................................*/}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant='h6' style={{ color: 'blue' }}>
                SignIn Page
              </Typography>
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='email'
                label='email'
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
                sx={{ backgroundColor: 'azure' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='password'
                label='password'
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
                sx={{ backgroundColor: 'azure' }}
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
          </Grid>
        </Paper>
        {/*.................................................................................................*/}
        <Grid item xs={12}>
          <MyButton
            color='warning'
            onClick={() => {
              handlePage('QuizRegister')
            }}
            text='Register'
          />
        </Grid>
        {/*.................................................................................................*/}
      </MyForm>
    </>
  )
}

export default QuizSignin
