import React, { useContext, useEffect, useReducer } from 'react'

import { Link, useNavigate ,useParams} from 'react-router-dom';

import {Store} from "../store"
import Axios from 'axios';
import styled from "styled-components"
import { getError } from '../util';

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
    //   case 'PAY_REQUEST':
    //     return { ...state, loadingPay: true };
    //   case 'PAY_SUCCESS':
    //     return { ...state, loadingPay: false, successPay: true };
    //   case 'PAY_FAIL':
    //     return { ...state, loadingPay: false };
    //   case 'PAY_RESET':
    //     return { ...state, loadingPay: false, successPay: false };
  
    //   case 'DELIVER_REQUEST':
    //     return { ...state, loadingDeliver: true };
    //   case 'DELIVER_SUCCESS':
    //     return { ...state, loadingDeliver: false, successDeliver: true };
    //   case 'DELIVER_FAIL':
    //     return { ...state, loadingDeliver: false };
    //   case 'DELIVER_RESET':
    //     return {
    //       ...state,
    //       loadingDeliver: false,
    //       successDeliver: false,
    //     };
      default:
        return state;
    }
  }
export default function Order() {

    const { state } = useContext(Store);
    const { userInfo } = state;
    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();
    const [
        {
          loading,
          error,
          order,
        //   successPay,
        //   loadingPay,
        //   loadingDeliver,
        //   successDeliver,
        },
        dispatch,
      ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        // successPay: false,
        // loadingPay: false,
      });

      useEffect(() => {
        const fetchorder = async()=>{
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await Axios.get(`/api/orders/${orderId}`, {
              headers: { authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
    
        if (!userInfo) {
          return navigate('/login');
        }
        // if (
        //   !order._id ||
        //   // successPay ||
        //   // successDeliver ||
        //   (order._id && order._id !== orderId)
        // ) {
          // fetchOrder();
          // if (successPay) {
          //   dispatch({ type: 'PAY_RESET' });
          // }
          // if (successDeliver) {
          //   dispatch({ type: 'DELIVER_RESET' });
          // }
        // } 
        //else {
        //   const loadPaypalScript = async () => {
        //     const { data: clientId } = await axios.get('/api/keys/paypal', {
        //       headers: { authorization: `Bearer ${userInfo.token}` },
        //     });
        //     paypalDispatch({
        //       type: 'resetOptions',
        //       value: {
        //         'client-id': clientId,
        //         currency: 'USD',
        //       },
        //     });
        //     paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        //   };
        //   loadPaypalScript();
        // }

        if(!order._id || (order._id && order._id !== orderId)){
          fetchorder();
        }

      }, [
        order,
        userInfo,
        orderId,
        navigate
        // paypalDispatch,
        // successPay,
        // successDeliver,
      ]);
console.log(loading,orderId,order,"lol");
  return loading?(
            <p>loading....</p>
        ):
        error?(
            <p>{error}</p>
        ):
        (
            <div>
                <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Box className="mb-3">
            <Body>
              <Title>Shipping</Title>
              <Text>
                <strong>Name:</strong> { order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {  order.shippingAddress.address},
                {  order.shippingAddress.city}, { order.shippingAddress.postalCode}
                ,{ order.shippingAddress.country}
                {/* &nbsp;
                {order.shippingAddress.location &&
                  order.shippingAddress.location.lat && (
                    <a
                      target="_new"
                      href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                    >
                      Show On Map
                    </a>
                  )} */}
              </Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Body>
          </Box>
          <Box className="mb-3">
            <Body>
              <Title>Payment</Title>
              <Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Body>
          </Box>

          <Box className="mb-3">
            <Body>
              <Title>Items</Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{width:"10%"}}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup>
                ))}
              </ListGroup>
            </Body>
          </Box>
        </Col>
        <Col md={4}>
          <Box className="mb-3">
            <Body>
              <Title>Order Summary</Title>
              <ListGroup variant="flush">
                <ListGroup>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup>
                <ListGroup>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup>
                <ListGroup>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup>
                <ListGroup>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup>
                {/* {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <p>loading....</p> }
                  </ListGroup.Item>
                )} */}
                {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <p>loading....</p> }
                    <div className="d-grid">
                      <Button type="button" onClick={deliverOrderHandler}>
                        Deliver Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                )} */}
              </ListGroup>
            </Body>
          </Box>
        </Col>
      </Row>


            </div>
        )

        
}
const Row=styled.div`
display:flex;

`
const Col=styled.div`
display:flex;
flex-direction:column;
`
const Box=styled.div``
const Body=styled.div``
const Text=styled.div``
const Button=styled.button``
const MessageBox=styled.div``
const ListGroup=styled.div`

`
const Title=styled.div`
font-size:23px;
font-weight:700;
`
const PayPalButtons=styled.div`


`