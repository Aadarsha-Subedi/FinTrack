//ASSETS AND STYLES
import addRecordIcon from '../Public/add-record.svg';
import '../Styles/NoRecordTemplate.css';

export default function NoRecordTemplate () {

    return (
        <div className="template-container">
            <img src={addRecordIcon} alt="A add folder icon." width={196} />
            <p>You have no records! Start by adding new records.</p>
        </div>
    )

}