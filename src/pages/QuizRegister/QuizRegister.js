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
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugModule = 'QuizRegister'
//
// Constants
//
const { URL_REGISTER } = require('../../services/constants.js')
const sqlClient = 'Quiz/Register'
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialFValues = {
  name: '',
  fedid: '',
  fedcountry: 'NZ',
  email: '',
  password: ''
}
//===================================================================================
function QuizRegister({ handlePage }) {
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (debugFunStartSetting) console.log('validate')
    let temp = { ...errors }
    //
    //  name
    //
    if ('name' in fieldValues) {
      temp.name = fieldValues.name.length !== 0 ? '' : 'This field is required.'
    }
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
    const { name, email, password, fedid, fedcountry } = values
    if (debugLog) console.log('values ', values)
    //
    //  Post to server
    //
    const URL = App_Settings_URL + URL_REGISTER
    if (debugLog) console.log('email ', email)
    fetch(URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sqlClient: sqlClient,
        email: email,
        password: password,
        name: name,
        fedid: fedid,
        fedcountry: fedcountry
      })
    })
      .then(response => response.json())

      .then(user => {
        if (user.u_id) {
          setForm_message(`Data updated in Database with ID(${user.u_id})`)
          sessionStorage.setItem('User_Settings_User', JSON.stringify(user))
          handlePage('QuizSignin')
        } else {
          setForm_message('KEEP Trying, waiting for server')
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
  //  Get the URL
  //
  const App_Settings_URLJSON = sessionStorage.getItem('App_Settings_URL')
  const App_Settings_URL = JSON.parse(App_Settings_URLJSON)
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
        <Grid container spacing={2}>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 600 }}>
              <MyInput
                name='name'
                label='name'
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </Box>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={2}>
            <Box sx={{ mt: 2, maxWidth: 300 }}>
              <MyInput
                name='fedid'
                label='Bridge Federation Id'
                value={values.fedid}
                onChange={handleInputChange}
                error={errors.fedid}
              />
            </Box>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={2}>
            <Box sx={{ mt: 2, maxWidth: 300 }}>
              <MyInput
                name='fedcountry'
                label='Country'
                value={values.fedcountry}
                onChange={handleInputChange}
                error={errors.fedcountry}
              />
            </Box>
          </Grid>
          <Grid item xs={8}></Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 600 }}>
              <MyInput
                name='email'
                label='email'
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </Box>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxWidth: 600 }}>
              <MyInput
                name='password'
                label='password'
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
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
            text='Register'
            onClick={() => {
              FormSubmit()
            }}
          />
          {/*.................................................................................................*/}

          <MyButton
            color='warning'
            sx={{ float: 'right' }}
            onClick={() => {
              handlePage('QuizSignin')
            }}
            text='Signin'
          />
        </Box>
        {/*.................................................................................................*/}
      </MyForm>
    </>
  )
}

export default QuizRegister
