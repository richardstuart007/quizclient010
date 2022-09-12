//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Utilities
//
import { ValtioStore } from '../pages/ValtioStore'
//
//  Services
//
import BuildOptionsOwner from '../services/BuildOptionsOwner'
import BuildOptionsGroup1Owner from '../services/BuildOptionsGroup1Owner'
import BuildOptionsGroup2 from '../services/BuildOptionsGroup2'
import BuildOptionsGroup3 from '../services/BuildOptionsGroup3'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'QuizStaticData'
let debugStack = []
//===================================================================================
const QuizStaticData = () => {
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
  //...................................................................................
  //.  Load Static - Owner
  //...................................................................................
  const LoadStaticOwner = () => {
    debugFunStart('LoadStaticOwner')
    //
    //  Data
    //
    const { OWNER } = require('./DataOwner.js')
    //
    //  Load Options and Store
    //
    BuildOptionsOwner(OWNER)

    debugFunEnd()
  }
  //...................................................................................
  //.  Load Static - Group1 for OWNER
  //...................................................................................
  const LoadStaticGroup1Owner = () => {
    debugFunStart('LoadStaticGroup1Owner')
    //
    //  Data
    //
    const { GROUP1OWNER } = require('./DataGroup1Owner.js')
    //
    //  Load Options and Store
    //
    BuildOptionsGroup1Owner(GROUP1OWNER)

    debugFunEnd()
  }
  //...................................................................................
  //.  Load Static - Group2
  //...................................................................................
  const LoadStaticGroup2 = () => {
    debugFunStart('LoadStaticGroup2')
    //
    //  Data
    //
    const { GROUP2 } = require('./DataGroup2.js')
    //
    //  Load Options and Store
    //
    BuildOptionsGroup2(GROUP2)

    debugFunEnd()
  }
  //...................................................................................
  //.  Load Static - Group3
  //...................................................................................
  const LoadStaticGroup3 = () => {
    debugFunStart('LoadStaticGroup3')
    //
    //  Data
    //
    const { GROUP3 } = require('./DataGroup3.js')
    //
    //  Load Options and Store
    //
    BuildOptionsGroup3(GROUP3)

    debugFunEnd()
  }

  //...................................................................................
  //.  Main Line
  //...................................................................................
  debugStack = []
  debugFunStart(debugModule)
  debugLogging('Start Main Line')
  //
  //  Owner
  //
  LoadStaticOwner()
  //
  //  Groups
  //
  LoadStaticGroup1Owner()
  LoadStaticGroup2()
  LoadStaticGroup3()
  //
  //  Questions
  //
  const { QUESTIONS } = require('./DataQuestions.js')
  ValtioStore.v_Questions = QUESTIONS
  debugLogging('QUESTIONS ', QUESTIONS)
  //
  //  Hands
  //
  const { HANDS } = require('./DataHands.js')
  ValtioStore.v_Hands = HANDS
  debugLogging('HANDS ', HANDS)
  //
  //  Bidding
  //
  const { BIDDING } = require('./DataBidding.js')
  ValtioStore.v_Bidding = BIDDING
  debugLogging('BIDDING ', BIDDING)
  //
  //  Links
  //
  const { REFLINKS } = require('./DataRefLinks.js')
  ValtioStore.v_RefLinks = REFLINKS
  debugLogging('REFLINKS ', REFLINKS)
}
export default QuizStaticData
