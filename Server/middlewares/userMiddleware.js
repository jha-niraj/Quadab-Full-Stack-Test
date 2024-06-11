const { User } = require("../Schema/userSchema");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.SECRET;

function userMiddleware(req, res, next) {
	const token = req.headers.authorization;

	if(!token) {
		console.log("Error!!!");
		res.json({
			msg: "Invalid Token"
		})
	}
	try {
		const words = token.split(" ");
		const webToken = words[1];
		const decodedvalue = jwt.verify(webToken, jwt_secret);
		if(decodedvalue.username) {
			req.userId = decodedvalue._id;
			next();
		} else {
			console.log("Unauthorized Token!!!");
			res.json({
				msg: "Token is not verified!!!"
			})
		}
	} catch(error) {
		console.log("Error occured!!!");
		res.json({
			msg: "Invalid or Token expired!!!"
		})
	}
}

module.exports = userMiddleware;