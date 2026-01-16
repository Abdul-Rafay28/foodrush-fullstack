import { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/order/login";
        const loginRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        const res = await loginRes.json();
        if (!res.success) {
            setError(res.message)
        } else {
            navigate('/addProduct');
        }
    }
    return (
        <div className={styles.loginWrapper}>
            <h1>Sign in</h1>
            <div className={styles.loginContainer}>
                <form onSubmit={handleLogin} autoComplete="off" >
                    <span>{error && error}</span>
                    <label htmlFor="email">Enter your email</label>
                    <input onChange={(e) => setEmail(e.target.value)} autoComplete="new-email" id="email" type="text" placeholder="Enter email" />
                    <label htmlFor="password">Enter your password</label>
                    <input onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" type="password" placeholder="Enter password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;