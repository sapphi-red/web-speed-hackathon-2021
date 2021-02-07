import { createContext } from 'react';

import { ModalTypeContext } from '../contexts/modal_type_context';

/**
 * @returns {[string, (type: string) => void]}
 */
function useModalType() {
  const [modalType, setModalType] = useContext(ModalTypeContext);
  return [modalType, setModalType];
}

export { useModalType };
