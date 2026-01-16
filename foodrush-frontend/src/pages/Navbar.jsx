import { Link } from "react-router-dom";
import logo from '../assets/foodLogo.jpg';
import styles from './navbar.module.css';
function Navbar() {
    return (
        <>
            <header>
                <div className={styles.logoImage}>
                    <img src={logo} alt="logoImage" />
                </div>
                <div className={styles.navLink}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/deliveryOrder'}>Delivery</Link>
                    <Link to={'/about'}>About</Link>
                </div>
            </header>
        </>
    )
}

export default Navbar;