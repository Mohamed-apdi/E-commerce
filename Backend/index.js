import express from "express"
import connectionDB from "./config/dbConnection.js";
import userRoute from "./routes/userRoute.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
const app = express();
const port =  3000;

app.use(express.json());
connectionDB();

app.use("/api/user",userRoute);

app.use(notFound);
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Running port is ${port}`)
})