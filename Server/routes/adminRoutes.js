const { Router } = require("express");
const { Admin } = require("../Schema/userSchema");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = Router();
const { credentaialsZodSignUpSchema, credentaialsZodSignInSchema } = require("../Validator");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.SECRET;

router.post('/register', async (req, res) => {
	const { fullname, username, password } = req.body;

	try {
		const parsedValue = credentaialsZodSignUpSchema.safeParse({
			fullname,
			username,
			password
		})
		if(parsedValue.success) {
			await Admin.create({
				fullname,
				username,
				password
			})
			res.json("Admin created successfully!!!")
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
			const newAdmin = await Admin.findOne({ username });
			if(newAdmin) {
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

router.post("/products", async (req, res) => {
    
})
router.put("/products/:id", async (req, res) => {

})
router.delete("/products/:id", async (req, res) => {

})

module.exports = router;