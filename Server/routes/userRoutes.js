const { Router } = require("express");
const { User } = require("../Schema/userSchema");
const userMiddleware = require("../middlewares/userMiddleware");
const router = Router();
const { credentaialsZodSignUpSchema, credentaialsZodSignInSchema } = require("../Validator");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.SECRET;

// Routes for the User Registration and Login:
router.post('/register', async (req, res) => {
	const { fullname, username, password } = req.body;

	try {
		const parsedValue = credentaialsZodSignUpSchema.safeParse({
			fullname,
			username,
			password
		})
		if(parsedValue.success) {
			await User.create({
				fullname,
				username,
				password
			})
			res.json("User created successfully!!!")
		} else {
			res.json({
				msg: "Wrong inputs types"
			})
		}
	} catch(error) {
		console.log("Error Occured!!!");
		res.json({
			msg: error
		})
	}
})
router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const parsedValue = credentaialsZodSignInSchema.safeParse({
			username,
			password
		})
		if(parsedValue.success) {
			const user = await User.findOne({ username });
			if(user) {
				const token = jwt.sign({username} , jwt_secret);
				res.json({
					token: token
				})
			} else {
				res.json({
					msg: "User doesn't exist!!!"
				})
			}
		} else {
			res.json({
				msg: "Worng inputs!!!"
			})
		}
	} catch(error) {
		res.json({
			msg: "Error Occured!!!"
		})
	}
})

// Routes to get all the products and a product with the specific id:
// router.get("/products", async (req, res) => {
// 	try {
		
// 	} catch(err) {

// 	}
// })
// router.get("/products/:id", async (req, res) => {

// })

module.exports = router;