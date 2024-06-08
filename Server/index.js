const express = require("express");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);

const port = process.env.port;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
})