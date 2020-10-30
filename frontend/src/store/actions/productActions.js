import * as actionType from "./actionTypes";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/proshop/products");
    dispatch({ type: actionType.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/proshop/products/${id}`);
    dispatch({ type: actionType.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
