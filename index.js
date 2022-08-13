import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import router from "./app/routes/user.routes.js";

//Accessing the environment variables
dotenv.config();

const app =express();
const port =  process.env.PORT;

//Middleware for parsing json body
app.use(express.json());

//Route middleware
app.use('/users', router)

// Connection to the database
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.czf9h.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoString, {useNewUrlParser: true})
mongoose.connection.on("error", function(error) {
  console.log(error)
})
mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})

