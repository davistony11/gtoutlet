import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import {Link,useLocation, useNavigate} from "react-router-dom"
import axios from "axios"
import {Store} from "../store"

const Signup = () => {
  const navigate=useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';




  const[name,setname]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[confirmpassword,setconfirmpassword]=useState("");

  const {state,dispatch:ctxDispatch}=useContext(Store)
  const {userInfo}=state;
  const handleClick=async(e)=>{
    e.preventDefault();
    if(password!==confirmpassword){
      alert("password do not match");
      return;
    }
    try{
      const {data}=await axios.post("/api/users/signup",{
        name,
        email,
        password
      });
      ctxDispatch({type:'USER_SIGNIN',payload:data});
      console.log(data,"asdf");
      localStorage.setItem('userInfo',JSON.stringify(data));
      navigate(redirect || '/');
    }catch(err){
      alert("invalid email or password")
    }
  }
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN UP</Title>
        <Form onSubmit={handleClick}>
          <Input placeholder="name" required onChange={(e)=>setname(e.target.value)} />
          <Input placeholder="email" required onChange={(e)=>setemail(e.target.value)} />
          <Input type="password" required placeholder="password" onChange={(e)=>setpassword(e.target.value)} />
          <Input type="password" required placeholder="confirm password" onChange={(e)=>setconfirmpassword(e.target.value)} />
          <Button  type="submit" >SIGN UP</Button>
          {/* {error && <Error>something went wrong...</Error>} */}
          <Linka>Already have an acoount</Linka>
          <Link to={`/signin?redirect=${redirect}`} style={{color:"black",fontSize:"14px"}}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`

  height: 100vh;
  margin-top:-90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`

  min-width: 20%;
  max-width: 40%;

  padding: 20px;
  background-color: white;


`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 15px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100px;
  border: none;
  padding: 13px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color:green;
    cursor:not-allowed;
  }
`;

const Linka = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error =styled.span`
color:red;
`

export default Signup;