import axios from 'axios';
export const ADD_CART = 'ADD_CART';
export const GET_CART_LIST = 'GET_CART_LIST';
export const GET_CART_BY_ID = 'GET_CART_BY_ID';
export const UPDATE_CART = 'UPDATE_CART';
import {baseUrl, getHeaders} from '../../constants';
  
export const addCart = (jsonObj, callback) => {
  return async dispatch => {
    axios({
      method: 'post',
      url: `${baseUrl}/cart/add`,
      headers: await getHeaders(),
      data: jsonObj,
    })
      .then(response => {
        console.log("response Add Cart ", response.data)
        callback(response.data);
      })
      .catch(error => {
        // console.log("error postAddressAction ", error)
        callback('error');
      });
  };
};   

export const getCartList = () => (dispatch) => {
  axios.get(CONSTANT.BASE_URL + '/cart/getall').then((res) => {
    dispatch({
      type: GET_CART_LIST,
      payload: res.data,
    });
  });
};

export const getCartByID = (_id) => (dispatch) => {
  axios
    .get(CONSTANT.BASE_URL + `/cart/getbycart/${_id}`)
    .then((res) => {
      dispatch({
        type: GET_CART_BY_ID,
        payload: res.data,
      });
    });
};

export const updateCart = (_id, cartData) => (dispatch) => {
  axios
    .patch(CONSTANT.BASE_URL + `/cart/edit/${_id}`, cartData)
    .then((res) => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data,
      });
    });
};

