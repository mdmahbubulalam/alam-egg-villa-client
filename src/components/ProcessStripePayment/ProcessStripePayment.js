import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51KjJhfGbgevynXCByo4VWrma52KK3qH95jNQxzkRYnZ25Qd3Ul5zJprKSAWO5JaNkj7nCghnYfeKj4aTNpiuBBfT00JrV0aXpj');

const ProcessStripePayment = () => {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
      };
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};

export default ProcessStripePayment;