import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';
import styles from '../EditContactModal/EditContactModal.module.css';

type AddCallModalProps = {
  contactId?: string;
  handleClose: () => void;
};

export const AddCallModal: React.FC<AddCallModalProps> = ({
  contactId,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState('');
  const [direction, setDirection] = useState<'in' | 'out'>('in');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleAddSubmit = () => {
    if (!date || !time || !duration) return;

    const newCall = {
      contactId,
      date,
      direction,
      time,
      duration,
      description,
    };

    // dispatch(addCall(newCall));
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
        <h2>Add Call</h2>

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
            onChange={(e) => setDirection(e.target.value as 'in' | 'out')}
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
          <label>Duration (min):</label>
          <input
            type="number"
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
