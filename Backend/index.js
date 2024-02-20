import express from "express"
import connectionDB from "./config/dbConnection.js";
import userRoute from "./routes/userRoute.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import  productRoute  from "./routes/productRoute.js";
import  blogRoute  from "./routes/blogRoute.js";
const app = express();
const port =  3000;
connectionDB();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use('/api/blog', blogRoute);
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Running port is ${port}`)
});