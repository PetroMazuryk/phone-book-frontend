import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { editContact } from '../../redux/contacts/operations';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';

type EditContactModalProps = {
  modalProps: {
    id: string;
    name: string;
    phone: string;
  } | null;
  handleClose: () => void;
};

export const EditContactModal: React.FC<EditContactModalProps> = ({
  modalProps,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  useEffect(() => {
    if (modalProps) {
      setEditedName(modalProps.name || '');
      setEditedPhone(modalProps.phone || '');
    }
  }, [modalProps]);

  const handleEditSubmit = () => {
    if (!modalProps?.id) return;

    dispatch(
      editContact({
        id: modalProps.id,
        data: {
          name: editedName,
          phone: editedPhone,
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
      <h2>Edit contact</h2>
      <div className="formGroup">
        <label>
          Name:
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </label>
      </div>
      <div className="formGroup">
        <label>
          Phone:
          <input
            type="text"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
        </label>
      </div>
    </Modal>
  );
};
