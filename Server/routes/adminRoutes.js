const { Router } = require("express");
const { Admin, Product } = require("../Schema/userSchema");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = Router();
const { credentaialsZodSignUpSchema, credentaialsZodSignInSchema, productCredentialsValidator } = require("../Validator");
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

router.post("/products", adminMiddleware, async (req, res) => {
    const { image, title, description, price } = req.body;

	try {
		const productParsed = productCredentialsValidator.safeParse({ image, title, description, price });
		if(!productParsed.success) {
			return res.status(501).json({
				msg: "Please input the correct data types"
			})
		} else {
			const newProduct = await Product.create({ image, title, description, price });
			if(!newProduct) {
				return res.status(511).json({
					msg: "Product upload failed"
				})
			} else {
				return res.status(200).json({
					msg: "Product uploaded"
				})
			}
		}
	} catch(err) {
		return res.status(501).json({
			msg: err
		})
	}
})
router.put("/products/:id", adminMiddleware, async (req, res) => {
	const productId = req.params.id;
	const { price } = req.body;

	console.log(productId)

	try {
		const product = await Product.updateOne({ _id: productId }, { $set: { price: price } });
		if(!product) {
			return res.status(501).json({
				msg: "Product cannot be updated"
			})
		} else {
			return res.status(200).json({
				msg: "Product updated successfully"
			})
		}
	} catch(err) {
		return res.status(501).json({
			msg: err
		})
	}
})
router.delete("/products/:id", adminMiddleware, async (req, res) => {
	const productId = req.params.id;

	try {
		const deletion = await Product.findByIdAndDelete({ _id: productId })
		if(!deletion) {
			return res.status(501).json({
				msg: "Cannot delete the product"
			})
		} else {
			return res.status(200).json({
				msg: "Product deletion successful"
			})
		}
	} catch(err) {
		return res.status(501).json({
			msg: err
		})
	}
})

module.exports = router;