const express =require('express');
const {handleGenerateNewShortURL,getOrigURLFromShortURL,handleGetAnalytics}=require('../controllers/url')

const router =express.Router();



router.post('/',handleGenerateNewShortURL)
router.get('/:shortId',getOrigURLFromShortURL)
router.get('/analytics/:shortId',handleGetAnalytics)
module.exports=router;