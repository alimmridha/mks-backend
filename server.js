const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

const Order = mongoose.model("Order", {
  name: String,
  phone: String,
  product: String
});

app.get("/", (req,res)=>{
  res.send("MKS Backend Running");
});

app.post("/order", async (req,res)=>{
  const order = new Order(req.body);
  await order.save();
  res.json({message:"Order saved"});
});

app.get("/orders", async (req,res)=>{
  const data = await Order.find();
  res.json(data);
});

app.listen(5000, ()=>console.log("Server running"));
