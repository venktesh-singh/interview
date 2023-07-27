import * as types from '../action-types';
import axios from 'axios';
import {baseUrl, getHeaders} from '../../constants';

export const getAllTrucks = (query, callback) => {
  // const query = {latitude: '28.836884', longitude: '78.739165', distance: '25'};
  console.log('query+++++++++++', query);
  return async dispatch => {
    axios({
      method: 'GET',
      url: `${baseUrl}/truck/getall/customer${query}`,
      headers: await getHeaders(),
    })
      .then(async response => {
        if (response) {
          if (response.data) {
            if (response.data.data) {
              callback(response.data.data);
            }
          }
        }
      })
      .catch(error => {
        console.log('====>GetTruckActionError', error);

        if (error.response) {
          // console.log("======>GetError", error.response)
          callback('error');
        }
      });
  };
};

export const getTruckMenu = id => {
  return async dispatch => {
    axios({
      method: 'GET',
      url: `${baseUrl}/truck/getwithmenu/mobile/${id}`,
      headers: await getHeaders(),
    })
      .then(async response => {
        if (response) {
          if (response.data) {
            // console.log("====>", response.data)
            let menus = response.data.data.menus;
            for (let i in menus) {
              await menus[i].food_info.map(item => {
                item.quantity = 0;
              });
            }
            return await dispatch({type: types.GET_MENU_ITEMS, payload: menus});
          }
        }
      })
      .catch(error => {
        if (error.response) {
          callback('error');
        }
      });
  };
};

export const addToCart = (categoryId, food) => {
  return async dispatch => {
    return await dispatch({
      type: types.ADD_TO_CART,
      payload: {categoryId, food},
    });
  };
};

export const removeFromCart = (categoryId, food) => {
  console.log('====>RemoveActionDispatch');
  return async dispatch => {
    return await dispatch({
      type: types.REMOVE_FROM_CART,
      payload: {categoryId, food},
    });
  };
};

export const getCart = () => {
  return async dispatch => {
    return await dispatch({type: types.GET_CART, payload: ''});
  };
};

export const deleteItem = id => {
  return async dispatch => {
    return await dispatch({type: types.DELETE_ITEM, payload: id});
  };
};

export const postAddressData = (jsonObj, callback) => {
  return async dispatch => {
    axios({
      method: 'post',
      url: `${baseUrl}/address/add`,
      headers: await getHeaders(),
      data: jsonObj,
    })
      .then(response => {
        // console.log("response postAddressAction ", response.data)
        callback(response.data);
      })
      .catch(error => {
        // console.log("error postAddressAction ", error)
        callback('error');
      });
  };
};

export const getMenuById = id => {
  return async dispatch => {
    axios({
      method: 'GET',
      url: `${baseUrl}/menu/getbyid/${id}`,
      headers: await getHeaders(),
    })
      .then(async response => {
        if (response) {
          if (response.data) {
            if (response.data.data) {
              console.log('=====>dispatching Menu');
              await dispatch({
                type: types.GET_MENU_ITEM,
                payload: response.data.data,
              });
            }
          }
        }
      })
      .catch(error => {
        console.log('====>GetMenuError', error);

        if (error.response) {
          console.log('error');
        }
      });
  };
};

export const getOrders = (id, callback) => {
  return async dispatch => {
    axios({
      method: 'GET',
      url: `${baseUrl}/order/getbyuser/${id}`,
      headers: await getHeaders(),
    })
      .then(async response => {
        if (response) {
          if (response.data) {
            if (response.data.data) {
              console.log('=====>dispatching Orders');
              await callback(response.data.data);
            }
          }
        }
      })
      .catch(error => {
        console.log('====>GetOrderError', error);

        if (error.response) {
          callback('error');
        }
      });
  };
};

export const getOrderDetails = (id, callback) => {
  return async dispatch => {
    axios({
      method: 'GET',
      url: `${baseUrl}/order/getbyid/${id}`,
      headers: await getHeaders(),
    })
      .then(async response => {
        if (response) {
          if (response.data) {
            if (response.data.data) {
              console.log('=====>dispatching OrderDetails');
              await callback(response.data.data);
            }
          }
        }
      })
      .catch(error => {
        console.log('====>GetOrderDetailError', error);

        if (error.response) {
          callback('error');
        }
      });
  };
};

export const postAddItem = (jsonObj, callback) => {
  return async dispatch => {
    axios({
      method: 'post',
      url: `${baseUrl}/item/add`,
      headers: await getHeaders(),
      data: jsonObj,
    })
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        callback('error');
      });
  };
};