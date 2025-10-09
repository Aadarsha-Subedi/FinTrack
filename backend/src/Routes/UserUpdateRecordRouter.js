//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import userUpdateRecordController from '../Controllers/UserUpdateRecordController.js';

const userUpdateRecordRouter = express.Router();
userUpdateRecordRouter.put('/update/:transactionId', userUpdateRecordController);

export default userUpdateRecordRouter;