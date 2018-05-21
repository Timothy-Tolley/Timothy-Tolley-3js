export const SET_VIDEO = 'SET_VIDEO'
export const SET_ACTIVE = 'SET_ACTIVE'
export const REMOVE_ACTIVE = 'REMOVE_ACTIVE'

export function setVideo (video) {
  return {
    type: SET_VIDEO,
    video
  }
}

export function activate () {
  return {
    type: SET_ACTIVE
  }
}

export function deactivate () {
  return {
    type: REMOVE_ACTIVE
  }
}
