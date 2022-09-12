//
//  Libraries
//
import { TableCell, TableHead, TableRow } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Styles
//
const useStyles = makeStyles({
  tableCell: {
    maxWidth: '100px'
  }
})
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizBiddingTableHeader = () => {
  //
  //  Styles
  //
  const classes = useStyles()
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('Start QuizBiddingTableHeader')

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <TableHead>
        <TableRow key={'TableHeader'}>
          {/* .......................................................................................... */}
          <TableCell
            key='North'
            sx={{ padding: '0px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            North
          </TableCell>
          {/* .......................................................................................... */}
          <TableCell
            key='East'
            sx={{ padding: '0px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            East
          </TableCell>
          {/* .......................................................................................... */}
          <TableCell
            key='South'
            sx={{ padding: '0px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            South
          </TableCell>
          {/* .......................................................................................... */}
          <TableCell
            key='West'
            sx={{ padding: '0px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            West
          </TableCell>
          {/* .......................................................................................... */}
        </TableRow>
      </TableHead>
    </>
  )
}

export default QuizBiddingTableHeader
