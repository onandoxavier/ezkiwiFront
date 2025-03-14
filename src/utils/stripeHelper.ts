import { loadStripe } from "@stripe/stripe-js";

// Carregar a chave pública do Stripe da variável de ambiente
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default stripePromise;
