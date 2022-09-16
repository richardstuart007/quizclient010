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
import QuizHandsTableHeader from './QuizHandsTableHeader'
import QuizHandsTableLine from './QuizHandsTableLine'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizHands = ({ qid }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugLog) console.log('qid ', qid)
  let testingQid = qid
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Get store HandsRow (ALL)
  //
  let HandsRowAll = []
  snapShot.v_Hands.forEach(row => {
    const rowData = { ...row }
    HandsRowAll.push(rowData)
  })
  if (debugLog) console.log('HandsRowAll ', HandsRowAll)
  //
  //  Find the HandsRow for this ID
  //
  let HandsRow = HandsRowAll.find(element => element.hid === testingQid)
  if (debugLog) console.log('HandsRow ', HandsRow)
  //
  //  Has HandsRow ?
  //
  let hasHands
  HandsRow === undefined ? (hasHands = false) : (hasHands = true)
  if (debugLog) console.log('hasHands ', hasHands)
  //
  //  No HandsRow, return
  //
  if (hasHands === false) return null
  //
  //  Build HandObj Array - N/E/S/W
  //
  let HandObjArray = []
  let RowCount = 0
  if (debugLog) console.log('HandsRow', HandsRow)
  //
  //  North
  //
  if (HandsRow.hnorth) {
    RowCount++
    const handObj = {
      rowCount: 'RowCount' + RowCount.toString(),
      position: 'North',
      hand: []
    }
    handObj.hand = [...HandsRow.hnorth]
    HandObjArray.push(handObj)
  }
  //
  //  East
  //
  if (HandsRow.heast) {
    RowCount++
    const handObj = {
      rowCount: 'RowCount' + RowCount.toString(),
      position: 'East',
      hand: []
    }
    handObj.hand = [...HandsRow.heast]
    HandObjArray.push(handObj)
  }
  //
  //  South
  //
  if (HandsRow.hsouth) {
    RowCount++
    const handObj = {
      rowCount: 'RowCount' + RowCount.toString(),
      position: 'South',
      hand: []
    }
    handObj.hand = [...HandsRow.hsouth]
    HandObjArray.push(handObj)
  }
  //
  //  West
  //
  if (HandsRow.hwest) {
    RowCount++
    const handObj = {
      rowCount: 'RowCount' + RowCount.toString(),
      position: 'West',
      hand: []
    }
    handObj.hand = [...HandsRow.hwest]
    HandObjArray.push(handObj)
  }
  if (debugLog) console.log('HandObjArray ', HandObjArray)
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
        Hands
      </Typography>

      <Card sx={{ maxWidth: 500 }} style={{ backgroundColor: cyan['A100'] }}>
        <Table>
          {/* .......................................................................................... */}
          <QuizHandsTableHeader />
          {/* .......................................................................................... */}
          <TableBody>
            {HandObjArray.map(handObj => (
              <QuizHandsTableLine
                key={handObj.rowCount}
                handObj={handObj}
                rowCount={handObj.rowCount}
              />
            ))}
          </TableBody>
          {/* .......................................................................................... */}
        </Table>
      </Card>
    </>
  )
}

export default QuizHands
