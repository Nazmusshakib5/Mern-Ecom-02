const express =require('express');
const router =require('./src/routes/api');
const app= new express();

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');

const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');
const path = require("path");
require("dotenv").config();


let URL='mongodb+srv://mongoShakib:<password>@cluster0.gtiw82u.mongodb.net/Ecommerce';
let OPTION={user:'mongoShakib',pass:'mongoShakib69',autoIndex:true};
// let URL="mongodb://localhost:27017/Sellmode-mernEcom"
// let OPTION={user:'',pass:"",autoIndex:true};
mongoose.connect(URL,OPTION).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(cookieParser());
app.use(cors())
// app.use(helmet())
app.use(
    helmet({
        contentSecurityPolicy: false,
        xDownloadOptions: false,
    }),
);
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

app.set('etag', false);
app.use("/api",router)
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(express.static('client/dist'));

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})

module.exports=app;