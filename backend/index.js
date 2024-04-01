const expres = require("express");
const app = expres();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRouts = require("./routes/Payments");
const courseRoutes = require("./routes/Course");


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload  = require("express-fileupoad");
const dotenv = require("dotenv");
const { connect } = require("mongoose");


dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlweware 
app.use(expres.json());
app.use(cookieParser());
 
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp",
  })
);


//cloudinaryConnection
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRouts);

//def route

app.get("/",(req,res)=>{
     return res.json({
        success:true,
        message:'Your server is up and running'
     })
})


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})