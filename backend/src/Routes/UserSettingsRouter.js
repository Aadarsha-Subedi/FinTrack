//THIRD PARTY IMPORTS
import express from 'express';

//CONTROLLERS
import UpdateCurrecnyController from '../Controllers/UpdateCurrencyController.js';
import GetCurrencyController from '../Controllers/GetCurrencyController.js';
import DeleteAccountController from '../Controllers/DeleteAccountController.js';
import ChangeNameController from '../Controllers/ChangeNameController.js';
import updatePasswordController from '../Controllers/UpdatePasswordController.js';

const UserSettingsRouter = express.Router();
UserSettingsRouter.put('/settings/change-currency', UpdateCurrecnyController);
UserSettingsRouter.put('/settings/change-name', ChangeNameController)
UserSettingsRouter.get('/settings', GetCurrencyController);
UserSettingsRouter.delete('/settings/delete-account', DeleteAccountController);
UserSettingsRouter.put('/settings/update-password', updatePasswordController);

export default UserSettingsRouter;