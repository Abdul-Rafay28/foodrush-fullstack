import { useEffect, useState } from 'react';
import heroImage from '../assets/fastFood.jpg';
import image1 from '../assets/foodImage1.jpg';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

function HomePage() {

    const [menu, setMenu] = useState([]);

    const emailTitle1 = "Premium Meal Deal";
    const emailTitle2 = "Duo Special Deal";
    const emailTitle3 = "Family Feast Combo";
    const price1 = "3200";
    const price2 = "4000";
    const price3 = "5500";


    useEffect(()=>{
        getallProduct();
    }, [])

    const getallProduct = async () => {
        const url = "http://localhost:3200/order/getProduct";
        const productRes = await fetch(url);
        const res = await productRes.json();
        if (res.success) {
            setMenu(res.product)
        } else {
            alert(res.message)
        }

    }

    return (
        <>
            <div className={styles.heroWrapper}>
                <div className={styles.heroimage}>
                    <img src={heroImage} alt="foodImage" />
                </div>
                <div className={styles.heroTitle}>
                    <h1>Fast & Fresh Food Delivered to Your Door</h1>
                    <h4>Order your favorite burgers, pizzas and snacks</h4>
                    <button><Link to={'/deliveryOrder'}>Order Now</Link></button>
                </div>
            </div>

            {/* DEALS SECTION */}
            <div className={styles.hotFoodWrapper}>
                <h1>Check out how you can save anytime of the day with Food Rush</h1>

                <div className={styles.hotFoodContainer}>
                    <div className={styles.foodDeals}>
                        <img src={image1} alt="foodImage" />
                        <h3>Premium Meal Deal</h3>
                        <h4>RS: 3200</h4>
                        <ul>
                            <li>2 Gourmet Beef Burgers</li>
                            <li>1 Large Loaded Fries</li>
                            <li>2 Chilled Soft Drinks</li>
                            <li>1 Special Sauce Dip</li>
                        </ul>
                        <button className={styles.btnOrder}> <Link to={`/deliveryOrder?food=${encodeURIComponent(emailTitle1)} &price=${encodeURIComponent(price1)}`} >Order Now</Link></button>
                    </div>

                    <div className={styles.foodDeals} >
                        <img src={image1} alt="foodImage" />
                        <h3>Duo Special Deal</h3>
                        <h4>RS: 4000</h4>
                        <ul>
                            <li>2 Zinger Deluxe Burgers</li>
                            <li>1 Family Fries Bucket</li>
                            <li>2 Regular Soft Drinks</li>
                            <li>1 Chocolate Lava Dessert</li>
                        </ul>
                        <button className={styles.btnOrder}> <Link to={`/deliveryOrder?food=${encodeURIComponent(emailTitle2)}&price=${encodeURIComponent(price2)}`}>Order Now</Link></button>
                    </div>

                    <div className={styles.foodDeals}>
                        <img src={image1} alt="foodImage" />
                        <h3>Family Feast Combo</h3>
                        <h4>RS: 5500</h4>
                        <ul>
                            <li>4 Signature Chicken Burgers</li>
                            <li>2 Large Fries</li>
                            <li>4 Soft Drinks</li>
                            <li>1 Party Wings Bucket (8 pcs)</li>
                        </ul>
                        <button className={styles.btnOrder}> <Link to={`/deliveryOrder?food=${encodeURIComponent(emailTitle3)}&price=${encodeURIComponent(price3)}`}>Order Now</Link></button>
                    </div>
                </div>
            </div>

            <div className={styles.menuContainer}>
                <h1>Explore Our Menu</h1>
                <h4>Choose your favorite food and order now</h4>
                <div className={styles.menuWrapper}>
                    {
                        menu.map((data, index) => (
                            <div className={styles.menuItem} key={index}>
                                <img src={data.image} alt="img" />
                                <div className={styles.menuText}>
                                    <h2>{data.name}</h2>
                                    <h3>{data.description}</h3>
                                    <h5>{`RS: ${data.price}`}</h5>
                                    <button className={styles.menuBtn}> <Link to={`/deliveryOrder?food=${encodeURIComponent(data.name)}&price=${encodeURIComponent(data.price)}`}>Order Now</Link></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerContainer}>

                    <div className={styles.footerBrand}>
                        <h2>FoodRush</h2>
                        <p>Fast & Fresh Food Delivery</p>
                    </div>

                    <div className={styles.footerLinks}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>Home</li>
                            <li>Delivery</li>
                            <li>About</li>
                        </ul>
                    </div>

                    <div className={styles.footerContact}>
                        <h3>Contact</h3>
                        <p>📞 +92 300 1234567</p>
                        <p>✉️ info@foodrush.com</p>
                    </div>

                </div>

                <div className={styles.footerBottom}>
                    <p>© 2026 FoodRush. All rights reserved.</p>
                </div>
            </footer>


        </>
    )
}

export default HomePage;