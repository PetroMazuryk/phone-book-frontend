import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../redux/modal/modalSlice';
import { deleteContact } from '../../redux/contacts/operations';
import { Modal } from '../Modal/Modal';
import { EditContactModal } from '../EditContactModal/EditContactModal';
import CustomButton from '../CustomButton/CustomButton';

import styles from './Modalaneger.module.css';

export const ModalManager = () => {
  const dispatch = useAppDispatch();
  const { openModal, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  if (!openModal) return null;

  const handleClose = () => dispatch(closeModal());

  return (
    <>
      {openModal === 'edit' && modalProps?.id && (
        <EditContactModal contactId={modalProps.id} handleClose={handleClose} />
      )}

      {openModal === 'confirmDelete' && (
        <Modal
          isOpen
          onClose={handleClose}
          actions={
            <CustomButton
              onClick={() => {
                dispatch(deleteContact(modalProps.id));
                handleClose();
              }}
              variant="success"
            >
              OK
            </CustomButton>
          }
        >
          <h2 className={styles.modalTitle}>Delete contact</h2>
          <h3 className={styles.modalSubtitle}>
            Are you sure you want to delete the contact?
          </h3>
          <p className={styles.modalText}>
            <strong>Name:</strong> {modalProps?.name}
          </p>
          <p className={styles.modalText}>
            <strong>Phone:</strong> {modalProps?.phone}
          </p>
        </Modal>
      )}
    </>
  );
};
