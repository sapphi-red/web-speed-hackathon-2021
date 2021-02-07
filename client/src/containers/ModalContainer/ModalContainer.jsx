import { lazy, useCallback, Suspense } from 'react';

import { Modal } from '../../components/modal/Modal';
import { useModalType } from '../../hooks/use_modal_type';

const AuthContainer = lazy(() => import('../AuthContainer'));
const NewPostContainer = lazy(() => import('../NewPostContainer'));

/** @type {React.VFC} */
const ModalContainer = () => {
  const [modalType, setModalType] = useModalType();
  const onCloseModal = useCallback(() => {
    setModalType('none');
  }, []);

  return modalType !== 'none' ? (
    <Modal onClose={onCloseModal}>
      <Suspense fallback={<p>Loading...</p>}>
        {modalType === 'auth' ? <AuthContainer /> : null}
        {modalType === 'post' ? <NewPostContainer /> : null}
      </Suspense>
    </Modal>
  ) : null;
};

export { ModalContainer };
