import * as actionTypes from "../constants/cartConstants";
import axios from "axios";
import { Api } from "../../utils/Api";
import { convertToCartData } from "../../utils/utils.function";

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await Api.getRequest(`/api/products/${id}`);
  // const product = JSON.parse(data);
  // console.log(product)
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  Api.postRequest("/api/cart", { productId: id, count: qty });
};

export const removeFromCart =
  ({ pId, _id }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: pId,
    });
    Api.DeleteRequest("/api/cart/" + _id);
  };

// export const fetchCart = () => async dispatch => {
//   try {
//     const {data: strigifyData} = await Api.getRequest(`/api/cart/`)
//     // console.log({strigifyData})
//     const {carts} = JSON.parse(strigifyData)
//     // console.log(carts)

//     dispatch({
//       type: actionTypes.FETCH_MY_CART,
//       payload: {
//         carts: convertToCartData(carts),
//       },
//     })
//   } catch (e) {
//     console.log('ERROR :  ', e)
//   }
// }

export const fetchCart = () => async (dispatch) => {
  try {
    const { statusCode, data, isJSON } = await Api.getRequest(`/api/cart/`);

    if (statusCode !== 200 || !isJSON) {
      console.warn("Invalid cart response:", data);
      return;
    }

    dispatch({
      type: actionTypes.FETCH_MY_CART,
      payload: {
        carts: convertToCartData(data.carts),
      },
    });
  } catch (e) {
    console.log("ERROR : ", e);
  }
};

// x = [
//   {
//     product: '615ac2b036ecb5ed71497630',
//     name: 'Cannon EOS-1D',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
//     price: 1300,
//     countInStock: 5,
//     qty: '3',
//   },
//   {
//     product: '615ac2b036ecb5ed71497631',
//     name: 'Amazon Alexa',
//     imageUrl:
//       'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
//     price: 50,
//     countInStock: 25,
//     qty: '3',
//   },
// ]
