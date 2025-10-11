//CORE REACT IMPORTS
import { useRef, useState, useEffect, useContext } from 'react';

//THIRD PARTY IMPORTS
import axios from 'axios';
import { toast } from 'sonner';
import Balancer from 'react-wrap-balancer';

//CONTEXTS, UTILS AND WEBHOOKS
import { CurrencyContext } from '../Contexts/CurrencyContext.js';
import { url } from '../Utils/url';


//ASSETS AND STYLES
import deleteIcon from '../Public/cross.svg';
import updateIcon from '../Public/update.svg';
import deleteRecordIcon from '../Public/delete-record.svg';
import crossRecordIcon from '../Public/cross-record.svg';
import '../Styles/Record.css';

export default function Record({ transactionId, category, description, amount, setUserFinances }) {

    const deleteDialogRef = useRef(null);
    const updateDialogRef = useRef(null);
    const [modalType, setModalType] = useState();
    const [activeRecord, setActiveRecord] = useState();
    const userCurrency = useContext(CurrencyContext).userCurrency;
    const formattedCurrency = userCurrency ? userCurrency.slice(userCurrency.indexOf('(') + 1, userCurrency.indexOf(')')) : '$';

    function closeDeleteRecordModal() {
        deleteDialogRef.current.close();
        setActiveRecord(undefined);
        setModalType(undefined);
        document.body.style.overflow = '';
    }

    function closeUpdateRecordModal() {
        updateDialogRef.current.close();
        setActiveRecord(undefined);
        setModalType(undefined);
        document.body.style.overflow = '';
    }

    useEffect(() => {
        if (!activeRecord) {
            return;
        }
        if (modalType === 'delete' && deleteDialogRef.current) {
            deleteDialogRef.current.showModal();
            document.body.style.overflow = 'hidden';
            deleteDialogRef.current.addEventListener('close', closeDeleteRecordModal);
            return () => {
                deleteDialogRef.current.removeEventListener('close', closeDeleteRecordModal);
            }
        }
        else if (modalType === 'update' && updateDialogRef.current) {
            updateDialogRef.current.showModal();
            document.body.style.overflow = 'hidden';
            updateDialogRef.current.addEventListener('close', closeUpdateRecordModal);
            return () => {
                updateDialogRef.current.removeEventListener('close', closeUpdateRecordModal);
            }
        }
    }, [activeRecord, modalType]);



    async function updateRecord(formData) {

        const category = formData.get('category');
        const description = formData.get('description');
        const amount = formData.get('amount');

        try {
            const response = await axios({
                method: 'PUT',
                url: `${url}/user/update/${activeRecord}`,
                withCredentials: true,
                data: { category, amount, description },
            })
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        }
        try {
            const response = await axios({
                method: 'GET',
                url: `${url}/user`,
                withCredentials: true
            })
            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            }
            toast.success(response.data.message);
            setUserFinances(response.data.response.rows);
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            closeUpdateRecordModal();
        }
    }

    async function deleteRecord() {
        if (deleteDialogRef.current) deleteDialogRef.current.close(); // close firsts
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${url}/user/delete/${activeRecord}`,
                withCredentials: true
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        }
        try {
            const response = await axios({
                method: 'GET',
                url: `${url}/user`,
                withCredentials: true
            })
            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            }
            toast.success(response.data.message);
            setUserFinances(response.data.response.rows);
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            closeDeleteRecordModal();
        }
    }



    function DeleteRecordModal() {
        return (
            <dialog ref={deleteDialogRef} className='record-delete-dialog-wrapper'>
                <div className="record-delete-icon-wrapper">
                    <img src={deleteRecordIcon} alt="A red delete icon." width={48} />
                </div>
                <h2 className="record-delete-warning-heading"><Balancer>Are you sure you want to delete this record?</Balancer></h2>
                <p className='record-delete-confirm'>This action cannot be undone.</p>
                <div className="record-delete-btn">
                    <button className='delete-btn' onClick={deleteRecord}>Delete</button>
                    <button className='cancel-btn' onClick={closeDeleteRecordModal}>Cancel</button>
                </div>
                <img className='close-modal' src={crossRecordIcon} alt="A cross icon." width={24} onClick={closeDeleteRecordModal} />
            </dialog>
        )
    }

    function UpdateRecordModal() {
        return (
            <dialog ref={updateDialogRef} className='record-update-dialog-wrapper'>
                <div className="record-update-icon-wrapper">
                    <img src={updateIcon} alt="A red delete icon." width={32} />
                </div>
                <div className="update-record-form-wrapper">
                    <form action={updateRecord} className='update-record-form'>
                        <div className="update-formgroup">
                            <label htmlFor="category">Category</label>
                            <input type="text" id='category' name='category' defaultValue={category} required />
                        </div>
                        <div className="update-formgroup">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" min={1} id='amount' name='amount' defaultValue={amount} required />
                        </div>
                        <div className="update-formgroup">
                            <label htmlFor="description">Description</label>
                            <input type="text" id='description' name='description' defaultValue={description} required />
                        </div>
                        <div className="record-update-btn">
                            <button onClick={updateRecord} type='submit' className="update-btn">Update</button>
                            <button onClick={closeUpdateRecordModal} className='cancel-btn'>Cancel</button>
                        </div>
                    </form>
                </div>

                <img className='close-modal' src={crossRecordIcon} alt="A cross icon." width={24} onClick={closeUpdateRecordModal} />
            </dialog>
        )
    }

    return (
        <>
            <DeleteRecordModal />
            <UpdateRecordModal />
            <div className="record-container">
                <div className="record-heading">
                    <h2 className='record-category'>{category}</h2>
                    <div className="record-icons">
                        <img
                            onClick={() => {
                                setActiveRecord(transactionId);
                                setModalType('update');
                            }}
                            src={updateIcon}
                            alt="A cross icon."
                            width={36} />
                        <img
                            onClick={() => {
                                setActiveRecord(transactionId);
                                setModalType('delete');
                            }}
                            src={deleteRecordIcon}
                            alt="A cross icon."
                            width={36} />
                    </div>
                </div>
                <p className='record-description'>{description}</p>
                <p className='record-amount'>{formattedCurrency} {Number(amount).toFixed(2)}</p>
            </div>
        </>

    )

}