import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    
    const token = req.cookies.token
    
    if(!token) return res.status(401).json({message: "access denide"})

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        
        req.user = decode

        next()  
    } catch (error) {
        return res.status(403).json({message: "invalid or expire token"})
    }
}

export default verifyToken