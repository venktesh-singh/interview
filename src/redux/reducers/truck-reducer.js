import * as types from '../action-types';
const initialState = {
  menu: [],
  cart: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MENU_ITEMS:
      return {
        ...state,
        menu: action.payload
      }

    case types.ADD_TO_CART:

      let newMenu = state.menu.slice();
      var newItem;
      newMenu.map((item) => {
        if (item.id == action.payload.categoryId) {
          let index = item.food_info.indexOf(action.payload.food);
          item.food_info[index].quantity = item.food_info[index].quantity + 1;
          newItem = item.food_info[index];
          return item;
        }
        else {
          return item
        }
      })
      let newCart = state.cart.slice()
      if (state.cart.length > 0) {
        let already = false;
        newCart.forEach((item) => {
          if (item.id == action.payload.food.id) {
            already = true
          }
        })
        if (already) {
          let rest = newCart.filter((el) => el.id != action.payload.food.id);
          newCart = [...rest, newItem]
        }
        else {
          newCart.push(newItem)
        }
      }
      else {
        newCart.push(newItem)
      };
      let quantity_cost = getTotalCostAndQuantity(newCart)

      return {
        ...state,
        menu: newMenu,
        cart: newCart,
        totalQuantity: quantity_cost.totalQuantity,
        totalCost: quantity_cost.totalCost
      }

    case types.REMOVE_FROM_CART:

      let updatedMenu = state.menu.slice();
      var deletedItem;
      updatedMenu.map((item) => {
        if (item.id == action.payload.categoryId) {
          let index = item.food_info.indexOf(action.payload.food);
          item.food_info[index].quantity = item.food_info[index].quantity - 1;
          deletedItem = item.food_info[index];
          return item;
        }
        else {
          return item
        }
      })
      let updatedCart = state.cart.slice();
      if (deletedItem.quantity == 0) {
        updatedCart = updatedCart.filter((el) => el.id != action.payload.food.id)
      }
      else {
        updatedCart = updatedCart.map((item) => {
          if (item.id == action.payload.food.id) {
            return {
              ...item,
              quantity: deletedItem.quantity
            }
          }
          return item;
        })
      }
      let cost_quantity = getTotalCostAndQuantity(updatedCart)

      return {
        ...state,
        menu: updatedMenu,
        cart: updatedCart,
        totalQuantity: cost_quantity.totalQuantity,
        totalCost: cost_quantity.totalCost
      }

    case types.GET_CART:
      return {
        ...state,
        cart: state.cart,
        totalQuantity: state.totalQuantity,
        totalCost: state.totalCost
      };
    case types.DELETE_ITEM:
      let modifiedCart = state.cart.slice();
      modifiedCart = modifiedCart.filter((data) => data.id != action.payload)
      let totalCost_quantity = getTotalCostAndQuantity(modifiedCart)
      return {
        ...state,
        cart: modifiedCart,
        totalQuantity: totalCost_quantity.totalQuantity,
        totalCost: totalCost_quantity.totalCost
      }


    default:
      console.log("=====>default")
      return state;
  }
}

const getTotalCostAndQuantity = (objArray) => {
  let obj = {
    totalCost: 0,
    totalQuantity: 0
  }

  for (let i in objArray) {
    obj.totalCost = obj.totalCost + objArray[i].cost * objArray[i].quantity;
    obj.totalQuantity = obj.totalQuantity + objArray[i].quantity
  }

  return obj
}