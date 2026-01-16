    import express from 'express';
    import mongoose from 'mongoose';
    import cors from 'cors';
    import 'dotenv/config';
    import orderRouter from './routes/orderRoutes.js'
    import cookieParser from 'cookie-parser';

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }));

    app.use(cookieParser());

    await mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
        console.log('___Connected___')
    })
    
    app.get('/', (req, resp)=>{
        resp.send('Hello Backend')
    })

    app.use('/order', orderRouter);

    app.listen(process.env.PORT, ()=>{
        console.log(`Server running ono port ${process.env.PORT}`);
    });

