const { nanoid }=require("nanoid");

const URL =require('../models/url');

async function handleGenerateNewShortURL(req,res){
   const body = req.body;
   if(!body.url) return res.status(400).json({error:'url is required'})
   const shortID =nanoid(8);
   await URL.create({
       ShortId:shortID,
       redirectURL:body.url,
       visitHistory:[],
   });
   return res.render("home",{
    id:shortID,
   })
}

async function getOrigURLFromShortURL(req, res) {
   const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate(
     { ShortId: shortId }, 
     {
       $push: {
         visitHistory: {
           timestamp: Date.now(),
         },
       },
     }
   );

   if (!entry) {
     return res.status(404).json({ error: "Short URL not found" });
   }

   res.redirect(entry.redirectURL);
}

async function  handleGetAnalytics(req,res){
    const shortId =req.params.shortId;
    const result= await URL.findOne({ShortId:shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}

module.exports ={
    handleGenerateNewShortURL,
    getOrigURLFromShortURL,
    handleGetAnalytics,
}