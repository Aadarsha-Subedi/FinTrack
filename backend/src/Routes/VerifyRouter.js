//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import VerifyController from '../Controllers/VerifyController.js';

const verifyRouter = express.Router();
verifyRouter.get('/verify', VerifyController);

export default verifyRouter;