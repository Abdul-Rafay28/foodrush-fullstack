import jwt from 'jsonwebtoken';

const verifyAdmin = async (req, resp, next) => {
    const token = req.cookies.token;
    if(!token){
        return resp.status(401).json({
            message: 'Unauthorized, login first',
            success: false
        })
    }

    try{
        jwt.verify(token, process.env.JWT_KEY, (err, decoded)=>{
            if(err){
                return resp.status(401).json({
                    message: 'Invalid & expire token!',
                    success: false,
                })
            }
            req.admin = decoded;
            next();
        })
    }catch(err){
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }




}

export default verifyAdmin;