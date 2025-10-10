//CORE REACT IMPORTS
import { useContext, useRef, useState } from 'react';

//THIRD PARTY IMPORTS
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Balancer from 'react-wrap-balancer';

//CONTEXTS, UTILS AND WEBHOOKS
import { CurrencyContext } from '../Contexts/CurrencyContext';
import { AuthContext } from '../Contexts/AuthContext';
import { url } from '../Utils/url';

// ASSETS AND STYLES
import '../Styles/Settings.css';
import deleteRecordIcon from '../Public/delete-record.svg';
import crossRecordIcon from '../Public/cross-record.svg';

export default function Settings() {

    const navigate = useNavigate();
    const deleteAccountDialogRef = useRef(null);
    const { userCurrency, setUserCurrency } = useContext(CurrencyContext);
    const {setIsAuthenticated} = useContext(AuthContext);
    const [newCurrency, setNewCurrency] = useState(userCurrency || '');

    async function handleCurrencyChange(formData) {
        const currency = formData.get('currencies');
        try {
            const response = await axios({
                method: 'PUT',
                url: `${url}/user/settings`,
                data: { newCurrency: currency },
                withCredentials: true,
            });

            toast.success('Currency updated!');
            setUserCurrency(currency);
        } catch (error) {
            toast.error('Error updating currency');
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
                url: `${url}/user/settings`,
                withCredentials: true
            });
            toast.success(response.data.message);
            localStorage.removeItem('accessToken')
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
                <h2 className="record-delete-warning-heading"><Balancer>Are you sure you want to delete this Account?</Balancer></h2>
                <p className='record-delete-confirm'>This action cannot be undone.</p>
                <div className="record-delete-btn">
                    <button className='delete-btn' onClick={deleteUserAccount}>Delete</button>
                    <button className='cancel-btn' onClick={closeDeleteAccountModal}>Cancel</button>
                </div>
                <img className='close-modal' src={crossRecordIcon} alt="A cross icon." width={24} onClick={closeDeleteAccountModal} />
            </dialog>
        )
    }

    return (
        <div className="settings-container">
            <DeleteAccountModal />
            <h1 className='settings-header'>User Settings</h1>
            <div className="acc-currency-update-wrapper">
                <form action={handleCurrencyChange} className='acc-currency-form'>
                    <div className="acc-currency-format">
                        <label htmlFor='currencies'><h2>Update currency</h2></label>
                        <select
                            id="currencies"
                            name="currencies"
                            value={userCurrency || 'USD ($)'}
                            onChange={(e) => setUserCurrency(e.target.value)}
                        >
                            <option value="USD ($)">US Dollar</option>
                            <option value="EUR (€)">Euro</option>
                            <option value="GBP (£)">British Pound</option>
                            <option value="JPY (¥)">Japanese Yen</option>
                            <option value="AUD (A$)">Australian Dollar</option>
                            <option value="CAD (C$)">Canadian Dollar</option>
                            <option value="CHF (Fr)">Swiss Franc</option>
                            <option value="CNY (¥)">Chinese Yuan</option>
                            <option value="INR (₹)">Indian Rupee</option>
                            <option value="NZD (NZ$)">New Zealand Dollar</option>
                        </select>
                    </div>
                    <button type='submit' className='update-btn'>Update currency</button>
                </form>
            </div>
            <div className="acc-delete-wrapper">
                <label htmlFor="del-confirm"><h2>Delete My Account</h2></label>
                <button name='del-confirm' id='del-confirm' className='delete-btn' onClick={showDeleteAccountModal}>Delete</button>
            </div>
        </div>
    )

}
