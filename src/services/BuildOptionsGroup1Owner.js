//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const BuildOptionsGroup1Owner = data => {
  //
  //  Options
  //
  let Group1OptionsOwner = []
  let itemObj = {
    qowner: '',
    qgroup1: '',
    g1title: ''
  }
  //
  //  Default ALL ?
  //
  const ShowAllGroup1 = false
  if (ShowAllGroup1) {
    itemObj = {
      qowner: 'All',
      qgroup1: 'All',
      g1title: 'All'
    }
    Group1OptionsOwner.push(itemObj)
  }
  //
  //  Load other values
  //
  data.forEach(item => {
    const itemObj = {
      qowner: item.qowner,
      qgroup1: item.qgroup1,
      g1title: item.g1title
    }
    Group1OptionsOwner.push(itemObj)
  })
  //
  //  Store Update
  //
  const Data_Options_Group1OwnerJSON = JSON.stringify(Group1OptionsOwner)
  sessionStorage.setItem(
    'Data_Options_Group1Owner',
    Data_Options_Group1OwnerJSON
  )
  if (debugLog) console.log('Group1OptionsOwner ', Group1OptionsOwner)
}
export default BuildOptionsGroup1Owner
