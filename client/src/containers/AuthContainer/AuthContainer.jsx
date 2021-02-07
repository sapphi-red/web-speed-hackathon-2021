import { useState, useCallback } from 'react';

import { AuthModalPage } from '../../components/auth_modal/AuthModalPage';
import { useActiveUser } from '../../hooks/use_active_user';
import { useModalType } from '../../hooks/use_modal_type';
import { sendRegister, sendSignin } from '../../utils/fetchers';

/** @type {React.VFC} */
const AuthContainer = () => {
  const [_modalType, setModalType] = useModalType();
  const [_activeUser, setActiveUser] = useActiveUser();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetError = useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = useCallback(({ type, ...params }) => {
    (async () => {
      setIsLoading(true);
      if (type === 'signin') {
        const user = await sendSignin(params);
        setActiveUser(user);
      } else if (type === 'signup') {
        const user = await sendRegister(params);
        setActiveUser(user);
      }
      setModalType('none');
    })().catch((err) => {
      setHasError(true);
      setIsLoading(false);
      throw err;
    });
  }, []);

  return (
    <AuthModalPage hasError={hasError} isLoading={isLoading} onResetError={handleResetError} onSubmit={handleSubmit} />
  );
};

export { AuthContainer };
