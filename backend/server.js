import  express  from "express";
import path from 'path';
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import mainrouter from "./routes/mainrouter.js";
import productRouter from "./routes/productroute.js";
import userRouter from "./routes/userrouter.js";
import Orderrouter from "./routes/orderroute.js";

dotenv.config();


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err.message)

})


const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/main",mainrouter)
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)
app.use("/api/orders",Orderrouter)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})



const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`served at ${port}`);
})