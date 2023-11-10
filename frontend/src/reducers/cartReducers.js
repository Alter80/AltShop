import { CART_ADD_ITEM } from "../constants/cartConstans";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      console.log("STATE", state);

      const existItem = state.cartItems.find((x) => x.product === item.product);

      console.log("exitst check", existItem);

      if (existItem) {
        console.log("if exis 1");
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        console.log("Not if exist 2");
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
