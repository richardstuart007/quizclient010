//
//  Browser Port (9003) ==> Server REMOTE server
//
exports.SERVER_REMOTE = 'REMOTE'
exports.URL_REMOTE = 'https://quizserver010-production.up.railway.app'
//
//  Browser Port (9013) ==> Server LOCAL Port (9001) ==> Server REMOTE server
//
exports.SERVER_LOCAL_REMOTE = 'LOCAL==>REMOTE'
exports.URL_LOCAL_REMOTE = 'http://localhost:9001'
//
//  Browser Port (8002) ==> Server LOCAL Port (8001)
//
exports.SERVER_LOCAL = 'LOCAL'
exports.URL_LOCAL = 'http://localhost:8001'
//
//  Server details
//
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
exports.URL_PROFILE = '/QuizProfile/:id'
exports.URL_TABLES = '/QuizTables'
//
//  Other Parameters
//
exports.ROWS_MAX = 2000
//
// Settings
//
exports.v_HideParams = false
exports.v_RandomSort = true
exports.v_ReviewSkipPass = true
exports.v_AllowSelection = true
exports.v_ShowQid = true
exports.v_ShowInfo = false
exports.v_ShowLinearProgress = false
exports.v_ShowLinearScore = false
exports.v_ShowButtonSettings = false
exports.v_ShowSelectionOwner = true
exports.v_ShowAllOwner = false
exports.v_ShowSelectionGroup1 = true
exports.v_ShowAllGroup1 = false
exports.v_ShowSelectionGroup2 = false
exports.v_ShowSelectionGroup3 = false
//
//  Navigation State Variables
//
exports.v_Params = null
exports.v_Page = 'QuizSplash'
exports.v_PagePrevious = ''
exports.v_DataLoad = true
//
//  Signon Information
//
exports.v_Email = 't@t.com'
exports.v_Name = 't'
exports.v_SignedIn = false
//
//  Data Selection Parameters
//
exports.v_Owner = 'NZBridge'
exports.v_Group1 = 'NZBIMP01'
exports.v_Group2 = 'All'
exports.v_Group3 = 'All'
exports.v_MaxQuestions = 20
//
//  Quiz State Variables
//
exports.v_Reset = true
