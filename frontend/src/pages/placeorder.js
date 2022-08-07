import React, { useContext, useEffect, useReducer } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';
import Checkoutsteps from "../components/checkoutsteps"
import {Store} from "../store"
import Axios from "axios"

const reducer = (state, action) => {
    switch (action.type) {
      case 'CREATE_REQUEST':
        return { ...state, loading: true };
      case 'CREATE_SUCCESS':
        return { ...state, loading: false };
      case 'CREATE_FAIL':
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
function Placeorder() {
    const navigate = useNavigate();
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
      });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    
    const roundingto2x = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
    cart.itemsPrice = roundingto2x(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? roundingto2x(0) : roundingto2x(10);
    cart.taxPrice = roundingto2x(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler=async()=>{
        try {
            dispatch({ type: 'CREATE_REQUEST' });
      
            const { data } = await Axios.post(
              '/api/orders',
              {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
              },
              {
                headers: {
                  authorization: `Bearer ${userInfo.token}`,
                },
              }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
          } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            // toast.error(getError(err));
            alert(err)
          }
    }
    useEffect(() => {
        if (!cart.paymentMethod) {
          navigate('/payment');
        }
      }, [cart, navigate]);
    
  return (
    <div>
        <Checkoutsteps step1 step2 step3 step4></Checkoutsteps>
        <h1>Preview Order</h1>
        <Row>
            <Col>
                <Box>
                <Body>
                    <Title>Shipping</Title>
                    <Text>
                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                        <strong>Address: </strong> {cart.shippingAddress.address},
                        {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                    </Text>
                    <Link to="/shipping">Edit</Link>
                </Body>
                </Box>
                
                <Box>
                    <Body>
                    <Title>Payment</Title>
                    <Text>
                        <strong>Method:</strong> {cart.paymentMethod}
                    </Text>
                    <Link to="/payment">Edit</Link>
                    </Body>
                </Box>
                <Box>
                <Body>
                        <Title>Items</Title>
                        <ListGroup variant="flush">
                            {cart.cartItems.map((item) => (
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
                                    
                                    <Col md={3}>
                                    
                                        ${item.price}
                                        
                                    </Col>
                                </Row>
                            </ListGroup>
                            ))}
                        </ListGroup>
                        <Link to="/cart">Edit</Link>
                    </Body>
                </Box>


            </Col>
            <Col>
            <Box>
                    <Body>
                    <Title>Order Summary</Title>
                    <ListGroup variant="flush">
                        <ListGroup>
                        <Row>
                            <Col>Items</Col>
                            <Col>${cart.itemsPrice.toFixed(2)}</Col>
                        </Row>
                        </ListGroup>
                        <ListGroup>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice.toFixed(2)}</Col>
                        </Row>
                        </ListGroup>
                        <ListGroup>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice.toFixed(2)}</Col>
                        </Row>
                        </ListGroup>
                        <ListGroup>
                        <Row>
                            <Col>
                            <strong> Order Total</strong>
                            </Col>
                            <Col>
                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                            </Col>
                        </Row>
                        </ListGroup>
                        <ListGroup>
                        <div className="d-grid">
                            <Button
                            type="button"
                            onClick={placeOrderHandler}
                            disabled={cart.cartItems.length === 0}
                            >
                            Place Order
                            </Button>
                        </div>
                        {loading && <p>loading...</p> }
                        </ListGroup>
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
const ListGroup=styled.div`

`
const Title=styled.div`
font-size:23px;
font-weight:700;
`

export default Placeorder