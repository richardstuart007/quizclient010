//
//  Libraries
//
import { useEffect } from 'react'
import { Grid, Box } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MyCheckbox from '../../components/controls/MyCheckbox'
import MySelect from '../../components/controls/MySelect'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//
//  Services
//
import MyQueryPromise from '../../services/MyQueryPromise'
import rowUpdate from '../../services/rowUpdate'
//
//  Form Initial Values
//
const initialFValues = {
  u_email: '',
  u_name: '',
  u_showprogress: true,
  u_showscore: true,
  u_sortquestions: true,
  u_skipcorrect: true,
  u_dftmaxquestions: 5,
  u_dftowner: '',
  u_fedcountry: '',
  u_fedid: ''
}
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'UsersSettings'
//...................................................................................
//.  Main Line
//...................................................................................
export default function UsersSettings({ handlePage }) {
  if (debugFunStart) console.log(debugModule)
  //
  //  On change of record, set State
  //
  useEffect(() => {
    //
    //  Get User
    //
    const recordForEdit = JSON.parse(sessionStorage.getItem('User_Settings_User'))
    if (debugLog) console.log('useEffect')
    if (debugLog) console.log('recordForEdit ', recordForEdit)
    //
    //  Update form values
    //
    setValues({
      ...recordForEdit
    })

    // eslint-disable-next-line
  }, [])
  //
  //  Get Store
  //
  const OptionsOwner = JSON.parse(sessionStorage.getItem('Data_Options_Owner'))
  if (debugLog) console.log('OptionsOwner ', OptionsOwner)
  //...................................................................................
  //
  // Validate the fields
  //
  const validate = (fieldValues = values) => {
    if (debugFunStart) console.log('validate')
    if (debugLog) console.log(fieldValues)
    //
    //  Load previous errors
    //
    let errorsUpd = { ...errors }
    //
    //  Validate current field
    //
    if ('u_email' in fieldValues)
      errorsUpd.u_email = fieldValues.u_email === '' ? 'This field is required.' : ''
    if ('u_name' in fieldValues)
      errorsUpd.u_name = fieldValues.u_name === '' ? 'This field is required.' : ''
    //
    //  MaxQuestions
    //
    if ('u_dftmaxquestions' in fieldValues)
      errorsUpd.u_dftmaxquestions =
        parseInt(fieldValues.u_dftmaxquestions) > 0 && parseInt(fieldValues.u_dftmaxquestions) <= 50
          ? ''
          : `You must select between 1 and 50.`
    //
    //  Set the errors
    //
    setErrors({
      ...errorsUpd
    })
    //
    //  Check if every element within the errorsUpd object is blank, then return true (valid), but only on submit when the fieldValues=values
    //
    if (fieldValues === values) {
      return Object.values(errorsUpd).every(x => x === '')
    }
  }
  //...................................................................................
  //
  //  UseMyForm
  //
  const { values, setValues, errors, setErrors, handleInputChange } = useMyForm(
    initialFValues,
    true,
    validate
  )
  //...................................................................................
  //.  Submit form
  //...................................................................................
  const handleSubmit = e => {
    if (debugFunStart) console.log('handleSubmit')
    e.preventDefault()
    //
    //  Validate & Update
    //
    if (validate()) {
      if (debugLog) console.log('values ', values)
      const { ...UpdateValues } = { ...values }
      if (debugLog) console.log('UpdateValues ', UpdateValues)
      //
      //  Store
      //
      sessionStorage.setItem('User_Settings_User', JSON.stringify(UpdateValues))
      //
      //  Update database
      //
      updateRowData(UpdateValues)
      //
      //  return to previous
      //
      handlePage('PAGEBACK')
    }
  }
  //.............................................................................
  //.  UPDATE
  //.............................................................................
  const updateRowData = data => {
    if (debugFunStart) console.log('updateRowData')
    //
    //  Data Received
    //
    if (debugLog) console.log('updateRowData Row ', data)
    //
    //  Populate Props
    //
    const props = {
      sqlTable: 'users',
      sqlWhere: `u_email = '${data.u_email}'`,
      sqlRow: data
    }
    if (debugLog) console.log('sqlWhere', props.sqlWhere)
    if (debugLog) console.log('sqlRow', props.sqlRow)
    //
    //  Process promise
    //
    var myPromiseUpdate = MyQueryPromise(rowUpdate(props))
    //
    //  Resolve Status
    //
    myPromiseUpdate.then(function (data) {
      if (debugLog) console.log('myPromiseUpdate data ', data)
      //
      //  No data
      //
      if (!data) {
        console.log('No Data returned')
        throw Error
      } else {
        //
        //  Get u_email
        //
        const rtn_u_email = data[0].u_email
        if (debugLog) console.log(`Row (${rtn_u_email}) UPDATED in Database`)
      }
      return
    })
    return
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm onSubmit={handleSubmit}>
        <Grid container>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={4}>
            <Box sx={{ mt: 2, maxWidth: 400 }}>
              <MyInput
                name='u_email'
                label='Email'
                value={values.u_email}
                onChange={handleInputChange}
                error={errors.u_email}
                disabled={true}
              />
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Box sx={{ mt: 2, maxWidth: 400 }}>
              <MyInput
                name='u_name'
                label='Name'
                value={values.u_name}
                onChange={handleInputChange}
                error={errors.u_name}
              />
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={4}>
            <Box sx={{ mt: 2, maxWidth: 200 }}>
              <MyInput
                name='u_fedcountry'
                label='Bridge Federation Country'
                value={values.u_fedcountry}
                onChange={handleInputChange}
                error={errors.u_fedcountry}
              />
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Box sx={{ mt: 2, maxWidth: 200 }}>
              <MyInput
                name='u_fedid'
                label='Bridge Federation ID'
                value={values.u_fedid}
                onChange={handleInputChange}
                error={errors.u_fedid}
              />
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={4}>
            <MyCheckbox
              name='u_showprogress'
              label='Show Linear Progress'
              value={values.u_showprogress}
              onChange={handleInputChange}
              error={errors.u_showprogress}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <MyCheckbox
              name='u_showscore'
              label='Show Linear Score'
              value={values.u_showscore}
              onChange={handleInputChange}
              error={errors.u_showscore}
            />
          </Grid>
          <Grid item xs={3}></Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={4}>
            <MyCheckbox
              name='u_sortquestions'
              label='Sort Questions'
              value={values.u_sortquestions}
              onChange={handleInputChange}
              error={errors.u_sortquestions}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <MyCheckbox
              name='u_skipcorrect'
              label='Skip Correct Answers'
              value={values.u_skipcorrect}
              onChange={handleInputChange}
              error={errors.u_skipcorrect}
            />
          </Grid>
          <Grid item xs={3}></Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={4}>
            <Box sx={{ mt: 2, maxWidth: 200 }}>
              <MyInput
                name='u_dftmaxquestions'
                label='Default Maximum Questions'
                value={values.u_dftmaxquestions}
                onChange={handleInputChange}
                error={errors.u_dftmaxquestions}
              />
            </Box>
          </Grid>
          <Grid item xs={8}></Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={4}>
            <Box sx={{ mt: 2, maxWidth: 200 }}>
              <MySelect
                key={OptionsOwner.id}
                name='u_dftowner'
                label='Default Owner'
                value={values.u_dftowner}
                onChange={handleInputChange}
                error={errors.u_dftowner}
                options={OptionsOwner}
              />
            </Box>
          </Grid>
          <Grid item xs={8}></Grid>
          {/*------------------------------------------------------------------------------ */}

          <Box sx={{ mt: 2, maxWidth: 600 }}>
            <MyButton
              type='submit'
              text='Update'
              color='primary'
              variant='contained'
              onClick={() => {
                handleSubmit()
              }}
            />
            {/* .......................................................................................... */}
            <MyButton
              type='submit'
              text='Back'
              color='warning'
              variant='contained'
              sx={{ float: 'right' }}
              onClick={() => {
                handlePage('PAGEBACK')
              }}
            />
          </Box>
          {/* .......................................................................................... */}
        </Grid>
      </MyForm>
    </>
  )
}
