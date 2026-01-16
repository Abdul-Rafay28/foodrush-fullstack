import { useLocation, useNavigate } from 'react-router-dom';
import styles from './contact.module.css';
import { useState } from 'react';

function Contact() {
    const location = useLocation();
    const selectFood = new URLSearchParams(location.search).get('food');
    const totlePrice = new URLSearchParams(location.search).get('price');
    const unitPrice = Number((totlePrice || '').replace(/\D/g, ''));
    const navigate = useNavigate()

    const [food, setFood] = useState(selectFood || "");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState(unitPrice)
    const [quantity, setQuantity] = useState(1)

    const handleTotlePrice = (e) => {
        const q = (e.target.value);
        setQuantity(q)
        setPrice(q * unitPrice)
    }

    const orderSumbit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/order/confirm";
        const orderRes = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ food, name, email, number, address, price, quantity }),
        });
        const res = await orderRes.json();
        if (res.success) {
            alert(res.message)
            navigate('/')
            
        } else {
            alert(res.message)
        }
    }

    return (
        <>
            <div className={styles.contactWrapper}>
                <h1>Place Your Order</h1>
                <h4>Fill in your details and we’ll deliver your food fast & fresh.</h4>
                <div className={styles.contactContainer}>
                    <form onSubmit={orderSumbit}>
                        <label htmlFor="product">Selected Product</label>
                        <input type="text" value={food} onChange={(e) => setFood(e.target.value)} readOnly={!!selectFood} placeholder="Select product" />
                        {
                            selectFood && (
                                <>
                                    <label htmlFor="quantity">Quantity</label>
                                    <input onChange={handleTotlePrice} value={quantity} type="number" min='1' />
                                    <label htmlFor="price">Total Price</label>
                                    <input value={price} type="text" readOnly />
                                </>
                            )}
                        <label htmlFor="name">Your Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} id='name' placeholder="Enter name" />
                        <label htmlFor="email">Email Address</label>
                        <input type="text" id='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" />
                        <label htmlFor="number">Phone Number</label>
                        <input type="text" onChange={(e) => setNumber(e.target.value)} value={number} id='number' placeholder="Enter your phone number" />
                        <label htmlFor="address">Delivery Address</label>
                        <textarea id="address" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Enter Your Home Address" rows={5}></textarea>
                        <button>Confirm Order</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact;


