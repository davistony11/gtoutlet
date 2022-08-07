import './App.css';
import data from "./data.js"
import styled from "styled-components"
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import Home from './pages/home';
import { Product } from './pages/product';
import { Store } from './store';
import { useContext, useState } from 'react';
import Cart from './pages/cart';
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Shipping from './pages/shipping';
import Paymentmethod from "./pages/paymentmethod"
import Placeorder from './pages/placeorder';
import Order from './pages/order';
import Orderhistory from './pages/orderhistory';
import Profile from './pages/profile';

function App() {
  const[dropdown,setdropdown]=useState(false);
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const {cart,userInfo}=state;
  console.log(userInfo);

  const signouthandler=()=>{
    ctxDispatch({type:'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href="/signin";

  }
  return (
    <BrowserRouter>
    <div className='mainapp'>
            <Header>
                <Link to="/" style={{"color":"white"}}>GT-OUTLET</Link>
                <Link to="/cart">
                  Cart
                  {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                </Link>
                {userInfo?(
                  <>
                          <h4 onClick={()=>setdropdown(!dropdown)} style={{cursor:"pointer",userSelect:"none"}}>{userInfo.name}   </h4>
                          {dropdown&&
                          <MenuList>
                          <MenuItem ><Link to="/profile"> My profile</Link></MenuItem>
                          <MenuItem ><Link to="/orderhistory">order history</Link></MenuItem>
                          <MenuItem onClick={signouthandler}  >Logout</MenuItem>
                          </MenuList>
                          }
                  </>
                ):(
                  <Link to="/signin">
                  Sign in
                  </Link>
                )}
            </Header>
            <Main>
              <Routes>
                <Route path='/product/:slug' element={<Product/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/signin' element={<Signin/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/placeorder' element={<Placeorder/>}></Route>
                <Route path='/shipping' element={<Shipping/>}></Route>
                <Route path='/payment' element={<Paymentmethod/>}></Route>
                <Route
                path="/order/:id"
                element={
                  <Order/>
                }
              ></Route>
                <Route path='/orderhistory' element={<Orderhistory/>}></Route>
                <Route path='/' element={<Home/>}></Route>
              </Routes>
            
            </Main>
            <Footer>
              <div> Copyright &copy; 2022 GT-OUTLET ON BEHALF OF HYGIEA LABS.
                All Rights Reserved.
              </div>
            </Footer>
        </div>
        </BrowserRouter>
  );
}

//css
const Main =styled.div`
padding-top:1rem;
flex:1;
// margin-top:3rem;
width:100%;
// height:100%;

`
const Footer=styled.div`
text-align:center;
margin-bottom :15px;
padding:0px 30px;
`
const Header=styled.div`
background-color: #282c34;
min-height: 10vh;
display: flex;
padding:2px 30px;
align-items: center;
justify-content: space-between;
font-size: calc(10px + 2vmin);
color: white;
position:sticky;
top:0;
left:0;
right:0;
// margin-bottom:3rem;
position:relative;
`
const Badge=styled.div`

background:red;
`
const MenuList=styled.div`
position:absolute;
top:70px;
right:0px;
width:200px;
display:flex;
flex-direction:column;
justify-content:space-between;
// border:1px solid black;
background:gray;
padding:6px;
color: black;

`

const MenuItem=styled.div`

width:100%;
cursor:pointer;
margin-bottom:5px;
padding:2px;
background-color:#E8E8E8;
`
export default App;
