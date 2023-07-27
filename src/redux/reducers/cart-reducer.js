import {
    GET_CART_LIST,
} from '../actions/cart-actions';

const initialState = {
    cartList: [],
};
  
const CartReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_CART_LIST: {
            return {
                ...state,
                cartList: [...action.payload],
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default CartReducer;