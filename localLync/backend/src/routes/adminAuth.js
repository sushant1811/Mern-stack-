const express=require('express');
const { addStore, addItemtoStore } = require('../controllers/adminAuthent');
const adminMiddleware = require('../middleware/adminMiddleware');


const adminRouter=express.Router();

adminRouter.post('/addStore',adminMiddleware, addStore);
adminRouter.post('/addItemtoStore/:storeId',adminMiddleware,addItemtoStore);

module.exports=adminRouter;