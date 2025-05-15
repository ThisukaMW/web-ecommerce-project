import * as actionTypes from '../constants/productConstants'
import axios from 'axios'
import {Api} from '../../utils/Api'

export const getProducts = () => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})

    const {data} = await Api.getRequest('/api/products')

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      // payload: data.data,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductDetails = id => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST})

    const {data} = await Api.getRequest(`/api/products/${id}`)
    // const p = JSON.parse(data)
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeProductDetails = () => dispatch => {
  dispatch({type: actionTypes.GET_PRODUCT_DETAILS_RESET})
}
