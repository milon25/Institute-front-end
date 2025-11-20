import React, { useEffect, useState } from 'react'
import Sidebar from '../assets/components/Sidebar'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { data } from 'react-router';

const Payment = () => {

    let [message, setMessage] = useState("")
    let [amount, setAmount] = useState(0)


    let handlePayment = () => {
        axios.post("https://institute-back-end.onrender.com/payment", {
            amount: 100,
            studentname: JSON.parse(localStorage.getItem("user"))

        }).then((data) => {

            if (data.data.message) {
                setMessage(data.data.message)
                return

            }
            console.log(data.data.payment_url
            )
            window.location.href = data.data.payment_url

        })
    }


    useEffect(() => {


        axios.get("https://institute-back-end.onrender.com/duepayment",).then((data) => {

            setAmount(data.data)


        })


    }, [])


    return (
        <div>

            <div className='main'>

                <div className='left'>

                    <Sidebar />

                </div>

                <div className='right'>
                    <h1> {message} </h1>

                    <Alert variant='info'>
                        Your pyament amount is {amount} taka
                    </Alert>


                    <Button variant="primary" onClick={handlePayment}>Make Payment</Button>



                </div>

            </div>


        </div>
    )
}

export default Payment









