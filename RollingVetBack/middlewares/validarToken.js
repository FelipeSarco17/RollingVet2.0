const jwt = require("jsonwebtoken")
const firma = process.env.JWT_SECRET_KEY;


const validarPeticion = (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if(!token) res.status(400).json({message:"Token expirado o inexistente"});
        const validPayload = jwt.verify(token, firma);
        next();
    } catch (error) {
        res.status(401).json({message:"Token Invalido"})
    }

}



