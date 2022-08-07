import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { Store } from '../store';
import Checkoutsteps from "../components/checkoutsteps"
function Shipping() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const{
        cart:{shippingAddress},
    }=state;

    const [fullName, setfullName] = useState(shippingAddress.fullName || '');
    const [address, setaddress] = useState(shippingAddress.address || '');
    const [city, setcity] = useState(shippingAddress.city || '');
    const [postalCode, setpostalCode] = useState(
      shippingAddress.postalCode || ''
    );
    const [country, setcountry] = useState(shippingAddress.country || '');
    const submitHandler=(e)=>{

        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
              fullName,
              address,
              city,
              postalCode,
              country,
            
            },
          });
          localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
              fullName,
              address,
              city,
              postalCode,
              country,
          
            })
          );
          navigate('/payment');
    }
  return (
      <>
      <Checkoutsteps step1 step2 />

      

        
        <Container>
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
        <Input placeholder="full name" required value={fullName} onChange={(e)=>setfullName(e.target.value)} />
        <Input placeholder="Addresss" required value={address} onChange={(e)=>setaddress(e.target.value)} />
        <Input placeholder="city" required value={city} onChange={(e)=>setcity(e.target.value)} />
        <Input placeholder="postal code" required value={postalCode} onChange={(e)=>setpostalCode(e.target.value)} />
        <Input placeholder="country" required  value={country} onChange={(e)=>setcountry(e.target.value)} />
        <Button type='submit'>
            continue
        </Button>
        </Form>
        
        </Container>
    </>
    )
}
const Container=styled.div`
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;

`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin: 15px 0;
  padding: 10px;
`;

const Button=styled.button`

`
export default Shipping