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

module.exports = {
	credentaialsZodSignUpSchema,
	credentaialsZodSignInSchema
};