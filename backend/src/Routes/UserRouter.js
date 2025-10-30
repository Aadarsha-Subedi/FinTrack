//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import userController from '../Controllers/UserController.js';

const userRouter = express.Router();
userRouter.post('/', userController);

export default userRouter;
