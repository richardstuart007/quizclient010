import TableRow from '@mui/material/TableRow'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizHandsTableCell from './QuizHandsTableCell'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
const QuizHandsTableLine = props => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('props ', props)
  //
  //  Destructure props
  //
  const { handObj, rowCount } = props
  if (g_log1) console.log('handObj ', handObj)
  if (g_log1) console.log('rowCount ', rowCount)

  const { position, hand } = handObj
  if (g_log1) console.log('position ', position)
  if (g_log1) console.log('hand ', hand)
  //
  //  Strip 'n' and replace with null
  //
  for (let i = 0; i < 4; i++) {
    if (hand[i] === 'n' || hand[i] === 'N') hand[i] = null
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <TableRow key={rowCount}>
      <QuizHandsTableCell cell='position' cellValue={position} />
      <QuizHandsTableCell cell='spades' cellValue={hand[0]} />
      <QuizHandsTableCell cell='hearts' cellValue={hand[1]} />
      <QuizHandsTableCell cell='diamonds' cellValue={hand[2]} />
      <QuizHandsTableCell cell='clubs' cellValue={hand[3]} />
    </TableRow>
  )
}

export default QuizHandsTableLine
