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
const debugModule = 'BuildOptionsGroup2'
let debugStack = []
//===================================================================================
const BuildOptionsGroup2 = data => {
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
  let Group2Options = [
    {
      id: 'All',
      title: 'All'
    }
  ]
  //
  //  Load other values
  //
  data.forEach(item => {
    const itemObj = {
      id: item.g2id,
      title: item.g2title
    }
    Group2Options.push(itemObj)
  })
  //
  //  Store
  //
  ValtioStore.v_Group2Options = Group2Options
  debugLogging('Group2Options ', Group2Options)

  debugFunEnd()
}
export default BuildOptionsGroup2
