import express from 'express';
import { addProduct, checkAuth, getProduct, login, logout, orderConfirm } from '../controllers/orderController.js';
import upload from '../middleware/upload.js';
import verifyAdmin from '../middleware/verifyAdmin.js';

const orderRoutes = express.Router();

orderRoutes.post('/confirm', orderConfirm)

orderRoutes.post('/login', login);

orderRoutes.get('/authCheck', verifyAdmin, checkAuth);

orderRoutes.post('/addProduct', verifyAdmin, upload.single("image"), addProduct)

orderRoutes.get('/getProduct', getProduct);

orderRoutes.post('/logout', logout)

// orderRoutes.post('/signUp', signUp)





export default orderRoutes;