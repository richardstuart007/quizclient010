//
//  Libraries
//
import { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import PreviewIcon from '@mui/icons-material/Preview'
import QuizIcon from '@mui/icons-material/Quiz'
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
  { id: 'rid', label: 'ID' },
  { id: 'rref', label: 'Reference' },
  { id: 'rdesc', label: 'Description' },
  { id: 'rwho', label: 'Who' },
  { id: 'rtype', label: 'Type' },
  { id: 'learn', label: 'Learn', disableSorting: true },
  { id: 'quiz', label: 'Quiz', disableSorting: true }
]
const searchTypeOptions = [
  { id: 'rid', title: 'ID' },
  { id: 'rref', title: 'Reference' },
  { id: 'rdesc', title: 'Description' },
  { id: 'rwho', title: 'Who' },
  { id: 'rtype', title: 'Type' }
]
//
//  Constants
//
const functionName = 'RefLibrary'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'RefLibrary'
//...................................................................................
//.  Main Line
//...................................................................................
export default function RefLibrary({ handlePage }) {
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
  const [searchType, setSearchType] = useState('rdesc')
  const [searchValue, setSearchValue] = useState('')
  const [startPage0, setStartPage0] = useState(false)

  if (debugFunStart) console.log(debugModule)
  //
  //  Initial Data Load
  //
  useEffect(() => {
    getRowAllData()
    // eslint-disable-next-line
  }, [])
  //.............................................................................
  //.  GET ALL
  //.............................................................................
  function getRowAllData() {
    if (debugFunStart) console.log('getRowAllData')
    //
    //  Selection
    //
    let sqlString = `*`
    sqlString = sqlString + ` from reflinks`
    sqlString = sqlString + ` order by rid`
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
    const myPromisereflinks = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromisereflinks.then(function (Data_RefLibrary) {
      //
      //  Session Storage
      //
      sessionStorage.setItem('Data_RefLibrary', JSON.stringify(Data_RefLibrary))
      //
      //  Update Table
      //
      setRecords(Data_RefLibrary)
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
    return myPromisereflinks
  }
  //...................................................................................
  //.  Prepare Row before sqitching to Quiz
  //...................................................................................
  function RefLibraryRow(row) {
    if (debugLog) console.log('RefLibraryRow ')
    //
    //  Store Row
    //
    sessionStorage.setItem('Data_RefLibrary_Row', JSON.stringify(row))
    //
    //  BuildQuizData
    //
    const SqlString_Q = `* from questions where '${row.rref}' = ANY (qrefs)`
    const MaxQuestions = JSON.parse(sessionStorage.getItem('BuildQuizData_MaxQuestions'))
    const params = {
      SqlString_Q: SqlString_Q,
      MaxQuestions: MaxQuestions
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
    if (debugLog) console.log('Start waitSessionStorage')
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
    if (debugFunStart) console.log('handleSearch')
    setStartPage0(true)
    if (debugLog) console.log('setStartPage0(true)')
    setFilterFn({
      fn: items => {
        //
        //  Nothing to search, return rows
        //
        if (searchValue === '') {
          return items
        }
        //
        //  Numeric
        //
        const searchValueInt = parseInt(searchValue)
        //
        //  Filter
        //
        if (debugLog) console.log('searchType ', searchType)
        if (debugLog) console.log('searchValue ', searchValue)
        let itemsFilter = items
        switch (searchType) {
          case 'rid':
            itemsFilter = items.filter(x => x.rid === searchValueInt)
            break
          case 'rref':
            itemsFilter = items.filter(x =>
              x.rref.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'rdesc':
            if (debugLog) console.log('rdesc ')
            itemsFilter = items.filter(x =>
              x.rdesc.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'rwho':
            itemsFilter = items.filter(x =>
              x.rwho.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'rtype':
            itemsFilter = items.filter(x =>
              x.rtype.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          default:
        }
        if (debugLog) console.log('itemsFilter ', itemsFilter)
        return itemsFilter
      }
    })
  }
  //.............................................................................
  //
  //  Hyperlink open
  //
  const openHyperlink = hyperlink => {
    if (debugLog) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //.............................................................................
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
  //.  Render the form
  //...................................................................................
  return (
    <>
      <PageHeader
        title='Library of Teaching Material'
        subTitle='View Reference Material or Take a Quiz'
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
              <TableRow key={row.rid}>
                <TableCell>{row.rid}</TableCell>
                <TableCell>{row.rref}</TableCell>
                <TableCell>{row.rdesc}</TableCell>
                <TableCell>{row.rwho}</TableCell>
                <TableCell>{row.rtype}</TableCell>
                <TableCell>
                  <MyActionButton
                    startIcon={<PreviewIcon fontSize='small' />}
                    text='View'
                    color='warning'
                    onClick={() => openHyperlink(row.rlink)}
                  ></MyActionButton>
                </TableCell>
                <TableCell>
                  <MyActionButton
                    startIcon={<QuizIcon fontSize='small' />}
                    text='Quiz'
                    color='warning'
                    onClick={() => {
                      RefLibraryRow(row)
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