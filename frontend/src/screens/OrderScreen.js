/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successDeliver, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <Button
          type="button"
          className="btn btn-light mt-2"
          onClick={navigate("/admin/orderList")}
        >
          GO Back
        </Button>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}{" "}
                  </p>
                  <p>
                    <strong>Email: </strong>{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>

                  <p>
                    <strong>Addresss: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.postalCode},
                    {order.shippingAddress.country},
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method:</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>

                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Orderorderis empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {" "}
                                {item.name}{" "}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Order Summery</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>$ {order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$ {order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>$ {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>$ {order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}

                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
