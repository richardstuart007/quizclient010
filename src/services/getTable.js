//
//  Utilities
//
import apiAxios from './apiAxios'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Constants
//
const functionName = 'getTable'
const { URL_TABLES } = require('./constants.js')
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
async function getTable(props) {
  if (debugLog) console.log('Start getTable')
  if (debugLog) console.log('props ', props)
  const timeStart = new Date()
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  const fetchItems = async () => {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      let body
      sqlAction === 'SELECT'
        ? (body = {
            sqlClient: sqlClient,
            sqlTable: sqlTable,
            sqlAction: sqlAction,
            sqlWhere: sqlWhere,
            sqlOrderByRaw: sqlOrderByRaw
          })
        : (body = {
            sqlClient: sqlClient,
            sqlTable: sqlTable,
            sqlAction: sqlAction,
            sqlString: sqlString
          })

      const URL = Settings_URL + URL_TABLES
      if (debugLog) console.log('URL ', URL)
      //
      //  SQL database
      //
      let resultData = []
      resultData = await apiAxios(method, URL, body)
      if (debugLog) console.log('Axios Data fetched ', resultData)
      const timeEnd = new Date()
      const timeDiff = timeEnd - timeStart
      if (debugLog)
        console.log(
          `sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) Elapsed Time(${timeDiff})`
        )
      //
      // No data
      //
      if (!resultData[0]) {
        console.log(
          `No data received: sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) `
        )
      }
      //
      // Return data
      //
      if (debugLog) console.log('Return Data', resultData)
      return resultData
      //
      // Errors
      //
    } catch (err) {
      const resultData = []
      console.log(err.message)
      return resultData
    }
  }
  //--------------------------------------------------------------------
  //-  Main Line
  //--------------------------------------------------------------------
  if (debugLog) console.log('Start getTable')
  //
  //  Deconstruct props
  //
  const {
    sqlCaller,
    sqlTable,
    sqlAction = 'SELECT',
    sqlWhere = '',
    sqlOrderByRaw = '',
    sqlString = ''
  } = props
  if (debugLog) console.log('props ', props)
  let sqlClient = `${functionName}/${sqlCaller}`
  //
  //  Get the URL
  //
  const Settings_URLJSON = sessionStorage.getItem('Settings_URL')
  const Settings_URL = JSON.parse(Settings_URLJSON)
  if (debugLog) console.log('Settings_URL ', Settings_URL)
  //
  // Fetch the data
  //
  const promise = fetchItems()
  //
  // Return promise
  //
  if (debugLog) console.log('Return Promise', promise)
  return promise
}

export default getTable
