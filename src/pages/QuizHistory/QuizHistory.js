//
//  Libraries
//
import { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import ScoreboardIcon from '@mui/icons-material/Scoreboard'
import QuizIcon from '@mui/icons-material/Quiz'
import { format, parseISO } from 'date-fns'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
import PageHeader from '../../components/controls/PageHeader'
import useMyTable from '../../components/controls/useMyTable'
import MyActionButton from '../../components/controls/MyActionButton'
//
//  Services
//
import MyQueryPromise from '../../services/MyQueryPromise'
import getTable from '../../services/getTable'
import BuildQuizData from '../../services/BuildQuizData'
import BuildHistoryDetail from '../../services/BuildHistoryDetail'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  searchInput: {
    width: '25%'
  },
  searchInputTypeBox: {
    width: '10%',
    margin: `0 0 0 ${theme.spacing(2)}`
  }
}))
//
//  Table Heading
//
const headCells = [
  { id: 'r_id', label: 'ID' },
  { id: 'yymmdd', label: 'Date' },
  { id: 'r_owner', label: 'Owner' },
  { id: 'g1title', label: 'Group 1' },
  { id: 'r_questions', label: 'Questions' },
  { id: 'r_correct', label: 'Correct' },
  { id: 'r_percent', label: '%' },
  { id: 'review', label: 'Review', disableSorting: true },
  { id: 'quiz', label: 'Quiz', disableSorting: true }
]
const searchTypeOptions = [
  { id: 'r_id', title: 'ID' },
  { id: 'yymmdd', title: 'Date' },
  { id: 'r_owner', title: 'Owner' },
  { id: 'g1title', title: 'Group 1' }
]
//
let subTitle
//
//  Constants
//
const functionName = 'QuizHistory'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
//...................................................................................
//.  Main Line
//...................................................................................
export default function QuizHistory({ handlePage }) {
  //
  //  Start of function
  //
  if (debugFunStart) console.log(`Function: ${functionName}`)
  //
  //  Styles
  //
  const classes = useStyles()
  //
  //  State
  //
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })
  const [searchType, setSearchType] = useState('g1title')
  const [searchValue, setSearchValue] = useState('')
  const [startPage0, setStartPage0] = useState(false)
  //
  //  Reset Quiz State
  //
  let QuizHistory_Reset = JSON.parse(sessionStorage.getItem('QuizHistory_Reset'))
  if (debugLog) console.log('QuizHistory_Reset ', QuizHistory_Reset)
  //
  //  Initial Data Load
  //
  useEffect(() => {
    handleQuizReset()
    // eslint-disable-next-line
  }, [])
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useMyTable(
    records,
    headCells,
    filterFn,
    startPage0,
    setStartPage0
  )
  //...................................................................................
  //.  Reset the Quiz
  //...................................................................................
  function handleQuizReset() {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: handleQuizReset`)
    //
    //  Restore saved search values & search
    //
    if (!QuizHistory_Reset) {
      const QuizHistory_SearchValue = JSON.parse(sessionStorage.getItem('QuizHistory_SearchValue'))
      setSearchValue(QuizHistory_SearchValue)
      if (debugLog) console.log('QuizHistory_SearchValue ', QuizHistory_SearchValue)

      const QuizHistory_SearchType = JSON.parse(sessionStorage.getItem('QuizHistory_SearchType'))
      setSearchType(QuizHistory_SearchType)
      if (debugLog) console.log('QuizHistory_SearchType ', QuizHistory_SearchType)
    }
    //
    //  Reset flag
    //
    sessionStorage.setItem('QuizHistory_Reset', false)
    QuizHistory_Reset = false
    if (debugLog) console.log('QuizHistory_Reset ', false)
    //
    //  Get Data
    //
    getRowAllData()
  }
  //.............................................................................
  //.  GET ALL
  //.............................................................................
  function getRowAllData() {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: getRowAllData`)
    //
    //  Get User
    //
    const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
    const name = User_Settings_User.u_name
    const email = User_Settings_User.u_email
    const uid = User_Settings_User.u_id
    subTitle = `${name} (${uid})`
    //
    //  Selection
    //
    let sqlString = `r_id, r_datetime, r_owner, r_group1, g1title, r_qid, r_ans, r_questions, r_correct, 100 * r_correct/r_questions as r_percent`
    sqlString = sqlString + ` from usershistory`
    sqlString = sqlString + ` join group1 on r_group1 = g1id`
    sqlString = sqlString + ` where r_email='${email}' and r_questions > 0`
    sqlString = sqlString + ` order by r_id desc`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'usershistory',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseusershistory = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseusershistory.then(function (Data_Hist) {
      //
      //  Data History add time stamp
      //
      const Data_Hist_Update = Data_Hist.map(record => ({
        ...record,
        yymmdd: format(parseISO(record.r_datetime), 'yy-MM-dd')
      }))
      //
      //  Session Storage
      //
      sessionStorage.setItem('Data_Hist', JSON.stringify(Data_Hist_Update))
      if (debugLog) console.log('Data_Hist ', Data_Hist_Update)
      //
      //  Update Table
      //
      setRecords(Data_Hist_Update)
      //
      //  Filter
      //
      handleSearch()
      //
      //  Return
      //
      return
    })
    //
    //  Return Promise
    //
    return myPromiseusershistory
  }
  //...................................................................................
  //.  Prepare Row before switching to QuizHistoryDetail
  //...................................................................................
  function QuizHistoryRow(row) {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: QuizHistoryRow`)
    //
    //  Store Row
    //
    sessionStorage.setItem('Data_Hist_Row', JSON.stringify(row))
    //
    //  Get data
    //
    BuildHistoryDetail(row)
    //
    //  Wait for data
    //
    const waitSessionStorageParams = {
      sessionItem: 'Data_Hist_Row_Join_Received',
      handlePageValue: 'QuizHistoryDetail'
    }
    waitSessionStorage(waitSessionStorageParams, handlePage)
  }
  //...................................................................................
  //.  Prepare Row before switching to Quiz
  //...................................................................................
  function QuizBuild(row) {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: QuizBuild`)
    //
    //  Store Row
    //
    sessionStorage.setItem('Data_Hist_Row', JSON.stringify(row))
    //
    //  BuildQuizData
    //
    const SqlString_Q = `* from questions where qowner = '${row.r_owner}' and qgroup1 = '${row.r_group1}'`
    const params = {
      SqlString_Q: SqlString_Q
    }
    BuildQuizData(params)
    //
    //  Reset Quiz Data
    //
    sessionStorage.setItem('Quiz_Reset', true)
    //
    //  Wait for data
    //
    const waitSessionStorageParams = {
      sessionItem: 'BuildQuizData_Received',
      handlePageValue: 'Quiz'
    }
    waitSessionStorage(waitSessionStorageParams, handlePage)
  }
  //--------------------------------------------------------------------
  //-  Wait
  //--------------------------------------------------------------------
  function waitSessionStorage(props, handlePage) {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: waitSessionStorage`)
    if (debugLog) console.log('props ', props)
    const timeStart = new Date()
    //
    //  Constants
    //
    const { WAIT } = require('../../services/constants')
    const { WAIT_MAX_TRY } = require('../../services/constants')
    //
    //  Deconstruct props
    //
    const { sessionItem, dftWait = WAIT, dftMaxTry = WAIT_MAX_TRY, handlePageValue } = props
    if (debugLog) console.log('sessionItem ', sessionItem)
    if (debugLog) console.log('dftWait ', dftWait)
    if (debugLog) console.log('dftMaxTry ', dftMaxTry)
    //
    //  Global
    //
    let completedFlag = false
    let totalWAIT = 0
    //
    //  Wait for data
    //
    let w_try = 0
    const myInterval = setInterval(myTimer, dftWait)
    function myTimer() {
      //
      //  Data received, end wait
      //
      completedFlag = JSON.parse(sessionStorage.getItem(sessionItem))
      if (completedFlag) {
        const timeEnd = new Date()
        const timeDiff = timeEnd - timeStart
        if (debugLog)
          console.log(
            `waitSessionStorage sessionStorage(${sessionItem}) value(${completedFlag}) Elapsed Time(${timeDiff})`
          )
        clearInterval(myInterval)
        sessionStorage.setItem('QuizHistory_SearchValue', JSON.stringify(searchValue))
        sessionStorage.setItem('QuizHistory_SearchType', JSON.stringify(searchType))
        handlePage(handlePageValue)
      } else {
        //
        //  Waited enough
        //
        if (w_try >= dftMaxTry) {
          if (debugLog)
            console.log(`waitSessionStorage sessionStorage(${sessionItem}) Timed out(${totalWAIT})`)
          clearInterval(myInterval)
        }
        //
        //  Update counters
        //
        totalWAIT = totalWAIT + dftWait
        w_try++
      }
    }
  }
  //.............................................................................
  //
  //  Search/Filter
  //
  function handleSearch() {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: handleSearch`)
    //
    //  Start at first page (0)
    //
    setStartPage0(true)
    if (debugLog) console.log('setStartPage0(true)')
    //
    //  Filter
    //
    setFilterFn({
      fn: items => {
        if (debugLog) console.log('searchValue ', searchValue)
        if (debugLog) console.log('searchType ', searchType)
        //
        //  Nothing to search, return rows
        //
        if (searchValue === '') {
          if (debugLog) console.log('setFilterFn items ', items)
          return items
        }
        //
        //  Numeric
        //
        const searchValueInt = parseInt(searchValue)
        if (debugLog) console.log('searchValueInt ', searchValueInt)
        //
        //  Filter
        //
        let itemsFilter = items
        if (debugLog) console.log('itemsFilter ', itemsFilter)
        switch (searchType) {
          case 'r_id':
            itemsFilter = items.filter(x => x.r_id === searchValueInt)
            break
          case 'yymmdd':
            itemsFilter = items.filter(x => x.yymmdd === searchValue)
            break
          case 'r_owner':
            itemsFilter = items.filter(x =>
              x.r_owner.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'g1title':
            itemsFilter = items.filter(x =>
              x.g1title.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          default:
        }
        if (debugLog) console.log('setFilterFn itemsFilter ', itemsFilter)
        return itemsFilter
      }
    })
  }

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <PageHeader
        title='QUIZ History'
        subTitle={subTitle}
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          {/* .......................................................................................... */}
          <MyInput
            label='Search'
            name='Search'
            value={searchValue}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={e => setSearchValue(e.target.value)}
          />
          {/* .......................................................................................... */}
          <Box className={classes.searchInputTypeBox}>
            <MySelect
              fullWidth={true}
              name='SearchType'
              label='Search By'
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
              options={searchTypeOptions}
            />
          </Box>
          {/* .......................................................................................... */}
          <MyButton
            text='Filter'
            variant='outlined'
            size='large'
            startIcon={<FilterListIcon />}
            onClick={handleSearch}
          />
          {/* .......................................................................................... */}
        </Toolbar>
        {/* .......................................................................................... */}
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(row => (
              <TableRow key={row.r_id}>
                <TableCell>{row.r_id}</TableCell>
                <TableCell>{row.yymmdd}</TableCell>
                <TableCell>{row.r_owner}</TableCell>
                <TableCell>{row.g1title}</TableCell>
                <TableCell>{row.r_questions}</TableCell>
                <TableCell>{row.r_correct}</TableCell>
                <TableCell>{row.r_percent}</TableCell>
                <TableCell>
                  <MyActionButton
                    startIcon={<ScoreboardIcon fontSize='small' />}
                    text='Detail'
                    color='warning'
                    onClick={() => {
                      QuizHistoryRow(row)
                    }}
                  ></MyActionButton>
                </TableCell>
                <TableCell>
                  <MyActionButton
                    startIcon={<QuizIcon fontSize='small' />}
                    text='Quiz'
                    color='warning'
                    onClick={() => {
                      QuizBuild(row)
                    }}
                  ></MyActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  )
}
