//
//  Utilities
//
import rowUpsert from './rowUpsert'
import MyQueryPromise from '../components/controls/MyQueryPromise'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
function writeUsersResults(props) {
  //===================================================================================
  //.............................................................................
  //.  INSERT
  //.............................................................................
  const insertRowData = (sqlURL, sqlRow) => {
    //
    //  Data Received
    //
    if (debugLog) console.log('sqlURL ', sqlURL)
    if (debugLog) console.log('sqlRow ', sqlRow)
    //
    //  Build Props
    //
    const props = {
      sqlURL: sqlURL,
      sqlTable: 'usersresults',
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
  //--------------------------------------------------------------------
  //-  Main Line
  //--------------------------------------------------------------------
  if (debugLog) console.log('Start writeResults')
  //
  //  Deconstruct
  //
  const { sqlURL, sqlRow } = props
  if (debugLog) console.log('props: ', props)
  //
  // Database Update
  //
  insertRowData(sqlURL, sqlRow)
}

export default writeUsersResults
