import React, { useContext } from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { Store } from '../store';
import axios from "axios";

export const Product = ({product}) => {
  
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const{
      cart:{cartItems},
  }=state;
  
  const AddToCartHandler= async(item)=>{
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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
  return (
    <SProduct  className="product" key={product.slug}>
                    <Link to={`/product/${product.slug}`}>
                    <img src={product.image} style={{"width":"100%","maxWidth":"400px"}} alt={product.name} />
                    </Link>
                    <ProductInfo>
                    <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                    </Link>
                    <p><strong>${product.price}</strong></p>
                    {product.countInStock===0?<OUTOFSTOCK disabled>Out of Stock</OUTOFSTOCK>:
                    <ADDTOCART  onClick={()=>AddToCartHandler(product)}>
                    Add To Cart
                    </ADDTOCART>
                    }
                    
                    </ProductInfo>
                </SProduct>
  )
}

const SProduct =styled.div`
border:1px solid black;
margin:1rem;
`
const ProductInfo=styled.div`

padding:1rem;

`
const ADDTOCART=styled.button`

`
const OUTOFSTOCK=styled.button`
opacity:100%;
cursor:not-allowed;
`