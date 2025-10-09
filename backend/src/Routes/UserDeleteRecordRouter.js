//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import userDeleteRecordController from '../Controllers/UserDeleteRecordController.js';

const userDeleteRecordRouter = express.Router();
userDeleteRecordRouter.delete('/delete/:transactionId', userDeleteRecordController);

export default userDeleteRecordRouter;