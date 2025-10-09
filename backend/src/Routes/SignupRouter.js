//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import signupController from '../Controllers/SignupController.js';

const signupRouter = express.Router();
signupRouter.post('/signup', signupController);

export default signupRouter;