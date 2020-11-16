import axios from 'axios'
import {
  STEP_LIST_REQUEST,
  STEP_LIST_SUCCESS,
  STEP_LIST_FAIL,
  STEP_DETAILS_REQUEST,
  STEP_DETAILS_SUCCESS,
  STEP_DETAILS_FAIL,
  STEP_DELETE_SUCCESS,
  STEP_DELETE_REQUEST,
  STEP_DELETE_FAIL,
  STEP_CREATE_REQUEST,
  STEP_CREATE_SUCCESS,
  STEP_CREATE_FAIL,
  STEP_UPDATE_REQUEST,
  STEP_UPDATE_SUCCESS,
  STEP_UPDATE_FAIL,
  STEP_CREATE_REVIEW_REQUEST,
  STEP_CREATE_REVIEW_SUCCESS,
  STEP_CREATE_REVIEW_FAIL,
  STEP_TOP_REQUEST,
  STEP_TOP_SUCCESS,
  STEP_TOP_FAIL,
} from '../constants/stepConstants'
import { logout } from './userActions'

export const listSteps = (historyId, keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: STEP_LIST_REQUEST })
    console.log("his id: ", historyId)

    const { data } = await axios.get(
      `/api/steps/history/${historyId}?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: STEP_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STEP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listStepDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STEP_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/steps/${id}`)

    dispatch({
      type: STEP_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STEP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteStep = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STEP_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/steps/${id}`, config)

    dispatch({
      type: STEP_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STEP_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createStep = (historyId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STEP_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post( `/api/steps/history/${historyId}`, {}, config)

    dispatch({
      type: STEP_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STEP_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateStep = (step) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STEP_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/steps/${step._id}`,
      step,
      config
    )

    dispatch({
      type: STEP_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STEP_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createStepReview = (stepId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STEP_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/steps/${stepId}/reviews`, review, config)

    dispatch({
      type: STEP_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STEP_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopSteps = () => async (dispatch) => {
  try {
    dispatch({ type: STEP_TOP_REQUEST })

    const { data } = await axios.get(`/api/steps/top`)

    dispatch({
      type: STEP_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STEP_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
