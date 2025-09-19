import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeModal } from '../../redux/modal/modalSlice';
import { Modal } from '../Modal/Modal';

export const ModalManager = () => {
  const dispatch = useDispatch();
  const { openModal, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  if (!openModal) return null;

  const handleClose = () => dispatch(closeModal());

  return (
    <>
      {openModal === 'edit' && (
        <Modal isOpen onClose={handleClose}>
          <h2>Edit contact ?</h2>
          <p>id: {modalProps?.id}</p>
          <button onClick={() => console.log('edit', modalProps?.id)}>
            OK
          </button>
        </Modal>
      )}
    </>
  );
};
