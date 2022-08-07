import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';

import Checkoutsteps from '../components/checkoutsteps';
import { Store } from '../store';

export default function Paymentmethod() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  console.log(paymentMethodName);
  return (
    <>
      <Checkoutsteps step1 step2 step3></Checkoutsteps>
      <Container>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Menu>
            <Input
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />paypal
          </Menu>
          <Menu className="mb-3">
            <Input
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />Stripe
          </Menu>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
const Container=styled.div`


`
const Button=styled.button`
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
  margin: 15px 2px;
//   padding: 10px;
  
`;
const Menu=styled.div`
margin:0px 20px; 
width:20%;
display:flex;
align-items:center;
justify-content:space-between;
`