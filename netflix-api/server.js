const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
const userRoutes = require("./routes/UserRoutes")

const app = express();
env.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("DB Connected")).catch((err)=>console.log(err));


app.use("/api/user",userRoutes);

app.listen(5000, console.log("Server Started"));