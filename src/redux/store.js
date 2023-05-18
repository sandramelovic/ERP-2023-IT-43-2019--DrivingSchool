import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer, productReducer, newProductReducer } from "./reducers/productReducer";
import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { allOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";
import { orderItemReducer, shippingReducer } from "./reducers/orderItemReducer";
import { allOrderItemReducer } from "./reducers/orderItemsReducer";

const reducer = combineReducers({
  orderItemReducer: orderItemReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  product: productReducer,
  newProduct: newProductReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  profile: profileReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
 // user: userReducer,
  newOrder: newOrderReducer,
  allOrderItems: allOrderItemReducer,
  shippingInfo: shippingReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? localStorage.getItem("cartItems")
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;