import express from "express";
import data from "../data.js";
import Product from "../models/productmodel.js";
import User from "../models/usermodel.js";

const mainrouter=express.Router();



mainrouter.get("/",async(req,res)=>{
    await Product.remove({});
    const createdProducts=await Product.insertMany(data.products);
    await User.remove({});
    const createdUsers=await User.insertMany(data.users);
    res.send({createdProducts,createdUsers})
})


export default mainrouter;