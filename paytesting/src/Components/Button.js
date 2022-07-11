import React from 'react';
import styled from 'styled-components';
// import { PaystackButton } from 'react-paystack';

const Container = styled.div`
display: flex;
align-items:center;
justify-content:center ;
height:50vh ;
`

const ClickButton = styled.button`
width:20% ;
padding:10px ;
background-color: teal; 
color: white ;
font-weight:600 ;
border:none ;
cursor: pointer;
`


// // you can call this function anything
// const handlePaystackSuccessAction = (reference) => {
//     // Implementation for whatever you want to do with reference and after success call.
//     console.log(reference);
//   };

//   // you can call this function anything
//   const handlePaystackCloseAction = () => {
//     // implementation for  whatever you want to do when the Paystack dialog closed.
//     console.log('closed')
//   }

//   const componentProps = {
//       ...config,
//       text: 'Paystack Button Implementation',
//       onSuccess: (reference) => handlePaystackSuccessAction(reference),
//       onClose: handlePaystackCloseAction,
//   };



const Button = () => {
    return <Container>

    {/* <PaystackButton {...componentProps} /> */}
    <ClickButton>PAY NOW</ClickButton>
    </Container>;
}

export default Button;