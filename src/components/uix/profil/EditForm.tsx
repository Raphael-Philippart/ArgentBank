import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../store/hooks";
import {fetchUserProfile, updateUserProfile} from "../../../store/actions/authActions";
import {selectUserProfile} from "../../../store/selectors/authSelectors";
import {userProfileSchema} from "../../../schemas/authSchemas";
import styles from './EditForm.module.scss';
import DOMPurify from 'dompurify';

interface EditFormProps {
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({onCancel}) => {
  const dispatch = useAppDispatch();
  const userProfile = useSelector(selectUserProfile);
  const [firstNameValue, setFirstNameValue] = useState(userProfile?.firstName ?? '');
  const [lastNameValue, setLastNameValue] = useState<string>(userProfile?.lastName ?? '');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    validateForm({firstName: firstNameValue, lastName: lastNameValue});
  }, [firstNameValue, lastNameValue]);

  const validateForm = (data: { firstName: string; lastName: string }) => {
    const validation = userProfileSchema.safeParse(data);
    if (!validation.success) {
      setErrors(validation.error.errors.map(err => err.message));
    } else {
      setErrors([]);
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = DOMPurify.sanitize(e.target.value);
    setFirstNameValue(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = DOMPurify.sanitize(e.target.value);
    setLastNameValue(value);
  };

  const handleSaveClick = () => {
    if (userProfile?.firstName !== firstNameValue || userProfile?.lastName !== lastNameValue) {
      dispatch(updateUserProfile({firstName: firstNameValue, lastName: lastNameValue}));
      setTimeout(() => {
        dispatch(fetchUserProfile());
      }, 250);
    }
    onCancel();
  };

  return <div>
    <div>
      {errors.length > 0 && (
        <div className={styles.error}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
    <div className={styles.editFormContainer}>
      <input
        type="text"
        value={firstNameValue}
        onChange={handleFirstNameChange}
        placeholder="First Name"
        className={styles.editFormInput}
      />
      <input
        type="text"
        value={lastNameValue}
        onChange={handleLastNameChange}
        placeholder="Last Name"
        className={styles.editFormInput}
      />
      <button
        type='submit'
        onClick={handleSaveClick}
        className={`${styles.saveButton} ${errors.length > 0 ? styles.disabled : ''}`}
        disabled={errors.length > 0}
      >
        Save
      </button>
      <button onClick={onCancel} className={`${styles.cancelButton} ${styles.fullWidth}`}>
        Cancel
      </button>
    </div>
  </div>
};

export default EditForm;
