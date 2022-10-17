//
//  Browser Port (9003) ==> Server REMOTE server
//
exports.CLIENT_REMOTE = 'REMOTE'
exports.SERVER_REMOTE = 'REMOTE'
exports.DATABASE_REMOTE = 'REMOTE'
exports.URL_REMOTE = 'https://quizserver010-production.up.railway.app'
//
//  Browser Port (9013) ==> Server LOCAL Port (9001) ==> Server REMOTE server
//
exports.SERVER_LOCAL_REMOTE = 'LOCAL==>REMOTE'
exports.URL_LOCAL_REMOTE = 'http://localhost:9001'
//
//  Browser Port (8003) ==> Server LOCAL Port (8001)
//
exports.CLIENT_LOCAL = 'LOCAL'
exports.SERVER_LOCAL = 'LOCAL'
exports.DATABASE_LOCAL = 'LOCAL'
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
exports.ROWS_MAX = 5000
exports.WAIT = 100
exports.WAIT_MAX_TRY = 20
