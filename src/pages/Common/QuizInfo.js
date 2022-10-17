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
const QuizInfo = () => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Retrieve the state
  //
  const pageCurrent = JSON.parse(sessionStorage.getItem('Settings_Page_Current'))
  const pagePrevious = JSON.parse(sessionStorage.getItem('Settings_Page_Previous'))

  let name = ''
  const nameJSON = sessionStorage.getItem('Settings_Name')
  if (nameJSON !== '') name = JSON.parse(nameJSON)

  let email = ''
  const emailJSON = sessionStorage.getItem('Settings_Email')
  if (emailJSON !== '') email = JSON.parse(emailJSON)
  let uid = 0
  const uidJSON = sessionStorage.getItem('Settings_Uid')
  if (uidJSON !== 0) uid = JSON.parse(uidJSON)

  let owner = ''
  const ownerJSON = sessionStorage.getItem('Settings_Owner')
  if (ownerJSON !== '') owner = JSON.parse(ownerJSON)

  let group1 = ''
  const group1JSON = sessionStorage.getItem('Settings_Group1')
  if (group1JSON !== '') group1 = JSON.parse(group1JSON)

  let group2 = ''
  const group2JSON = sessionStorage.getItem('Settings_Group2')
  if (group2JSON !== '') group2 = JSON.parse(group2JSON)

  let group3 = ''
  const group3JSON = sessionStorage.getItem('Settings_Group3')
  if (group3JSON !== '') group3 = JSON.parse(group3JSON)

  //
  //  Show Info ?
  //
  const ShowInfo = JSON.parse(sessionStorage.getItem('Settings_ShowInfo'))
  if (debugLog) console.log('ShowInfo ', ShowInfo)
  if (ShowInfo === false) return null
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <footer>
      <Box bgcolor='LightGray' color='white' sx={{ p: 1, mt: 1 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Page</Box>
              <Box>{pageCurrent}</Box>
              <Box>{pagePrevious}</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>User</Box>
              <Box>{name}</Box>
              <Box>
                {uid}:{email}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Selection</Box>
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
