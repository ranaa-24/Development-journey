const jwt = require('jsonwebtoken');

function authenticateJWT(secretKey){        // returning a middleware funtion for diff secret keys
    return function (req, res, next){
        let token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ message: "Access Denied!!" })
        }
        try{
            let decodedObject = jwt.verify(token, secretKey);
            req.userId = decodedObject.id;
        } catch(err){
            return res.status(403).json({message : 'Invalid token, Please re-login'})
        }
        next();
    }
}

module.exports = authenticateJWT;