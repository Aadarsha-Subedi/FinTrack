//CORE REACT IMPORTS
import { useContext, useRef, useState } from 'react';

//THIRD PARTY IMPORTS
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Balancer from 'react-wrap-balancer';
import validator from 'validator';

//CONTEXTS, UTILS AND WEBHOOKS
import { CurrencyContext } from '../Contexts/CurrencyContext.js';
import { NameContext } from '../Contexts/NameContext.js';
import { AuthContext } from '../Contexts/AuthContext.jsx';
import { url } from '../Utils/url';

// ASSETS AND STYLES
import '../Styles/Settings.css';
import deleteRecordIcon from '../Public/delete-record.svg';
import crossRecordIcon from '../Public/cross-record.svg';
import passwordShowIcon from '../Public/password-show.svg';
import passwordHideIcon from '../Public/password-hide.svg';

export default function Settings() {

    const navigate = useNavigate();
    const deleteAccountDialogRef = useRef(null);
    const { userCurrency, setUserCurrency } = useContext(CurrencyContext);
    const { name, setName } = useContext(NameContext);
    const { setIsAuthenticated } = useContext(AuthContext);
    const [currentPasswordState, setCurrentPasswordState] = useState('password');
    const [newPasswordState, setNewPasswordState] = useState('password');
    const [confirmNewPasswordState, setConfirmNewPasswordState] = useState('password');

    async function handleCurrencyChange(formData) {
        const currency = validator.trim(formData.get('currencies'));
        try {
            const response = await axios({
                method: 'PUT',
                url: `${url}/user/settings/change-currency`,
                data: { newCurrency: currency },
                withCredentials: true,
            });
            toast.success('Currency updated!');
            setUserCurrency(currency);
        } catch (error) {
            toast.error('Error updating currency');
        }
    }

    async function changeUserPassword(formData) {
        const currentPassword = formData.get('current-password');
        const newPassword = formData.get('new-password');
        const confirmNewPassword = formData.get('confirm-new-password');
        try {
            const response = await axios({
                method: 'PUT',
                url: `${url}/user/settings/update-password`,
                withCredentials: true,
                data: { currentPassword, newPassword, confirmNewPassword }
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function updateName(formData) {
        const newName = formData.get('change-name-confirm');
        try {
            const response = await axios({
                method: 'PUT',
                url: `${url}/user/settings/change-name`,
                withCredentials: true,
                data: { newName }
            });
            toast.success(response.data.message);
            setName(newName);
        } catch (error) {
            toast.error(error.message);
        }
    }

    function closeDeleteAccountModal() {
        if (deleteAccountDialogRef.current) {
            deleteAccountDialogRef.current.close();
        }
        document.body.style.overflow = '';
    }

    function showDeleteAccountModal() {
        deleteAccountDialogRef.current.showModal();
        document.body.style.overflow = 'hidden';
        deleteAccountDialogRef.current.addEventListener('close', closeDeleteAccountModal);
    }

    async function deleteUserAccount() {
        if (deleteAccountDialogRef.current) deleteAccountDialogRef.current.close(); // close firsts
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${url}/user/settings/delete-account`,
                withCredentials: true
            });
            toast.success(response.data.message);
            setIsAuthenticated(false);
            closeDeleteAccountModal();
            navigate(`/login`, { replace: true })
        } catch (error) {
            toast.error(error.message);
        }
    }

    function DeleteAccountModal() {
        return (
            <dialog ref={deleteAccountDialogRef} className='record-delete-dialog-wrapper'>
                <div className="record-delete-icon-wrapper">
                    <img src={deleteRecordIcon} alt="A red delete icon." width={48} />
                </div>
                <h1 className="record-delete-warning-heading"><Balancer>Are you sure you want to delete this account?</Balancer></h1>
                <p className='record-delete-confirm'>This action cannot be undone.</p>
                <div className="record-delete-btn">
                    <button className='delete-btn' onClick={deleteUserAccount}>Delete</button>
                    <button className='cancel-btn' onClick={closeDeleteAccountModal}>Cancel</button>
                </div>
                <img className='close-modal' src={crossRecordIcon} alt="A cross icon." width={24} onClick={closeDeleteAccountModal} />
            </dialog>
        )
    }

    function updatePasswordState(setPassword) {
        setPassword(prevPasswordInputState => {
            if (prevPasswordInputState === 'password') {
                setPassword('text');
            }
            else {
                setPassword('password');
            }
        })
    }

    return (
        <div className="settings-container">
            <DeleteAccountModal />
            <h1 className='settings-header'>User Settings</h1>
            <div className="acc-currency-update-wrapper">
                <form action={handleCurrencyChange} className='acc-currency-form'>
                    <div className="acc-currency-format">
                        <label htmlFor='currencies'><h3>Update Currency</h3></label>
                        <select
                            id="currencies"
                            name="currencies"
                            value={userCurrency || 'USD ($)'}
                            onChange={(e) => setUserCurrency(e.target.value)}
                        >
                            <option value="USD ($)">US Dollar ($)</option>
                            <option value="EUR (€)">Euro (€)</option>
                            <option value="GBP (£)">British Pound (£)</option>
                            <option value="JPY (¥)">Japanese Yen (¥)</option>
                            <option value="AUD (A$)">Australian Dollar (A$)</option>
                            <option value="CAD (C$)">Canadian Dollar (C$)</option>
                            <option value="CHF (Fr)">Swiss Franc (Fr)</option>
                            <option value="CNY (¥)">Chinese Yuan (¥)</option>
                            <option value="INR (₹)">Indian Rupee (₹)</option>
                            <option value="NZD (NZ$)">New Zealand Dollar (NZ$)</option>
                        </select>
                    </div>
                    <button type='submit' className='settings-update-currency-btn'>Update currency</button>
                </form>
            </div>
            <div className="settings-change-name-wrapper">
                <form action={updateName}>
                    <div className="change-name-formgroup">
                        <div className="change-name-input">
                            <label htmlFor="change-name-confirm"><h3>Change my name</h3></label>
                            <input defaultValue={name} type="text" id='change-name-confirm' name='change-name-confirm' />
                        </div>
                        <button className='settings-change-name-btn' type='submit'>Change name</button>
                    </div>
                </form>
            </div>

            <div className="settings-change-password-wrapper">
                <h2 className='change-pw-warning'>Update Password</h2>
                <form action={changeUserPassword}>
                    <input
                        type="email"
                        name="username"
                        autoComplete="username"
                        style={{ display: 'none' }}
                        tabIndex="-1"
                        aria-hidden="true"
                    />
                    <div className="login-formgroup">
                        <label htmlFor='current-password' className='change-pw'>Enter your current password</label>
                        <div className="password-wrapper">
                            <input autoComplete='current-password' placeholder='******' type={currentPasswordState} id='current-password' name='current-password' required />
                            <img onClick={() => updatePasswordState(setCurrentPasswordState)} className='password-icon' src={(currentPasswordState === 'password') ? passwordShowIcon : passwordHideIcon} alt="A password show icon." width={32} />
                        </div>
                    </div>
                    <div className="login-formgroup">
                        <label htmlFor='new-password' className='change-pw'>Enter your new password</label>
                        <div className="password-wrapper">
                            <input autoComplete='new-password' placeholder='******' type={newPasswordState} id='new-password' name='new-password' required />
                            <img onClick={() => updatePasswordState(setNewPasswordState)} className='password-icon' src={(newPasswordState === 'password') ? passwordShowIcon : passwordHideIcon} alt="A password show icon." width={32} />
                        </div>
                    </div>
                    <div className="login-formgroup">
                        <label htmlFor='confirm-new-password' className='change-pw'>Re-enter your new password</label>
                        <div className="password-wrapper">
                            <input autoComplete='new-password' placeholder='******' type={confirmNewPasswordState} id='confirm-new-password' name='confirm-new-password' required />
                            <img onClick={() => updatePasswordState(setConfirmNewPasswordState)} className='password-icon' src={(confirmNewPasswordState === 'password') ? passwordShowIcon : passwordHideIcon} alt="A password show icon." width={32} />
                        </div>
                    </div>
                    <button type='submit' className='btn-pw-change'>Change my password</button>
                </form>
            </div>

            <div className="acc-delete-wrapper">
                <label htmlFor="del-confirm"><h2 className='h2-acc-del'>Delete My Account</h2></label>
                <button name='del-confirm' id='del-confirm' className='settings-delete-btn' onClick={showDeleteAccountModal}>Delete</button>
            </div>
        </div>
    )

}
