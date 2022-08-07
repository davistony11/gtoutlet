import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import data from "../data"
import axios from "axios"
import { Product } from '../components/product'
import { MessageBox } from '../components/MessageBox'
import { LoadingBox } from '../components/LoadingBox'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });



  // const[products,setproducts]=useState([]);
  useEffect(()=>{
    const fetchdata=async ()=>{
      dispatch({type:"FETCH_REQUEST"});
      try{
        const result=await axios.get("/api/products")
        dispatch({type:"FETCH_SUCCESS",payload:result.data});
      }
      catch(err){
        dispatch({type:"FETCH_FAIL",payload:err.message})
      }
      // setproducts(result.data)
    }
    fetchdata();
  },[])
  return (
    <div>
        <h1 style={{marginLeft:"30px"}}>Featured products</h1>
            <Products>
            {
              loading?(
              <LoadingBox></LoadingBox>
              )
              :error?( 
                <MessageBox>{error}</MessageBox>
               ):(
            products.map(product=>(
              <Container>
                <Product product={product}></Product>
              </Container>
            )
        ))}
            </Products>
    </div>
  )
}
////// css




const Products =styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;

`
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom:3px;
`;


export default Home