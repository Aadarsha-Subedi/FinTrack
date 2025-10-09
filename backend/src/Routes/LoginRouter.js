//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import loginController from '../Controllers/LoginController.js';

const loginRouter = express.Router();
loginRouter.post('/login', loginController);

export default loginRouter;