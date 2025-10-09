import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { editContact } from '../../redux/contacts/operations';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';
import icon from '../../assets/sprite.svg';

import styles from './EditContactModal.module.css';
import cardStyles from '../ContactCard/ContactCard.module.css';

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
  const [favorite, setFavorite] = useState(contact?.favorite || false);
  const [priority, setPriority] = useState(contact?.priority || false);

  if (!contact) return null;

  const handleEditSubmit = () => {
    dispatch(
      editContact({
        id: contact.id,
        data: {
          name: editedName,
          phone: editedPhone,
          favorite,
          priority,
        },
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

        <div
          className={styles.formGroup}
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <button
            role="checkbox"
            aria-checked={favorite}
            onClick={() => setFavorite(!favorite)}
            type="button"
            aria-label="Toggle favorite"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg
              className={`${cardStyles.like} ${
                favorite ? cardStyles.likeActive : ''
              }`}
            >
              <use href={`${icon}#icon-heart`} />
            </svg>
            Favorite
          </button>

          <button
            role="checkbox"
            aria-checked={priority}
            onClick={() => setPriority(!priority)}
            type="button"
            aria-label="Toggle priority"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg
              className={`${cardStyles.checkbox} ${
                priority ? cardStyles.checked : ''
              }`}
            >
              <use href={`${icon}#icon-checkbox`} />
            </svg>
            Priority
          </button>
        </div>
      </div>
    </Modal>
  );
};
