//
//  Libraries
//
import { Grid, Box, Container } from '@mui/material'
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizInfo = ({ page }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Retrieve the state
  //
  const pageprevious = JSON.parse(sessionStorage.getItem('Settings_v_PagePrevious'))
  if (debugLog) console.log('Settings_v_PagePrevious ', pageprevious)
  const name = JSON.parse(sessionStorage.getItem('Settings_v_Name'))
  const email = JSON.parse(sessionStorage.getItem('Settings_v_Email'))
  const owner = JSON.parse(sessionStorage.getItem('Settings_v_Owner'))
  const group1 = JSON.parse(sessionStorage.getItem('Settings_v_Group1'))
  const group2 = JSON.parse(sessionStorage.getItem('Settings_v_Group2'))
  const group3 = JSON.parse(sessionStorage.getItem('Settings_v_Group3'))
  const DataSource = 'Server'
  //
  //  Show Info ?
  //
  const ShowInfo = JSON.parse(sessionStorage.getItem('Settings_v_ShowInfo'))
  if (debugLog) console.log('ShowInfo ', ShowInfo)
  if (ShowInfo === false) return null
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <footer>
      <Box bgcolor='DodgerBlue' color='white' sx={{ p: 1, mt: 1 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Page</Box>
              <Box>{page}</Box>
              <Box>{pageprevious}</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>User</Box>
              <Box>{name}</Box>
              <Box>{email}</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{`Selection (${DataSource})`}</Box>
              {{ owner } ? <Box>{owner}</Box> : null}
              {{ group1 } ? <Box>{group1}</Box> : null}
              {{ group2 } ? <Box>{group2}</Box> : null}
              {{ group3 } ? <Box>{group3}</Box> : null}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default QuizInfo
