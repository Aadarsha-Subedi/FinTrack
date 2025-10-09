//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import logoutController from '../Controllers/LogoutController.js';

const logoutRouter = express.Router();
logoutRouter.get('/logout', logoutController);

export default logoutRouter;