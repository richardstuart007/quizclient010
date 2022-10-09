//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import BuildOptionsOwner from './BuildOptionsOwner'
import BuildOptionsGroup1Owner from './BuildOptionsGroup1Owner'
import BuildOptionsGroup2 from './BuildOptionsGroup2'
import BuildOptionsGroup3 from './BuildOptionsGroup3'
import getTable from './getTable'
//
//  Constants
//
const functionName = 'QuizSelectInit'
const { WAIT } = require('./constants.js')
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'QuizSelectInit'
//
//  Global
//
let g_DataOwner = false
let g_DataGroup1Owner = false
let g_DataGroup2 = false
let g_DataGroup3 = false
//===================================================================================
const QuizSelectInit = ({ handlePage }) => {
  //.............................................................................
  //
  //  Set Debug State
  //
  if (debugLog) console.log('Start QuizSelectInit')
  //...................................................................................
  //.  Load Server - Owner
  //...................................................................................
  const LoadServerOwner = () => {
    if (debugFunStart) console.log('LoadServerOwner')
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
      if (debugFunStart) console.log('myPromiseOwner')
      if (debugLog) console.log('myPromiseOwner data ', data)
      //
      //  Update Status
      //
      g_DataOwner = true
      //
      //  Load Options and Store
      //
      if (data) {
        BuildOptionsOwner(data)
      }
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
  const LoadServerGroup1Owner = () => {
    if (debugFunStart) console.log('LoadServerGroup1Owner')
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
      if (debugFunStart) console.log('myPromiseGroup1Owner')
      if (debugLog) console.log('myPromiseGroup1Owner data ', data)
      //
      //  Update Status
      //
      g_DataGroup1Owner = true
      //
      //  Load Options and Store
      //
      if (data) {
        BuildOptionsGroup1Owner(data)
      }
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
  const LoadServerGroup2 = () => {
    if (debugFunStart) console.log('LoadServerGroup2')
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
      if (debugFunStart) console.log('myPromiseGroup2')
      if (debugLog) console.log('myPromiseGroup2 data ', data)
      //
      //  Update Status
      //
      g_DataGroup2 = true
      //
      //  Load Options and Store
      //
      if (data) {
        BuildOptionsGroup2(data)
      }
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
  const LoadServerGroup3 = () => {
    if (debugFunStart) console.log('LoadServerGroup3')
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
      if (debugFunStart) console.log('myPromiseGroup3')
      if (debugLog) console.log('myPromiseGroup3 data ', data)
      //
      //  Update Status
      //
      g_DataGroup3 = true
      //
      //  Load Options and Store
      //
      if (data) {
        BuildOptionsGroup3(data)
      }
      return
    })
    //
    //  Return Promise
    //

    return myPromiseGroup3
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStart) console.log(debugModule)
  //
  //  Load data
  //
  LoadServerOwner()
  LoadServerGroup1Owner()
  LoadServerGroup2()
  LoadServerGroup3()
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
    if (g_DataOwner && g_DataGroup1Owner && g_DataGroup2 && g_DataGroup3) {
      if (debugLog) console.log('All DATA received totalWAIT = ', totalWAIT)
      clearInterval(myInterval)
      handlePage('QuizSelect')
    }
  }
}

export default QuizSelectInit
