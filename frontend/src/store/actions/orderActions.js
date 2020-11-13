import * as actionType from "./actionTypes";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/proshop/orders`, order, config);
    dispatch({
      type: actionType.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actionType.ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/proshop/orders/${id}`, config);
    dispatch({
      type: actionType.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actionType.ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: actionType.ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/proshop/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: actionType.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actionType.ORDER_PAY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listMyOrders = () => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: actionType.MY_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/proshop/orders/myorders`, config);
    dispatch({
      type: actionType.MY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actionType.MY_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
