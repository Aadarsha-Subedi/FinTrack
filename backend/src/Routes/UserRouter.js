//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import userController from '../Controllers/UserController.js';

const userRouter = express.Router();
userRouter.get('/', userController);

export default userRouter;