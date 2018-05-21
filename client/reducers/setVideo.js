import {SET_VIDEO} from '../actions/setVideo'

const initialState = {video: ''}

export default function setVideo (state = initialState, action) {
  switch (action.type) {
    case SET_VIDEO:
      return {
        ...state,
        video: action.video
      }
    default:
      return state
  }
}
