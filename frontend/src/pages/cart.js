import React, { useContext } from 'react'
import { Store } from '../store';
import styled from "styled-components"
import axios from "axios";
import {BrowserRouter,Routes,Route,Link, useNavigate} from "react-router-dom"
import {MessageBox} from "../components/MessageBox"
function Cart() {
  const navigate = useNavigate();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const{
        cart:{cartItems},
    }=state;
    const updateCartHandler= async(item,quantity)=>{
      const {data}=await axios.get(`/api/products/${item._id}`)
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      
      ctxDispatch({
        type:"CART_ADD_ITEM",
        payload:{...item,quantity}
    })
    }
    const removeItemHandler=(item)=>{
      ctxDispatch({type:"CART_REMOVE_ITEM",payload:item});
    }
    const checkoutHandler=()=>{
    navigate('/signin?redirect=/shipping');

    }

  return (
    <div>
        <h1>Shopping Cart</h1>
        <Row>
            <Col1>
            {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row className="align-items-center">
                    <Col3 md={4}>
                      <Thumbnail>
                      <img src={item.image}
                        alt={item.name} />  
                      </Thumbnail>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col3>
                    <Col4 md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle">-</i>
                      </Button>{' '}
                      <span style={{margin:"0px 20px"}}>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle">+</i>
                      </Button>
                    </Col4>
                    <Col5 md={3}>${item.price}</Col5>
                    <Col6 md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash">x</i>
                      </Button>
                    </Col6>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
            </Col1>
            <Col2>
            <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>    
            </Col2>
        </Row>
    </div>

  )
}

const Row=styled.div`
display:flex;
flex-direction:row;
width:100%;
justify-content:space-between;
align-items:center;

`
const Col1=styled.div`
display:flex;
flex:8;
flex-direction:column;`;
const Col2=styled.div`
display:flex;
flex:4;
flex-direction:column;
`;
const Col3=styled.div`
display:flex;
flex-direction:column;
`;
const Col4=styled.div`
display:flex;
// flex-direction:column;
margin-bottom:3px;
`;
const Col5=styled.div`
display:flex;
flex-direction:column;
`;
const Col6=styled.div`
display:flex;
flex-direction:column;
`;

const ListGroup=styled.div`


`
const ListGroupItem=styled.div`



`
const Button=styled.button`

`
const Thumbnail=styled.div`

height: 80px;
flex-shrink: 0;
flex-grow: 0;
// margin-right: 16px;
img{
    object-fit: contain;
    height: 100%;
    width: 100%;
}
`

export default Cart