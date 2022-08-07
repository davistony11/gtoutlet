import React from 'react'
import styled from "styled-components"

export default function Checkoutsteps(props) {
  return (
    <Container>
    <Row className="checkout-steps">
        <Col className={props.step1 ? 'active' : ''}> Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}> Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}> Payment</Col>
      <Col className={props.step4 ? 'active' : ''}> Place Order</Col>
    </Row>
    </Container>
  )
}

const Col=styled.div`
// border:1px solid black;
width:70%;
padding-bottom:10px;
`
const Row=styled.div`
display:flex;
width:90%;
flex-direction:row;
align-items:center;
// justify-content:center;
`
const Container=styled.div`
display:flex;
align-items:center;
justify-content:center;
margin-bottom:20px;
`

