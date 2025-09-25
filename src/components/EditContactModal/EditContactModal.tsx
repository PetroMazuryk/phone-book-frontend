import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { editContact } from '../../redux/contacts/operations';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';

import styles from './EditContactModal.module.css';

type EditContactModalProps = {
  contactId: string;
  handleClose: () => void;
};

export const EditContactModal: React.FC<EditContactModalProps> = ({
  contactId,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const contact = useSelector((state: RootState) =>
    state.contacts.items.find((c) => c.id === contactId)
  );

  const [editedName, setEditedName] = useState(contact?.name || '');
  const [editedPhone, setEditedPhone] = useState(contact?.phone || '');

  if (!contact) return null;

  const handleEditSubmit = () => {
    dispatch(
      editContact({
        id: contact.id,
        data: { name: editedName, phone: editedPhone },
      })
    );
    handleClose();
  };

  return (
    <Modal
      isOpen
      onClose={handleClose}
      actions={
        <>
          <CustomButton onClick={handleEditSubmit} variant="success">
            OK
          </CustomButton>
        </>
      }
    >
      <div className={styles.modalContainer}>
        <h2>Edit Contact</h2>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input
            type="text"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};
