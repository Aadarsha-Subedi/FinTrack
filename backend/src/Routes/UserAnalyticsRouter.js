//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import userAnalyticsController from '../Controllers/UserAnalyticsController.js';

const userAnalyticsRouter = express.Router();
userAnalyticsRouter.get('/analytics', userAnalyticsController);

export default userAnalyticsRouter;