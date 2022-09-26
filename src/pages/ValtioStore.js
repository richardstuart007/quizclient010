import { proxy } from 'valtio'

const ValtioStore = proxy({
  //
  // Settings
  //
  v_HideParams: false,
  v_RandomSort: true,
  v_ReviewSkipPass: true,
  v_AllowSelection: true,
  v_ShowQid: true,
  v_ShowLinearProgress: false,
  v_ShowLinearScore: false,
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
  v_DataLoad: true,
  //
  //  Signon Information
  //
  v_Email: 't@t.com',
  v_Name: 't',
  v_SignedIn: false,
  //
  //  Data Selection Parameters
  //
  v_Owner: 'NZBridge',
  v_Group1: 'NZBIMP01',
  v_Group2: 'All',
  v_Group3: 'All',
  v_MaxQuestions: 20,
  //
  //  Quiz State Variables
  //
  v_Reset: true
})

export { ValtioStore }
