import TableCell from '@mui/material/TableCell'
//
//  Libraries
//
import { Typography, Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'

//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
const QuizHandsTableCell = props => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('props ', props)
  //
  //  Destructure props
  //
  const { cell, cellValue } = props
  if (g_log1) console.log('cell ', cell)
  if (g_log1) console.log('cellValue ', cellValue)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      {/* .......................................................................................... */}
      {/*  Suit                                                                               */}
      {/* .......................................................................................... */}
      <TableCell key={cell} align='left' sx={{ padding: '0px' }}>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='body2'>{cellValue}</Typography>
          </Grid>

          {/* .......................................................................................... */}
        </Grid>
      </TableCell>
      {/* .......................................................................................... */}
    </>
  )
}

export default QuizHandsTableCell
