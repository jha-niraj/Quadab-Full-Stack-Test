const { Router } = require("express");
const { User, Product, Cart } = require("../Schema/userSchema");
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
					userId: user._id,
					fullname: user.fullname,
					email: user.username,
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
router.get("/products", async (req, res) => {
	try {
		const allProducts = await Product.find();
		if(!allProducts) {
			return res.status(501).json({
				msg: "Cannot retrieve the products at the moment"
			})
		} else {
			return res.status(200).json({
				allProducts
			})
		}
	} catch(err) {
		return res.status(501).json({
			msg: err
		})
	}
})
router.get("/products/:id", userMiddleware, async (req, res) => {
	const productId = req.params.id;

	try {
		const product = await Product.findOne({ _id: productId });
		if(!product) {
			return res.status(501).json({
				msg: "Cannot fetched the particular product"
			})
		} else {
			return res.status(200).json({
				product
			})
		}
	} catch(err) {
		return res.status(501).json({
			msg: err
		})
	}
})

router.post("/personalcart", userMiddleware, async (req, res) => {
	const { userId } = req.body;

	try {
		const user = await User.findOne({ _id: userId })
		if(!user) {
			return res.status(501).json({
				msg: "Cannot find the user!!!"
			})
		} else {
			const userProducts = user.cart;
			if(userProducts.length > 0) {
				return res.status(200).json({
					userProducts
				})
			} else {
				return res.status(200).json({
					msg: "No products in the User's cart"
				})
			}
		}
	} catch(err) {	
		return res.status(501).json({
			msg: err
		})
	}
})
router.post("/cart", userMiddleware, async (req, res) => {
	const { userId, productId } = req.body;

	try {
		const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user.cart) {
            user.cart = [
                {
                    productId: product._id,
                    quantity: 1
                }
            ];
        } else {
            let existingProduct = user.cart.find((productInCart) => productInCart.productId.equals(product._id));
            if (!existingProduct) {
                user.cart.push({
                    productId: product._id,
                    quantity: 1
                });
            } else {
                existingProduct.quantity++;
            }
        }

        await user.save();
        return res.status(200).json({
            msg: "Pushed the product to the cart"
        })
	} catch(err) {	
		return res.status(501).json({
			msg: err
		})
	}
})
router.delete("/cart/:id", userMiddleware, async (req, res) => {
	
})

module.exports = router;