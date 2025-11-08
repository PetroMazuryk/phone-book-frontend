import { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addContact } from '../../redux/contacts/operations';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';
import icon from '../../assets/sprite.svg';

import styles from '../EditContactModal/EditContactModal.module.css';
import cardStyles from '../ContactCard/ContactCard.module.css';

type AddContactModalProps = {
  handleClose: () => void;
};

export const AddContactModal: React.FC<AddContactModalProps> = ({
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [priority, setPriority] = useState(false);

  const handleAddSubmit = () => {
    if (!name.trim() || !phone.trim()) return;

    dispatch(
      addContact({
        name,
        phone,
        favorite,
        priority,
      })
    );
    handleClose();
  };

  return (
    <Modal
      isOpen
      onClose={handleClose}
      actions={
        <CustomButton onClick={handleAddSubmit} variant="success">
          Add
        </CustomButton>
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

        <div
          className={styles.formGroup}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '8px',
          }}
        >
          <button
            onClick={() => setFavorite(!favorite)}
            type="button"
            aria-label="Toggle favorite"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg
              className={`${cardStyles.like} ${
                favorite ? cardStyles.likeActive : ''
              }`}
            >
              <use href={`${icon}#icon-heart`} />
            </svg>
            <span>Favorite</span>
          </button>

          <button
            onClick={() => setPriority(!priority)}
            type="button"
            aria-label="Toggle priority"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg
              className={`${cardStyles.checkbox} ${
                priority ? cardStyles.checked : ''
              }`}
            >
              <use href={`${icon}#icon-checkbox`} />
            </svg>
            <span>Priority</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
