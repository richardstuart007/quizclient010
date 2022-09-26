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
  { id: 'r_email', label: 'Email' },
  { id: 'u_name', label: 'Name' },
  { id: 'r_datetime', label: 'Timestamp' },
  { id: 'r_owner', label: 'Owner' },
  { id: 'g1title', label: 'Group 1' },
  { id: 'r_questions', label: 'Questions' },
  { id: 'r_correct', label: 'Correct' }
]
const searchTypeOptions = [
  { id: 'r_email', title: 'Email' },
  { id: 'u_name', title: 'Name' },
  { id: 'r_datetime', title: 'Timestamp' },
  { id: 'r_owner', title: 'Owner' },
  { id: 'g1title', title: 'Group 1' },
  { id: 'r_questions', title: 'Questions' },
  { id: 'r_correct', title: 'Correct' }
]
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
    //  Selection
    //
    let sqlString = `r_email, u_name, r_datetime, r_owner, g1title, r_questions, r_correct from usershistory join users on r_email = u_email join group1 on r_group1 = g1id order by r_email, r_datetime desc`
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
      //  Session Storage
      //
      if (debugLog) console.log('Data_History ', Data_History)
      const Data_HistoryJSON = JSON.stringify(Data_History)
      sessionStorage.setItem('Data_History', Data_HistoryJSON)
      const TimeStamp = Date.now()
      if (debugLogTest) console.log(`${TimeStamp} Data_History ==>`)
      //
      //  Update Table
      //
      setRecords(Data_History)
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
        //  Filter
        //
        let itemsFilter = items
        switch (searchType) {
          case 'r_email':
            itemsFilter = items.filter(x => x.r_email === parseInt(searchValue))
            break
          case 'u_name':
            itemsFilter = items.filter(x => x.u_name.toLowerCase().includes(searchValue.toLowerCase()))
            break
          case 'r_datetime':
            itemsFilter = items.filter(x => x.r_datetime.toLowerCase().includes(searchValue.toLowerCase()))
            break
          case 'r_owner':
            itemsFilter = items.filter(x => x.r_owner.toLowerCase().includes(searchValue.toLowerCase()))
            break
          case 'g1title':
            itemsFilter = items.filter(x => x.g1title.toLowerCase().includes(searchValue.toLowerCase()))
            break
          case 'r_questions':
            itemsFilter = items.filter(x => x.r_questions.toLowerCase().includes(searchValue.toLowerCase()))
            break
          case 'r_correct':
            itemsFilter = items.filter(x => x.r_correct.toLowerCase().includes(searchValue.toLowerCase()))
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
    //
    //  Load form list
    //
    getRowAllData()
    // eslint-disable-next-line
  }, [])
  //.............................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useMyTable(records, headCells, filterFn)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <PageHeader title='Results' subTitle='Quiz Summary' icon={<PeopleOutlineTwoToneIcon fontSize='large' />} />
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
          <MyButton text='Filter' variant='outlined' startIcon={<FilterListIcon />} onClick={handleSearch} />
          <MyButton text='Refresh' variant='outlined' startIcon={<RefreshIcon />} onClick={getRowAllData} />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(row => (
              <TableRow key={row.r_email}>
                <TableCell>{row.r_email}</TableCell>
                <TableCell>{row.u_name}</TableCell>
                <TableCell>{row.r_datetime}</TableCell>
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
