//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import UpdateCurrecny from '../Controllers/UpdateCurrency.js';
import GetCurrency from '../Controllers/GetCurrency.js';
import DeleteAccount from '../Controllers/DeleteAccount.js';

const UserSettingsRouter = express.Router();
UserSettingsRouter.put('/settings', UpdateCurrecny);
UserSettingsRouter.get('/settings', GetCurrency);
UserSettingsRouter.delete('/settings', DeleteAccount)

export default UserSettingsRouter;