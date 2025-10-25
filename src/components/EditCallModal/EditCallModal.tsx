import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editCall, fetchContactById } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';
import styles from '../EditContactModal/EditContactModal.module.css';

type EditCallModalProps = {
  contactId: string;
  callId: string;
  handleClose: () => void;
  triggerRefresh: () => void;
};

export const EditCallModal: React.FC<EditCallModalProps> = ({
  contactId,
  callId,
  handleClose,
  triggerRefresh,
}) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);

  const contact = contacts.find((c) => c.id === contactId);
  const existingCall = contact?.calls?.find((c) => c.id === callId);

  const [date, setDate] = useState('');
  const [direction, setDirection] = useState<'in' | 'out'>('in');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (existingCall) {
      setDate(existingCall.date || '');
      setDirection((existingCall.direction as 'in' | 'out') || 'in');
      setTime(existingCall.time || '');
      setDuration(existingCall.duration || '');
      setDescription(existingCall.description || '');
    } else {
      dispatch(fetchContactById(contactId));
    }
  }, [existingCall, contactId, dispatch]);

  const handleEditSubmit = async () => {
    if (!contactId || !callId) return;

    const updatedFields = { date, direction, time, duration, description };

    try {
      await dispatch(editCall({ contactId, callId, updatedFields })).unwrap();
      await dispatch(fetchContactById(contactId));
      triggerRefresh();
      handleClose();
    } catch (error) {
      console.error('Failed to edit call', error);
    }
  };

  return (
    <Modal
      isOpen
      onClose={handleClose}
      actions={
        <CustomButton onClick={handleEditSubmit} variant="success">
          Save
        </CustomButton>
      }
    >
      <div className={styles.modalContainer}>
        <h2>Edit Call</h2>

        <div className={styles.formGroup}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Direction:</label>
          <select
            value={direction}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setDirection(e.target.value as 'in' | 'out')
            }
          >
            <option value="in">Incoming</option>
            <option value="out">Outgoing</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Duration:</label>
          <input
            type="time"
            step="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </Modal>
  );
};
