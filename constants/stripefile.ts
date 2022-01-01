import { loadStripe } from '@stripe/stripe-js';


// let stripePromise: Promise<Stripe | null>;
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//   }
//   return stripePromise;
// };

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
export const initateCheckout = async (productName: string, image: string, price: number) => {

    // Create a Checkout Session.
    const {sessionId} = await fetch(
      '/api/checkout/session',
      { 
        method: 'POST',
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({quantity: 1, productName, image, price})
      },
    ).then(res => res.json());
  
    // if ((checkoutSession as any).statusCode === 500) {
    //   console.error((checkoutSession as any).message);
    //   return;
    // }
  
    // Redirect to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  };


// const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// export const initateCheckout = async() => {
//    const response = await stripe.checkout.sessions.create({
//         success_url: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${window.location.origin}`,
//         line_items: [
//           {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
//         ],
//         mode: 'payment',
//       });
//       console.log(response)
// }
