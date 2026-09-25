const jwt = require('jsonwebtoken');

function authenticate(req, res, next){
    const auth = req.get('Authorization') || req.get('auth');
    const [scheme, token] = auth ? auth.split(" ") : [];
    if(scheme !== 'Bearer' || !token) return res.status(401).send({err: "Authentication required"});

    try{
         req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(err){
        return res.status(401).send({err: "Invalid or expired token"});
    }
}

module.exports = authenticate;

 

 