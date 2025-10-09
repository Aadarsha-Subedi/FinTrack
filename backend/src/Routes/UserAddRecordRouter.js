//THIRD PARTY IMPORTS
import express from 'express';
import userAddRecordController from '../Controllers/UserAddRecordController.js';

//CONTROLLERS

const userAddRecordRouter = express.Router();
userAddRecordRouter.post('/add', userAddRecordController);

export default userAddRecordRouter;