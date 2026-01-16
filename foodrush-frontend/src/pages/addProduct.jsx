import { useEffect, useState } from 'react';
import styles from './addProduct.module.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const navigate = useNavigate()

    useEffect(() => {
        authCheck()
    }, [])

    async function authCheck() {
        const url = "http://localhost:3200/order/authCheck";
        const authRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });

        const res = await authRes.json();
        if (!res.success) {
            alert(res.message)
            navigate('/login')
        } else {
            // alert(res.message)
        }
    }

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('')
    const fileRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addProduct = async (e) => {
        e.preventDefault();
        if (!image || !name || !desc || !price) {
            alert("All fields are required")
            return;
        }
        setIsSubmitting(true)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", desc);
        formData.append("price", price);
        formData.append("image", image);

        const url = "http://localhost:3200/order/addProduct";
        const productRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })

        const res = await productRes.json();
        if (!res.success) {
            alert(res.message)
            setIsSubmitting(false)
        } else {
            alert(res.message)
            setName('')
            setDesc('')
            setPrice('')
            fileRef.current.value = "";
            setIsSubmitting(false)
        }
    }

    const handleLogout = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:3200/order/logout";
        const logoutRes = await fetch(url, {
            method: "POST",
            credentials: 'include',
        })
        const res = await logoutRes.json();
        if(res.success){
            navigate('/login')
        }else {
            alert(res.message)
        }

    }

    return (
        <div className={styles.productContainer}>
            <h1>Add Product</h1>
            <h5>Welcome Admin</h5>
            <div className={styles.productWrapper}>
                <form onSubmit={addProduct}>
                    <label >Add product image</label>
                    <input name="image" ref={fileRef} type="file" onChange={(e) => setImage(e.target.files[0])} placeholder="product image" />
                    <label>Enter product name</label>
                    <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="product name" />
                    <label>Enter product price</label>
                    <input name="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="product price" />
                    <label >Enter product description</label>
                    <textarea name="description" value={desc} type="text" rows={4} onChange={(e) => setDesc(e.target.value)} placeholder="product description" ></textarea>
                    <div className={styles.productBtn}>
                        <button type='submit' disabled={isSubmitting}> {isSubmitting ? "Adding..." : "Add Product"}</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;