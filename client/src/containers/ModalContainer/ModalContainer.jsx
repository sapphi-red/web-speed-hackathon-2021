import React from 'react';

import { Modal } from '../../components/modal/Modal';
import { useModalType } from '../../hooks/use_modal_type';

const AuthContainer = React.lazy(() => import('../AuthContainer'));
const NewPostContainer = React.lazy(() => import('../NewPostContainer'));

/** @type {React.VFC} */
const ModalContainer = () => {
  const [modalType, setModalType] = useModalType();
  const onCloseModal = React.useCallback(() => {
    setModalType('none');
  }, []);

  return modalType !== 'none' ? (
    <Modal onClose={onCloseModal}>
      {modalType === 'auth' ? <AuthContainer /> : null}
      {modalType === 'post' ? <NewPostContainer /> : null}
    </Modal>
  ) : null;
};

export { ModalContainer };
