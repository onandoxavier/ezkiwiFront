import React, { useCallback } from "react";
import api from './../../services/api';
import stripePromise from "../../utils/stripeHelper";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const CheckoutForm: React.FC =() => {

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await api.post("/api/checkout/create-session");
    
      // Retorna o clientSecret da resposta
      return response.data.clientSecret;
    }catch (error) {
      // Trata o erro caso ocorra
      console.error('Erro ao buscar o clientSecret:', error);
      throw error; // Opcional: Re-lança o erro caso você precise tratá-lo em outro lugar
    }
  }, []);
  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutForm;