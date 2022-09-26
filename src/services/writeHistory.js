//
//  Utilities
//
import rowUpsert from './rowUpsert'
import MyQueryPromise from './MyQueryPromise'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
function writeHistory(sqlRow) {
  //
  //  Data Received
  //
  if (debugLog) console.log('sqlRow ', sqlRow)
  //
  //  Build Props
  //
  const props = {
    sqlTable: 'usershistory',
    sqlKeyName: ['r_email', 'r_datetime'],
    sqlRow: sqlRow
  }
  //
  //  Process promise
  //
  if (debugLog) console.log('rowUpsert')
  var myPromiseInsert = MyQueryPromise(rowUpsert(props))
  //
  //  Resolve Status
  //
  myPromiseInsert.then(function (data) {
    if (debugLog) console.log('myPromiseInsert data ', data)
    //
    //  No data returned
    //
    if (!data) {
      console.log('No Data returned')
      throw Error
    } else {
      //
      //  Get ID
      //
      const rtn_r_id = data[0].r_id
      if (debugLog) console.log(`Row (${rtn_r_id}) UPSERTED in Database`)
    }
    return
  })
  //
  //  Return Promise
  //
  return myPromiseInsert
}

export default writeHistory
