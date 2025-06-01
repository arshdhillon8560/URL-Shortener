const express = require("express");
const path=require('path');
const {connectMongoDB}=require("./connection")
const urlRoute =require('./routes/url')
const staticRoute =require("./routes/staticRouter");
const app =express();
const PORT =3000;
const URL =require('./models/url')

connectMongoDB('mongodb://localhost:27017/urlshortner').then(()=>console.log("MongoDB Connected...")
);

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.get("/test",async (req,res)=>{
//     const allUrls =await URL.find({});
//     return res.render("home",{
//         urls:allUrls,
//     })
// })

app.use('/url',urlRoute);
app.use("/",staticRoute);
app.listen(PORT,()=> console.log(`Server Started at Port- ${PORT}`));