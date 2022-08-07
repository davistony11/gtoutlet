import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import styled from "styled-components"
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { Store } from '../store';
import {getError} from "../util"
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export const Product = () => {
    const navigate=useNavigate();
    const params=useParams();
    const {slug}=params;


    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  

  
    // const[products,setproducts]=useState([]);
    useEffect(()=>{
      const fetchdata=async ()=>{
        dispatch({type:"FETCH_REQUEST"});
        try{
          const result=await axios.get(`/api/products/slug/${slug}`);
          console.log("hello");
          dispatch({type:"FETCH_SUCCESS",payload:result.data});
        }
        catch(err){
          dispatch({type:"FETCH_FAIL",payload:getError(err)})
        }
        // setproducts(result.data)
      }
      fetchdata();
    },[slug])

    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart}=state;
    const addtocarthandler= async()=>{
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      
      ctxDispatch({
        type:"CART_ADD_ITEM",
        payload:{...product,quantity}
    })
    navigate("/cart");

}

  return (
    loading?(
      <LoadingBox></LoadingBox>
      )
      :error?( 
        <MessageBox>{error}</MessageBox>
       ): <div>
        <Main>
        <Itemone>
          <Image src={product.image} alt={product.image}></Image>
        </Itemone>
        <Itemtwo>
        <ListGroup >
            <ListGroupItem>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>Price : ${product.price}</ListGroupItem>
            <ListGroupItem>
              Description:

              {product.description}
            </ListGroupItem>
          </ListGroup>
        </Itemtwo>
        <Itemthree>
          <ThreeGroup>
          <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
          </ListGroupItem>
          <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    
                    <Col>$ {product.countInStock > 0 ? (
                        <Badge bg={true}>In Stock</Badge>
                      ) : (
                        <Badge bg={false}>Unavailable</Badge>
                      )}</Col>
                  </Row>
          </ListGroupItem>
          {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button  onClick={addtocarthandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroupItem>
                )}
          </ThreeGroup>
        </Itemthree>
    
        </Main>
    </div>
  )
}

const Main=styled.div`
display:flex;
flex-direction:row;
`
const Itemone=styled.div`
flex:6;



`
const Itemtwo=styled.div`

flex:3;

`
const Itemthree=styled.div`
flex:3;


`
const Image=styled.img`
max-width:100%;

`
const ListGroup=styled.div`

`
const ListGroupItem=styled.div`
border-bottom:1px solid gray;

`

const Col=styled.div`
display:flex;
flex-direction:column;

`
const Row=styled.div`

display:flex;
flex-direction:row;
`
const Button=styled.button`


`
const CardImg=styled.div`


`

const ThreeGroup=styled.div`


`

const Badge=styled.div`
height:"10px";
border:1px solid black;
padding:5px;
background-color:${props=>props.bg?'green':'red'}
`