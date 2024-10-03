const jwt = require("jsonwebtoken")
const firma = process.env.JWT_SECRET_KEY;


const validarPeticion = (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        const validPayload = jwt.verify(token, firma);
        next();
    } catch (error) {
        res.status(401).json({message:"Token Invalido"})
    }

}



