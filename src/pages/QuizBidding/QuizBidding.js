//
//  Libraries
//
import { Typography, Table, TableBody, Card } from '@mui/material'
import { cyan, teal } from 'material-ui-colors'
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//
//  Sub Components
//
import QuizBiddingTableHeader from './QuizBiddingTableHeader'
import QuizBiddingTableLine from './QuizBiddingTableLine'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizBidding = ({ qid }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('qid ', qid)
  let testingQid = qid
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Get store BiddingRow
  //
  let BiddingRowAll = []
  snapShot.v_Bidding.forEach(row => {
    const rowData = { ...row }
    BiddingRowAll.push(rowData)
  })
  if (g_log1) console.log('BiddingRowAll ', BiddingRowAll)
  //
  //  Find the BiddingRow
  //
  let BiddingRow = BiddingRowAll.find(element => element.bid === testingQid)
  if (g_log1) console.log('BiddingRow ', BiddingRow)
  //
  //  Has BiddingRow ?
  //
  let hasBidding
  BiddingRow === undefined ? (hasBidding = false) : (hasBidding = true)
  if (g_log1) console.log('hasBidding ', hasBidding)
  //
  //  No BiddingRow, return
  //
  if (hasBidding === false) return null
  //
  //  Build Bidding Arrays
  //
  let Rounds = [...BiddingRow.brounds]
  if (g_log1) console.log('BiddingRow.brounds ', BiddingRow.brounds)
  if (g_log1) console.log('Rounds ', Rounds)
  //
  //  Process each Round
  //
  let RoundCount = 0
  let roundsbidObjArray = []
  Rounds.forEach(round => {
    //
    //  Process each bid for a round - Create roundBidsArray
    //
    let bidObjArray = []
    round.forEach(bid => {
      if (g_log1) console.log('bid ', bid)
      //
      //  Fill bidObj (bid/suit)
      //
      const bidObj = {
        bid: '',
        suit: ''
      }
      const level = bid.substr(0, 1)
      if (g_log1) console.log('level ', level)
      switch (level) {
        // Pass
        case 'P':
          bidObj.bid = bid
          bidObj.suit = null
          break
        // Question
        case '?':
          bidObj.bid = bid
          bidObj.suit = null
          break
        // Double
        case 'X':
          bidObj.bid = bid
          bidObj.suit = null
          break
        //  Nothing
        case ' ':
          bidObj.bid = null
          bidObj.suit = null
          break
        //  Nothing
        case 'n':
          bidObj.bid = null
          bidObj.suit = null
          break
        //  Nothing
        case 'N':
          bidObj.bid = null
          bidObj.suit = null
          break
        default:
          //  No Trump
          if (bid.substr(1, 1) === 'N') {
            bidObj.bid = bid
            bidObj.suit = null
          }
          //  Suit
          else {
            bidObj.bid = level
            bidObj.suit = bid.substr(1, 1)
          }
          break
      }
      //
      //  Load bidObj to bidObjArray
      //
      bidObjArray.push(bidObj)
    })
    //
    //  Prefix bidObj with round number
    //
    if (g_log1) console.log('bidObjArray ', bidObjArray)
    const objTemp = {
      roundCount: '',
      innerArray: []
    }
    RoundCount++
    objTemp.roundCount = 'Round' + RoundCount.toString()
    objTemp.innerArray = bidObjArray
    //
    //  Load to all rounds (bidObj)
    //
    roundsbidObjArray.push(objTemp)
  })
  if (g_log1) console.log('roundsbidObjArray ', roundsbidObjArray)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Typography
        variant='subtitle2'
        style={{ color: teal['A700'] }}
        sx={{ marginTop: '8px' }}
      >
        Bidding
      </Typography>
      <Card sx={{ maxWidth: 400 }} style={{ backgroundColor: cyan['A100'] }}>
        <Table>
          {/* .......................................................................................... */}
          <QuizBiddingTableHeader />
          {/* .......................................................................................... */}
          <TableBody>
            {roundsbidObjArray.map(objTemp => (
              <QuizBiddingTableLine
                key={objTemp.roundCount}
                roundCount={objTemp.roundCount}
                round={objTemp.innerArray}
              />
            ))}
          </TableBody>
          {/* .......................................................................................... */}
        </Table>
      </Card>
    </>
  )
}

export default QuizBidding
