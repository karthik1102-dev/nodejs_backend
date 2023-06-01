require("../config/database");
const jwt = require("jsonwebtoken");

const loggedIn = function (req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("Access Denied");
    try {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token,process.env.TOKEN_KEY); 
      
        let roleId = req.header('role_id');

        if( roleId != 1 ){ // Check authorization,  1 = Admin role
                return res.status(401).send("Unauthorized!, you are not a admin");
        }
        req.user = verified;

        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}

exports.loggedIn = loggedIn