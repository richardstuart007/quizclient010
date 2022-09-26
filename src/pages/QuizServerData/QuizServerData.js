//
//  Libraries
//
import { useEffect, useState } from 'react'

import { Container, Typography, TableBody, TableRow, TableCell, Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//

import MyButton from '../../components/controls/MyButton'
import useMyTable from '../../components/controls/useMyTable'
//
//  Common Sub Components
//
import QuizInfo from '../Common/QuizInfo'
//
//  Services
//
import MyQueryPromise from '../../services/MyQueryPromise'
import BuildOptionsOwner from '../../services/BuildOptionsOwner'
import BuildOptionsGroup1Owner from '../../services/BuildOptionsGroup1Owner'
import BuildOptionsGroup2 from '../../services/BuildOptionsGroup2'
import BuildOptionsGroup3 from '../../services/BuildOptionsGroup3'
import getTable from '../../services/getTable'
//
//  Constants
//
const functionName = 'QuizServerData'
const FULFILLED = 'Fulfilled'
const REJECTED = 'Rejected'
const NODATA = 'No Data Found'
//
//  Table Heading
//
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'table', label: 'Table' },
  { id: 'status', label: 'Status' },
  { id: 'count', label: 'Count' }
]
//
//  Table Detail
//
let records = [
  { id: 1, table: 'Owner', status: 'Pending', count: 0 },
  { id: 2, table: 'Group1Owner', status: 'Pending', count: 0 },
  { id: 3, table: 'Group2', status: 'Pending', count: 0 },
  { id: 4, table: 'Group3', status: 'Pending', count: 0 }
]
//
//  Global variables
//
let g_PromiseCount = 0
const g_PromiseTotal = records.length
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'QuizServerData'

//===================================================================================
const QuizServerData = ({ handlePage }) => {
  //.............................................................................
  //
  //  Set Debug State
  //
  if (debugLog) console.log('Start QuizServerData')

  const filterFn = {
    fn: items => {
      return items
    }
  }
  //
  //  Status of fetches
  //
  const [fulfilled, setFulfilled] = useState(false)
  //...................................................................................
  //.  Load Server - Owner
  //...................................................................................
  const LoadServerOwner = idx => {
    if (debugFunStart) console.log('LoadServerOwner')
    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'owner',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'oowner'
    }
    const myPromiseOwner = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseOwner.then(function (data) {
      g_PromiseCount++
      if (debugFunStart) console.log('myPromiseOwner')
      if (debugLog) console.log('myPromiseOwner data ', data)
      //
      //  Update Status
      //
      if (myPromiseOwner.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseOwner.isRejected()) {
        if (debugLog) console.log('records[idx].status ', records[idx].status)
        status = REJECTED
        records[idx].status = status
      }
      if (debugLog) console.log('OWNER status ', status)
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (debugLog) console.log('OWNER count', count)
        //
        //  Load Options and Store
        //
        if (debugLog) console.log('OWNER call BuildOptionsOwner ')
        BuildOptionsOwner(data)
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
      //
      //  Return
      //
      return
    })
    //
    //  Return Promise
    //
    return myPromiseOwner
  }
  //...................................................................................
  //.  Load Server - Group1Owner
  //...................................................................................
  const LoadServerGroup1Owner = idx => {
    if (debugFunStart) console.log('LoadServerGroup1Owner')

    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'group1',
      sqlAction: 'SELECTSQL',
      sqlString:
        'qowner, qgroup1, g1title from questions join group1 on qgroup1 = g1id group by qowner, qgroup1 ,g1title order by qowner, qgroup1'
    }
    const myPromiseGroup1Owner = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup1Owner.then(function (data) {
      g_PromiseCount++
      if (debugFunStart) console.log('myPromiseGroup1Owner')
      if (debugLog) console.log('myPromiseGroup1Owner data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup1Owner.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseGroup1Owner.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        if (debugLog) console.log('countGroup1Owner count', count)
        //
        //  Load Options and Store
        //
        BuildOptionsGroup1Owner(data)
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
      //
      //  Return
      //

      return
    })

    //
    //  Return Promise
    //

    return myPromiseGroup1Owner
  }
  //...................................................................................
  //.  Load Server - Group2
  //...................................................................................
  const LoadServerGroup2 = idx => {
    if (debugFunStart) console.log('LoadServerGroup2')
    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'group2',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'g2id'
    }
    const myPromiseGroup2 = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup2.then(function (data) {
      g_PromiseCount++
      if (debugFunStart) console.log('myPromiseGroup2')
      if (debugLog) console.log('myPromiseGroup2 data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup2.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseGroup2.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (debugLog) console.log('countGroup2 count', count)
        //
        //  Update Store
        //
        BuildOptionsGroup2(data)
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
      //
      //  Return
      //

      return
    })

    //
    //  Return Promise
    //

    return myPromiseGroup2
  }
  //...................................................................................
  //.  Load Server - Group3
  //...................................................................................
  const LoadServerGroup3 = idx => {
    if (debugFunStart) console.log('LoadServerGroup3')
    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'group3',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'g3id'
    }
    const myPromiseGroup3 = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup3.then(function (data) {
      g_PromiseCount++
      if (debugFunStart) console.log('myPromiseGroup3')
      if (debugLog) console.log('myPromiseGroup3 data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup3.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
        if (debugLog) console.log('records[idx].status ', records[idx].status)
      }
      if (myPromiseGroup3.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        if (debugLog) console.log('countGroup3 count', count)

        //
        //  Update Store
        //
        BuildOptionsGroup3(data)
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
      //
      //  Return
      //

      return
    })

    //
    //  Return Promise
    //

    return myPromiseGroup3
  }
  //...................................................................................
  //.  Load the dropdown options
  //...................................................................................
  const LoadOptions = () => {
    if (debugFunStart) console.log('LoadOptions')
    //
    //  Load data
    //
    g_PromiseCount = 0
    LoadServerOwner(0)
    LoadServerGroup1Owner(1)
    LoadServerGroup2(2)
    LoadServerGroup3(3)
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const SubmitForm = e => {
    if (debugFunStart) console.log('SubmitForm')
    handlePage('QuizSelect')
  }
  //...................................................................................
  //.  Update Fetch Status
  //...................................................................................
  const updateFetchStatus = () => {
    if (debugFunStart) console.log('updateFetchStatus')
    //
    //  Status value
    //
    const notFulfilled = records.some(record => record.status !== FULFILLED)
    const newFulfilled = !notFulfilled
    //
    //  Change to Fulfilled if ALL fulfilled
    //
    if (newFulfilled) {
      setFulfilled(newFulfilled)
      if (debugLog) console.log('newFulfilled Final', newFulfilled)
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStart) console.log(debugModule)

  useEffect(() => {
    LoadOptions()
    // eslint-disable-next-line
  }, [])
  //...................................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination } = useMyTable(records, headCells, filterFn)
  if (debugLog) console.log('Render the Form ')
  if (debugLog) console.log('records ', records)
  if (debugLog) console.log('g_PromiseCount ', g_PromiseCount)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {/*.................................................................................................*/}
          <TblContainer>
            <TblHead />
            <TableBody>
              {records.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.table}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            {fulfilled ? (
              <MyButton
                text='Quiz Selection'
                onClick={() => {
                  SubmitForm()
                }}
              />
            ) : (
              <Typography>All data not received</Typography>
            )}
          </Grid>
          {/*.................................................................................................*/}
        </Grid>
      </Container>
      <QuizInfo />
    </>
  )
}

export default QuizServerData
