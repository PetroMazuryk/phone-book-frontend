import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../redux/modal/modalSlice';
import { deleteContact } from '../../redux/contacts/operations';
import { Modal } from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';

export const ModalManager = () => {
  const dispatch = useAppDispatch();
  const { openModal, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  if (!openModal) return null;

  const handleClose = () => dispatch(closeModal());

  return (
    <>
      {openModal === 'edit' && (
        <Modal
          isOpen
          onClose={handleClose}
          actions={
            <CustomButton
              onClick={() => console.log('edit', modalProps?.id)}
              variant="success"
            >
              OK
            </CustomButton>
          }
        >
          <h2>Edit contact ?</h2>
          <p>id: {modalProps?.id}</p>
        </Modal>
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
          <h2>Delete contact</h2>
          <h3>Are you sure you want to delete the contact?</h3>
          <p>
            <strong>Name:</strong> {modalProps?.name}
          </p>
          <p>
            <strong>Phone:</strong> {modalProps?.phone}
          </p>
        </Modal>
      )}
    </>
  );
};
