import express from "express"
import connectionDB from "./config/dbConnection.js";
import authRoute from "./routes/authRoute.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import  productRoute  from "./routes/productRoute.js";
import  blogRoute  from "./routes/blogRoute.js";
import blogcategoryRoute from "./routes/blogcategoryRoute.js";
import categoryRoute from "./routes/pCategoryRoute.js"
import brandRoute from "./routes/brandRoute.js";
import colorRoute from "./routes/colorRoute.js";
import couponRoute from "./routes/cuoponRoute.js";
import { enqRoute } from "./routes/enquiryRoute.js";
const app = express();
const port =  3000;
connectionDB();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use(cookieParser());
app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use('/api/blog', blogRoute);
app.use("/api/category", categoryRoute);
app.use("/api/blogcategory", blogcategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/color", colorRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/enquiry",enqRoute);




// errors handler middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Running port is ${port}`)
});