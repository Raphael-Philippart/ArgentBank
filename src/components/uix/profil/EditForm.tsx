import React, {useState} from 'react';
import styles from './EditForm.module.scss';
import {useAppDispatch} from "../../../store/hooks";
import {fetchUserProfile, updateUserProfile} from "../../../store/actions/authActions";
import {useSelector} from "react-redux";
import {selectUserProfile} from "../../../store/selectors/authSelectors";

interface EditFormProps {
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({onCancel}) => {
  const dispatch = useAppDispatch();
  const userProfile = useSelector(selectUserProfile);
  const [firstNameValue, setFirstNameValue] = useState(userProfile?.firstName ?? '');
  const [lastNameValue, setLastNameValue] = useState<string>(userProfile?.lastName ?? '');

  const handleSaveClick = () => {
    if (userProfile?.firstName !== firstNameValue || userProfile?.lastName !== lastNameValue) {
      dispatch(updateUserProfile({firstName: firstNameValue, lastName: lastNameValue}));
      setTimeout(() => {
        dispatch(fetchUserProfile());
      }, 250)
    }
    onCancel();
  };

  return <div className={styles.editFormContainer}>
    <input
      type="text"
      value={firstNameValue}
      onChange={(e) => setFirstNameValue(e.target.value)}
      placeholder="First Name"
      className={styles.editFormInput}
    />
    <input
      type="text"
      value={lastNameValue}
      onChange={(e) => setLastNameValue(e.target.value)}
      placeholder="Last Name"
      className={styles.editFormInput}
    />
    <button onClick={handleSaveClick} className={`${styles.saveButton} ${styles.fullWidth}`}>
      Save
    </button>
    <button onClick={onCancel} className={`${styles.cancelButton} ${styles.fullWidth}`}>
      Cancel
    </button>
  </div>
};

export default EditForm;
