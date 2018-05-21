import {combineReducers} from 'redux'

import setVideo from './setVideo'
import setActive from './setActive'

export default combineReducers({
  setVideo,
  setActive
})
