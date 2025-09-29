import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addContact } from '../../redux/contacts/operations';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';

type AddContactModalProps = {
  handleClose: () => void;
};

export const AddContactModal: React.FC<AddContactModalProps> = ({
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddSubmit = () => {
    if (!name.trim() || !phone.trim()) return;

    dispatch(
      addContact({
        name,
        phone,
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
          <CustomButton onClick={handleAddSubmit} variant="success">
            Add
          </CustomButton>
        </>
      }
    >
      <div className={styles.modalContainer}>
        <h2>Add New Contact</h2>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};
