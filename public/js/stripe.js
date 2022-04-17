/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51Ko708C1c9mb3ttnjBLO3XGHaoBfZarTQNhKGCI8IWdDq3t5THRQDfDXRw318cC7OSlMVTiOhJNoQ1BcmU8008W900LxppV5JO');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout from + chage credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });

  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};