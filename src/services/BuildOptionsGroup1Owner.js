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
const debugModule = 'BuildOptionsGroup1Owner'
let debugStack = []
//===================================================================================
const BuildOptionsGroup1Owner = data => {
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

  debugLogging('Data ', data)
  //
  //  Options
  //
  let Group1OptionsOwner = []
  let itemObj = {
    qowner: '',
    qgroup1: '',
    g1title: ''
  }
  //
  //  Default ALL ?
  //
  const ShowAllGroup1 = false
  debugLogging('ShowAllGroup1 ', ShowAllGroup1)
  if (ShowAllGroup1) {
    itemObj = {
      qowner: 'All',
      qgroup1: 'All',
      g1title: 'All'
    }
    Group1OptionsOwner.push(itemObj)
  }
  //
  //  Load other values
  //
  data.forEach(item => {
    const itemObj = {
      qowner: item.qowner,
      qgroup1: item.qgroup1,
      g1title: item.g1title
    }
    Group1OptionsOwner.push(itemObj)
  })
  //
  //  Store Update
  //
  ValtioStore.v_Group1OptionsOwner = Group1OptionsOwner
  debugLogging('Group1OptionsOwner ', Group1OptionsOwner)

  debugFunEnd()
}
export default BuildOptionsGroup1Owner
