import { proxy } from 'valtio'

const ValtioStore = proxy({
  //
  //  Server
  //
  v_URL: '',
  v_Server: '',
  v_StaticData: true,
  //
  // Settings
  //
  v_HideParams: false,
  v_RandomSort: true,
  v_ReviewSkipPass: true,
  v_AllowSelection: true,
  v_ShowQid: true,
  v_ShowInfo: false,
  v_ShowLinearProgress: true,
  v_ShowLinearScore: true,
  v_ShowButtonHelp: false,
  v_ShowButtonSettings: false,
  v_ShowSelectionOwner: true,
  v_ShowAllOwner: false,
  v_ShowSelectionGroup1: true,
  v_ShowAllGroup1: false,
  v_ShowSelectionGroup2: false,
  v_ShowSelectionGroup3: false,
  //
  //  Navigation State Variables
  //
  v_Params: null,
  v_Page: 'QuizSplash',
  v_PagePrevious: '',
  v_DataLoad: true,
  //
  //  Signon Information
  //
  v_Email: '',
  v_Name: '',
  v_SignedIn: false,
  //
  //  Data - All Options
  //
  v_OwnerOptions: [],
  v_Group1OptionsOwner: [],
  v_Group2Options: [],
  v_Group3Options: [],
  //
  //  Data - All
  //
  v_Questions: [],
  v_Hands: [],
  v_Bidding: [],
  v_RefLinks: [],
  //
  //  Data Selection Parameters
  //
  v_Owner: 'NZBridge',
  v_Group1: '',
  v_Group2: 'All',
  v_Group3: 'All',
  v_MaxQuestions: 20,
  //
  //  Data - Selected
  //
  v_QFilter: [],
  v_QFilterSort: [],
  v_QCount: 0,
  v_QRefs: [],
  v_QRefsCount: 0,
  //
  //  Quiz State Variables
  //
  v_Reset: true,
  v_Help: '',
  v_Ans: []
})

export { ValtioStore }
