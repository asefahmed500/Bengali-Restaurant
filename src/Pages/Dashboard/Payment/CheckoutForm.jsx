import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseCart from "../../../Hooks/UseCart";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setclientSecret] = useState();
    const [error, seterror] = useState('')
    const [transactionId, settransactionId] = useState();
    const axiosSecure = useAxiosSecure();
    const [cart , refetch] = UseCart();
    const { user } = UseAuth();

    const navigate = useNavigate()

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setclientSecret(res.data.clientSecret)
                })
        }

    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            seterror(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            seterror('')
        }

        // confirm payment
        const { paymentIntent, error: confrimerror } = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user?.displayName || 'anonymous'

                }
            }

        })

        if (confrimerror) {
            console.log('confrim error')
        }
        else {

            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                settransactionId(paymentIntent.id)

                // now save the paymnent in the database 

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log(res.data)
                refetch();
                if(res.data?.paymentResult?.insertedId){
                    // 
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment wad Successfull",
                        showConfirmButton: false,
                        timer: 1500
                      });

                      navigate('/dashboard/paymenthistory')
                }
            }

        }

    };


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-square my-6" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-300"> Your transaction id : {transactionId}</p>}

        </form>
    );
};

export default CheckoutForm;