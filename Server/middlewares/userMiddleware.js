const jwt = require("jsonwebtoken");
const jwt_secret = process.env.SECRET;

function userMiddleware(req, res, next) {
	const token = req.headers.authorization;
	console.log(token)

	if(!token) {
		return res.status(501).json({
			msg: "Invalid Token"
		})
	}
	try {
		const words = token.split(" ");
		const webToken = words[1];
		const decodedvalue = jwt.verify(webToken, jwt_secret);
		if(decodedvalue.username) {
			next();
		} else {
			console.log("Unauthorized Token!!!");
			res.json({
				msg: "Token is not verified!!!"
			})
		}
	} catch(error) {
		console.log("Error occured!!!");
		return res.status(501).json({
			msg: "Invalid or Token expired!!!"
		})
	}
}

module.exports = userMiddleware;