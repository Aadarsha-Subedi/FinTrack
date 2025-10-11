//CORE REACT IMPORTS
import { useEffect, useState, useRef } from 'react';

//THIRD PARTY IMPORTS
import { toast } from 'sonner';
import axios from 'axios';
import validator from 'validator';

// CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url.js';

//COMPONENTS
import Record from '../Components/Record.jsx';
import NoRecordTemplate from '../Components/NoRecordTemplate.jsx';

//STYLES AND ASSETS
import crossRecordIcon from '../Public/cross-record.svg';
import '../Styles/Dashboard.css';

export default function Dashboard() {

    const [userFinances, setUserFinances] = useState([]);
    const [name, setName] = useState();
    const addDialogRef = useRef(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/user`, { withCredentials: true });
                if (response.status === 200) {
                    setUserFinances(response.data.response.rows);
                    setName(response.data.name);
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

    async function addRecord(formData) {
        const category = validator.trim(formData.get('category'));
        const description = validator.trim(formData.get('description'));
        const amount = validator.trim(formData.get('amount'));

        try {
            const response = await axios({
                method: 'POST',
                url: `${url}/user/add`,
                withCredentials: true,
                data: { category, description, amount }
            });
            toast.success(response.data.message);
            closeAddRecordModal();
            const fetchResponse = await axios({
                method: 'GET',
                url: `${url}/user`,
                withCredentials: true
            });

            if (fetchResponse.status === 200) {
                setUserFinances(fetchResponse.data.response.rows);
                toast.success(fetchResponse.data.message);
            } else {
                toast.error(fetchResponse.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    function showModal() {
        addDialogRef.current.showModal();
        document.body.style.overflow = 'hidden';
        addDialogRef.current.addEventListener('close', closeAddRecordModal);
    }

    function closeAddRecordModal() {
        addDialogRef.current.close();
        document.body.style.overflow = 'auto';
    }

    function AddRecordModal() {
        return (
            <dialog ref={addDialogRef} className='add-record-dialog-container'>
                <div className="add-record-wrapper">
                    <h1 className="add-record-heading">Add a new record</h1>
                    <p className='add-record-info'>Please fill the following details.</p>
                    <div className="add-record-form-wrapper">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            addRecord(formData);
                        }} className='add-record-form'>
                            <div className="add-formgroup">
                                <label htmlFor="category">Category</label>
                                <input type="text" id='category' name='category' required />
                            </div>
                            <div className="add-formgroup">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" min={1} step='.01' id='amount' name='amount' required />
                            </div>
                            <div className="add-formgroup">
                                <label htmlFor="description">Description</label>
                                <input type="text" id='description' name='description' required />
                            </div>
                            <div className="add-record-btn">
                                <button type='submit' className="update-btn">Submit</button>
                                <button onClick={closeAddRecordModal} className='cancel-btn'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                <img src={crossRecordIcon} className='close-modal' alt="A cross icon." width={24} onClick={closeAddRecordModal} />
            </dialog>
        )
    }

    const recordElements = userFinances.map(record => {
        return (
            <Record setUserFinances={setUserFinances} key={record.transactionId} transactionId={record.transactionId} category={record.category} description={record.description} amount={record.amount} />
        )
    })

    return (
        <>
            <AddRecordModal />
            <p className='welcome-text'>Welcome, {name}!</p>
            <div className="dashboard-container">
                <div className="dashboard-add-record-wrapper">
                    <button className='dashboard-btn-add' onClick={showModal}>Add a new financial record</button>
                </div>
                <div className="dashboard-records-wrapper">
                    {userFinances.length ? recordElements : <NoRecordTemplate />}
                </div>
            </div>
        </>

    )

}