//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Utilities debugFunStart
//
import { ValtioStore } from '../pages/ValtioStore'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'BuildOptionsOwner'
let debugStack = []
//===================================================================================
const BuildOptionsOwner = data => {
  //.............................................................................
  //.  Debug Logging
  //.............................................................................
  const debugLogging = (objtext, obj) => {
    if (debugLog) {
      //
      //  Object passed
      //
      let JSONobj = ''
      if (obj) {
        JSONobj = JSON.parse(JSON.stringify(obj))
      }
      //
      //  Output values
      //
      console.log('VALUES: Stack ', debugStack, objtext, JSONobj)
    }
  }
  //.............................................................................
  //.  function start
  //.............................................................................
  const debugFunStart = funname => {
    debugStack.push(funname)
    if (debugFunStartSetting)
      console.log('Stack: debugFunStart ==> ', funname, debugStack)
  }
  //.............................................................................
  //.  function End
  //.............................................................................
  const debugFunEnd = () => {
    if (debugStack.length > 1) {
      const funname = debugStack.pop()
      if (debugFunEndSetting)
        console.log('Stack: debugFunEnd <==== ', funname, debugStack)
    }
  }
  //.............................................................................
  //.  Main Line
  //.............................................................................
  debugStack = []
  debugFunStart(debugModule)

  debugLogging('Data Options Owner ', data)
  //
  //  Options
  //
  let OwnerOptions = []
  let itemObj = {
    id: '',
    title: ''
  }
  //
  //  Default ALL ?
  //
  const ShowAllOwner = false
  debugLogging('ShowAllOwner ', ShowAllOwner)
  if (ShowAllOwner) {
    itemObj = {
      id: 'All',
      title: 'All'
    }
    OwnerOptions.push(itemObj)
  }
  //
  //  Load other values
  //
  data.forEach(item => {
    itemObj = {
      id: item.oowner,
      title: item.otitle
    }
    OwnerOptions.push(itemObj)
  })
  //
  //  Store
  //
  ValtioStore.v_OwnerOptions = OwnerOptions
  debugLogging('OwnerOptions ', OwnerOptions)

  debugFunEnd()
}
export default BuildOptionsOwner
