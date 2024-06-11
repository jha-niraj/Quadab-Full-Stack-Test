const zod = require("zod");

const credentaialsZodSignUpSchema = zod.object({
	fullname: zod.string(),
	username: zod.string().email(),
	password: zod.string(),
});

const credentaialsZodSignInSchema = zod.object({
	username: zod.string().email(),
	password: zod.string()
})

const productCredentialsValidator = zod.object({
	image: zod.string(),
	title: zod.string(),
	description: zod.string(),
	price: zod.number()
})

module.exports = {
	credentaialsZodSignUpSchema,
	credentaialsZodSignInSchema,
	productCredentialsValidator
};