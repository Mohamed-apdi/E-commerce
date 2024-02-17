import express from "express"
import connectionDB from "./config/dbConnection.js";
import userRoute from "./routes/userRoute.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const port =  3000;

//app.use(express.json());
app.use(bodyParser.json());
connectionDB();

app.use(cookieParser());
app.use("/api/user",userRoute);

app.use(notFound);
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Running port is ${port}`)
})