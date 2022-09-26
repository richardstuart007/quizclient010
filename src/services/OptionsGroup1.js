//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import rowSelect from './rowSelect'
//
//  Utilities
//
import { ValtioStore } from '../pages/ValtioStore'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'OptionsGroup1'
//===================================================================================
const OptionsGroup1 = props => {
  //...................................................................................
  //.  Load Options
  //...................................................................................
  const LoadOptions = data => {
    if (debugFunStart) console.log('LoadOptions ')
    if (debugLog) console.log('Data ', data)
    //
    //  Options
    //
    let Options = []
    data.forEach(item => {
      const itemObj = {
        id: item.g1id,
        title: item.g1title
      }
      Options.push(itemObj)
    })
    //
    //  Store
    //
    ValtioStore.v_OptionsGroup1 = Options
    if (debugLog) console.log('Options ', Options)
  }
  //.............................................................................
  //.  GET Data
  //.............................................................................
  const getRowAll = () => {
    if (debugFunStart) console.log('getRowAll')
    //
    //  Process promise
    //
    const props = {
      sqlURL: sqlURL,
      sqlTable: 'group1'
    }
    var myPromiseGet = MyQueryPromise(rowSelect(props))
    //
    //  Resolve Status
    //
    myPromiseGet.then(function (data) {
      if (debugFunStart) console.log('myPromiseGet')
      if (debugLog) console.log('myPromiseGet Final fulfilled')
      if (debugLog) console.log('data ', data)
      //
      //  Load Options from Data
      //
      if (data[0]) {
        LoadOptions(data)
      }
      //
      //  Return
      //
      return
    })
    //
    //  Return Promise
    //
    return myPromiseGet
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStart) console.log(debugModule)
  //
  //  Deconstruct props
  //
  const { sqlURL } = props
  if (debugLog) console.log('sqlURL ', sqlURL)
  //
  //  SQL server
  //
  getRowAll()
}
export default OptionsGroup1
