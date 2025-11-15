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
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const mobileRegex = /^(\+?38)?0\d{9}$/;
  const landlineRegex = /^0\d{6,9}$/;

  const normalizePhone = (value: string) => value.replace(/[\s\-()]/g, '');

  const validatePhone = (value: string) => {
    const cleaned = normalizePhone(value);
    return mobileRegex.test(cleaned) || landlineRegex.test(cleaned);
  };

  const handleAddSubmit = () => {
    setNameError(null);
    setPhoneError(null);

    if (!name.trim()) {
      setNameError('Please enter the name');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Invalid phone number format');
      return;
    }

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
            placeholder="Petro"
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <p style={{ color: 'red', marginTop: '4px', fontSize: '14px' }}>
              {nameError}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            autoComplete="new-search-phone"
            placeholder="+38 0XX XXX XXXX"
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && (
            <p style={{ color: 'red', marginTop: '4px', fontSize: '14px' }}>
              {phoneError}
            </p>
          )}
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
