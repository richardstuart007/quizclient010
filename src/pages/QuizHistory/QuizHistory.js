//
//  Libraries
//
import { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import FilterListIcon from '@mui/icons-material/FilterList'
import { format, parseISO } from 'date-fns'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
import PageHeader from '../../components/controls/PageHeader'
import useMyTable from '../../components/controls/useMyTable'
//
//  Services
//
import MyQueryPromise from '../../services/MyQueryPromise'
import getTable from '../../services/getTable'
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
    width: '40%'
  },
  searchInputTypeBox: {
    width: '10%',
    margin: `0 0 0 ${theme.spacing(2)}`
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))
//
//  Table Heading
//
const headCells = [
  { id: 'r_id', label: 'ID' },
  { id: 'ddmmyy', label: 'Date' },
  { id: 'r_owner', label: 'Owner' },
  { id: 'g1title', label: 'Group 1' },
  { id: 'r_questions', label: 'Questions' },
  { id: 'r_correct', label: 'Correct' }
]
const searchTypeOptions = [
  { id: 'r_id', title: 'ID' },
  { id: 'ddmmyy', title: 'Date' },
  { id: 'r_owner', title: 'Owner' },
  { id: 'g1title', title: 'Group 1' },
  { id: 'r_questions', title: 'Questions' },
  { id: 'r_correct', title: 'Correct' }
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
const debugLogTest = true
const debugFunStart = true
const debugModule = 'QuizHistory'
//=====================================================================================
export default function QuizHistory(props) {
  //.............................................................................
  //.  GET ALL
  //.............................................................................
  const getRowAllData = () => {
    if (debugFunStart) console.log('getRowAllData')
    //
    //  Get User
    //
    const name = JSON.parse(sessionStorage.getItem('Settings_Name'))
    const email = JSON.parse(sessionStorage.getItem('Settings_Email'))
    subTitle = `Email: ${email}  User: ${name}`
    //
    //  Selection
    //
    let sqlString = `r_id, r_datetime, r_owner, g1title, r_questions, r_correct from usershistory join group1 on r_group1 = g1id where r_email='${email}' order by r_id desc`
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
    myPromiseusershistory.then(function (Data_History) {
      //
      //  Data History with split time stamp
      //
      if (debugLogTest) console.log('Data_History ', Data_History)
      const Data_History_Update = Data_History.map(record => ({
        ...record,
        ddmmyy: format(parseISO(record.r_datetime), 'dd-MM-yy')
      }))
      if (debugLogTest) console.log('Data_History_Update ', Data_History_Update)
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_History_Update ', Data_History_Update)
      sessionStorage.setItem('Data_History', JSON.stringify(Data_History_Update))
      const TimeStamp = Date.now()
      if (debugLogTest) console.log(`${TimeStamp} Data_History ==>`)
      //
      //  Update Table
      //
      setRecords(Data_History_Update)
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
  //.............................................................................
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
  const [searchType, setSearchType] = useState('r_owner')
  const [searchValue, setSearchValue] = useState('')
  //.............................................................................
  //
  //  Search/Filter
  //
  const handleSearch = () => {
    if (debugFunStart) console.log('handleSearch')
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
        let itemsFilter = items
        switch (searchType) {
          case 'r_id':
            itemsFilter = items.filter(x => x.r_id === searchValueInt)
            break
          case 'ddmmyy':
            itemsFilter = items.filter(x => x.ddmmyy === searchValue)
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
          case 'r_questions':
            itemsFilter = items.filter(x => x.r_questions.includes(searchValue.toLowerCase()))
            break
          case 'r_correct':
            itemsFilter = items.filter(x => x.r_correct.includes(searchValue.toLowerCase()))
            break
          default:
        }
        if (debugLog) console.log('itemsFilter ', itemsFilter)
        return itemsFilter
      }
    })
  }

  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugFunStart) console.log(debugModule)
  //
  //  Initial Data Load
  //
  useEffect(() => {
    getRowAllData()
    // eslint-disable-next-line
  }, [])
  //.............................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useMyTable(
    records,
    headCells,
    filterFn
  )
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <PageHeader
        title='Results'
        subTitle={subTitle}
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
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
          <Box className={classes.searchInputTypeBox}>
            <MySelect
              fullWidth={true}
              name='SearchType'
              label='Column Heading'
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
              options={searchTypeOptions}
            />
          </Box>
          <MyButton
            text='Filter'
            variant='outlined'
            startIcon={<FilterListIcon />}
            onClick={handleSearch}
          />
          <MyButton
            text='Refresh'
            variant='outlined'
            startIcon={<RefreshIcon />}
            onClick={getRowAllData}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(row => (
              <TableRow key={row.r_id}>
                <TableCell>{row.r_id}</TableCell>
                <TableCell>{row.ddmmyy}</TableCell>
                <TableCell>{row.r_owner}</TableCell>
                <TableCell>{row.g1title}</TableCell>
                <TableCell>{row.r_questions}</TableCell>
                <TableCell>{row.r_correct}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  )
}
