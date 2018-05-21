import {SET_ACTIVE, REMOVE_ACTIVE} from '../actions/setVideo'

const initialState = {active: false}

export default function setActive (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE:
      return {
        ...state,
        active: true
      }
    case REMOVE_ACTIVE:
      return {
        ...state,
        active: false
      }

    default:
      return state
  }
}
