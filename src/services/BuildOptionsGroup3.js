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
const debugModule = 'BuildOptionsGroup3'
let debugStack = []
//===================================================================================
const BuildOptionsGroup3 = data => {
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
  let Group3Options = [
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
      id: item.g3id,
      title: item.g3title
    }
    Group3Options.push(itemObj)
  })
  //
  //  Store
  //
  ValtioStore.v_Group3Options = Group3Options
  debugLogging('Group3Options ', Group3Options)

  debugFunEnd()
}
export default BuildOptionsGroup3
