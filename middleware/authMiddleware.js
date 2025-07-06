const jwt = require("jsonwebtoken");

const authMiddleware = (req, res , next) => {

    const authHeader = req.headers.authorization;

    if(!authorization || !authHeader.startWith("Bearer ")){
        return res.status(401).json({message: "No token provided, authorization denied "});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user ={ id: decoded.userId};

        next();
    }
    catch(err){
        res.status(401).json({message: " Invalid or expired token"});
    }
};

module.exports = authMiddleware;