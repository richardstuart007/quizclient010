//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyFormikTextField from '../../components/controls/MyFormikTextField'
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

//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialValues = {
  email: '',
  password: ''
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
})
//===================================================================================
function QuizSignin() {
  if (debugLog) console.log('Start QuizSignin')
  const CurrentPage = 'QuizSignin'

  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const URL_BASE = snapShot.v_URL
  initialValues.email = snapShot.v_Email
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Deconstruct values
    //
    const { email, password } = values
    //
    //  Post to server
    //
    const URL = URL_BASE + URL_SIGNIN
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
          ValtioStore.v_PagePrevious = CurrentPage
          ValtioStore.v_Page = 'QuizRestart'
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
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Grid container>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
            enableReinitialize
          >
            <Form>
              {/*.................................................................................................*/}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MyFormikTextField name='email' label='email' />
                </Grid>
                <Grid item xs={12}>
                  <MyFormikTextField name='password' label='password' />
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Typography style={{ color: 'red' }}>
                    {form_message}
                  </Typography>
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <MyButton type='submit' text='SignIn' value='Submit' />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
      <QuizInfo />
    </>
  )
}

export default QuizSignin
