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
const debugModule = 'OptionsOwner'

//===================================================================================
const OptionsOwner = props => {
  //...................................................................................
  //.  Load Options
  //...................................................................................
  const LoadOptions = data => {
    if (debugFunStart) console.log('LoadOptions ')
    debugLog('Data ', data)
    //
    //  Options
    //
    let Options = []
    data.forEach(item => {
      const itemObj = {
        id: item.oowner,
        title: item.otitle
      }
      Options.push(itemObj)
    })
    //
    //  Store
    //
    ValtioStore.v_OptionsOwner = Options
    debugLog('Options ', Options)
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
      sqlTable: 'owner'
    }

    var myPromiseGet = MyQueryPromise(rowSelect(props))
    //
    //  Resolve Status
    //
    myPromiseGet.then(function (data) {
      if (debugFunStart) console.log('myPromiseGet')
      debugLog('myPromiseGet Final fulfilled')
      debugLog('data ', data)
      //
      //  Load Options from Data
      //
      if (data[0]) {
        LoadOptions(data)
      }
      //
      //  Return
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
  debugLog('sqlURL ', sqlURL)
  //
  //  SQL server
  //
  getRowAll()
}
export default OptionsOwner
