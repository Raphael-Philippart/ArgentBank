import React, {useState} from 'react';
import EditForm from './EditForm';
import styles from './EditButton.module.scss';

const EditButton: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return <div className={styles.editButtonContainer}>
    {isEditing ?
      <EditForm onCancel={handleCancelClick}/>
      :
      <button onClick={handleEditClick} className={styles.editButton}>Edit Name</button>}
  </div>
};

export default EditButton;
