import nodemailer from 'nodemailer';
import orderModel from "../model/orderModel.js";
import Product from '../model/addProduct.js';
import cloudinary from '../config/cloudinary.js';
import adminModel from '../model/adminSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import e from 'express';


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const orderConfirm = async (req, resp) => {
    try {

        const { food, quantity, price, name, email, number, address } = req.body;
        if (!food || !name || !email || !number || !address) {
            return resp.status(400).json({
                message: 'All fields are required!',
                success: false,
            })
        }

        const order = await orderModel.create({ food, quantity, price, name, email, number, address });


        const orderRes = await transporter.sendMail({
            from: `"FoodRush": <${process.env.EMAIL_USER}>`,
            to: "itsrafay28@gmail.com",
            subject: "Your FoodRush Order is Confirmed 🍔🍕",
            html: `
            <h2>Hello ${name},</h2>
            <p>Your order has been successfully placed!</p>
            <p><b>Food:</b> ${food}</p>
            <p><b>Quantity:</b> ${quantity || 1}</p>
            <p><b>Total Price:</b> ${price || "Will be confirmed"}</p>
            <p><b>Delivery Address:</b> ${address}</p>
            <br/>
            <p>Thank you for ordering from <b>FoodRush</b> 🚀</p>
`
        })

        console.log(orderRes)

        return resp.status(200).json({
            message: 'Your order is confirmed',
            success: true,
            order,
        })

    } catch (err) {
        console.log(err)
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const addProduct = async (req, resp) => {
    try {
        const { name, description, price } = req.body;
        if (!req.file || !name || !description || !price) {
            return resp.status(400).json({
                message: 'All field are required!',
                success: false,
            })
        }
        console.log("FILE:", req.file);
        console.log("BODY:", req.body);
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = uploadResult.secure_url;
        const product = await Product.create({ name, description, price, image: imageUrl });
        resp.status(201).json({
            message: 'Product added successfully',
            success: true,
            product,
        });

    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false
        })
    }
}

export const getProduct = async (req, resp) => {
    try {
        const products = await Product.find();
        resp.status(200).json({
            success: true,
            message: 'Get all product',
            product: products,
        })
    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

// export const signUp = async (req, resp) => {
//     try {
//         const { name, email, password } = req.body;
//         if (!name || !email || !password) {
//             return resp.status(400).json({
//                 message: 'All fields are required!',
//                 success: false,
//             })
//         }

//         const admin = await adminModel.findOne({ email })
//         if (admin) {
//             return resp.status(409).json({
//                 message: 'Email already exist!',
//                 success: false,
//             })
//         }

//         const hashPass = await bcrypt.hash(password, 10)

//         const newAdmin = await adminModel.create({ name, email, password: hashPass });

//         resp.status(201).json({
//             success: true,
//             message: 'Admin registered successfully!',
//             admin: {
//                 id: newAdmin_id,
//                 name: newAdmin.name,
//                 email: newAdmin.email,
//             }
//         })
//     } catch (err) {
//         resp.status(500).json({
//             message: err.message,
//             success: false,
//         })
//     }
// }


export const login = async (req, resp) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return resp.status(400).json({
                message: 'Enter email & password!',
                success: false,
            })
        }
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return resp.status(401).json({
                message: 'Invalid email!',
                success: false,
            })
        }
        const isPassword = await bcrypt.compare(password, admin.password);
        if (!isPassword) {
            return resp.status(401).json({
                message: 'Invalid Password!',
                success: false,
            })
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_KEY, { expiresIn: '1d' })

        resp.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })

        resp.status(200).json({
            message: 'Login Successfully',
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

export const checkAuth = async (req, resp) => {
    try {
        resp.status(200).json({
            message: 'Welcome admin',
            success: true,
        })
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}


export const logout = async (req, resp) => {
    try {
        resp.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,

        })

        resp.status(200).json({
            message: "Logout Successfull",
            success: true,
        })


    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}