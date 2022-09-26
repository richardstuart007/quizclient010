//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from '../../services/MyQueryPromise'
import getTable from '../../services/getTable'
//
//  Constants
//
const functionName = 'QuizSelectData'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugLogTest = false
const debugFunStart = false
const debugModule = 'QuizSelectData'

//===================================================================================
const QuizSelectData = props => {
  //...................................................................................
  //.  Load Server - Questions
  //...................................................................................
  const LoadServerQuestions = () => {
    if (debugFunStart) console.log('LoadServerQuestions')
    //
    //  Selection
    //
    let sqlString = `* from questions where qowner = '${qowner}' and qgroup1 = '${qgroup1}'`
    if (qgroup2 & (qgroup2 !== 'All'))
      sqlString = sqlString + ` qgroup2 = '${qgroup2}`
    if (qgroup3 & (qgroup3 !== 'All'))
      sqlString = sqlString + ` qgroup3 = '${qgroup3}`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'questions',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseQuestions = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseQuestions.then(function (Data_Questions) {
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Questions ', Data_Questions)
      const Data_QuestionsJSON = JSON.stringify(Data_Questions)
      sessionStorage.setItem('Data_Questions', Data_QuestionsJSON)
      const TimeStamp = Date.now()
      if (debugLogTest) console.log(`${TimeStamp} Data_Questions ==>`)
      //
      //  Return
      //
      return
    })
    //
    //  Return
    //
    return
  }
  //...................................................................................
  //.  Load Server - Bidding
  //...................................................................................
  const LoadServerBidding = () => {
    if (debugFunStart) console.log('LoadServerBidding')
    //
    //  Sub query of questions
    //
    let sqlSubQuery = `select qid from questions where qowner = '${qowner}' and qgroup1 = '${qgroup1}'`
    if (qgroup2 & (qgroup2 !== 'All'))
      sqlSubQuery = sqlSubQuery + ` qgroup2 = '${qgroup2}`
    if (qgroup3 & (qgroup3 !== 'All'))
      sqlSubQuery = sqlSubQuery + ` qgroup3 = '${qgroup3}`
    if (debugLog) console.log('sqlSubQuery', sqlSubQuery)
    //
    //  Selection
    //
    let sqlString = `* from bidding where bid in (${sqlSubQuery}) order by bid`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'bidding',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseBidding = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseBidding.then(function (Data_Bidding) {
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Bidding ', Data_Bidding)
      const Data_BiddingJSON = JSON.stringify(Data_Bidding)
      sessionStorage.setItem('Data_Bidding', Data_BiddingJSON)
      const TimeStamp = Date.now()
      if (debugLogTest) console.log(`${TimeStamp} Data_Bidding ==>`)
      //
      //  Return
      //
      return
    })
    //
    //  Return Promise
    //
    return
  }
  //...................................................................................
  //.  Load Server - Hands
  //...................................................................................
  const LoadServerHands = () => {
    if (debugFunStart) console.log('LoadServerHands')
    //
    //  Sub query of questions
    //
    let sqlSubQuery1 = `select qid from questions where qowner = '${qowner}' and qgroup1 = '${qgroup1}'`
    if (qgroup2 & (qgroup2 !== 'All'))
      sqlSubQuery1 = sqlSubQuery1 + ` qgroup2 = '${qgroup2}`
    if (qgroup3 & (qgroup3 !== 'All'))
      sqlSubQuery1 = sqlSubQuery1 + ` qgroup3 = '${qgroup3}`
    if (debugLog) console.log('sqlSubQuery1', sqlSubQuery1)
    //
    //  Selection
    //
    let sqlString = `* from hands where hid in (${sqlSubQuery1}) order by hid`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'hands',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseHands = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseHands.then(function (Data_Hands) {
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Hands ', Data_Hands)
      const Data_HandsJSON = JSON.stringify(Data_Hands)
      sessionStorage.setItem('Data_Hands', Data_HandsJSON)
      const TimeStamp = Date.now()
      if (debugLogTest) console.log(`${TimeStamp} Data_Hands ==>`)
      //
      //  Return
      //
      return
    })
    //
    //  Return
    //
    return
  }
  //...................................................................................
  //.  Load Server - Reflinks
  //...................................................................................
  const LoadServerReflinks = () => {
    if (debugFunStart) console.log('LoadServerReflinks')
    //
    //  Sub query of questions
    //
    let sqlSubQuery1 = `select qrefs[1] from questions where qowner = '${qowner}' and qgroup1 = '${qgroup1}'`
    if (qgroup2 & (qgroup2 !== 'All'))
      sqlSubQuery1 = sqlSubQuery1 + ` qgroup2 = '${qgroup2}`
    if (qgroup3 & (qgroup3 !== 'All'))
      sqlSubQuery1 = sqlSubQuery1 + ` qgroup3 = '${qgroup3}`
    if (debugLog) console.log('sqlSubQuery1', sqlSubQuery1)

    let sqlSubQuery2 = `select qrefs[2] from questions where qowner = '${qowner}' and qgroup1 = '${qgroup1}'`
    if (qgroup2 & (qgroup2 !== 'All'))
      sqlSubQuery2 = sqlSubQuery2 + ` qgroup2 = '${qgroup2}`
    if (qgroup3 & (qgroup3 !== 'All'))
      sqlSubQuery2 = sqlSubQuery2 + ` qgroup3 = '${qgroup3}`
    if (debugLog) console.log('sqlSubQuery2', sqlSubQuery2)
    //
    //  Selection
    //
    let sqlString = `* from reflinks where rref in (${sqlSubQuery1}) or rref in (${sqlSubQuery2}) order by rid`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'reflinks',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseReflinks = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseReflinks.then(function (Data_Reflinks) {
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Reflinks ', Data_Reflinks)
      const Data_ReflinksJSON = JSON.stringify(Data_Reflinks)
      sessionStorage.setItem('Data_Reflinks', Data_ReflinksJSON)
      const TimeStamp = Date.now()
      if (debugLogTest) console.log(`${TimeStamp} Data_Reflinks ==>`)
      //
      //  Return
      //
      return
    })
    //
    //  Return Promise
    //
    return
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStart) console.log(debugModule)
  //
  //  Deconstruct props
  //
  if (debugLog) console.log('props', props)
  const { qowner, qgroup1, qgroup2, qgroup3 } = props
  //
  //  Load data
  //
  LoadServerQuestions()
  LoadServerBidding()
  LoadServerHands()
  LoadServerReflinks()
  //
  //  Wait for data
  //
  const TimeStamp = Date.now()
  if (debugLogTest) console.log(`${TimeStamp} Get Store 1 ==>`)

  const myInterval = setTimeout(myTimer, 500)
  function myTimer() {
    const TimeStamp = Date.now()
    if (debugLogTest) console.log(`${TimeStamp} Get Store 2 ==>`)
    //
    //  Session Storage
    //
    const Data_QuestionsJSON = sessionStorage.getItem('Data_Questions')
    const Data_Questions = JSON.parse(Data_QuestionsJSON)
    if (debugLog) console.log(`Data_Questions ${Data_Questions.length}`)

    const Data_BiddingJSON = sessionStorage.getItem('Data_Bidding')
    const Data_Bidding = JSON.parse(Data_BiddingJSON)
    if (debugLog) console.log(`Data_Bidding ${Data_Bidding.length}`)

    const Data_HandsJSON = sessionStorage.getItem('Data_Hands')
    const Data_Hands = JSON.parse(Data_HandsJSON)
    if (debugLog) console.log(`Data_Hands ${Data_Hands.length}`)

    const Data_ReflinksJSON = sessionStorage.getItem('Data_Reflinks')
    const Data_Reflinks = JSON.parse(Data_ReflinksJSON)
    if (debugLog) console.log(`Data_Reflinks ${Data_Reflinks.length}`)
    if (debugLog) console.log(Data_Reflinks.length)

    clearTimeout(myInterval)
  }
}

export default QuizSelectData
