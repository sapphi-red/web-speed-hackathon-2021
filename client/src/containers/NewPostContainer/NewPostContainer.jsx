import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { NewPostModalPage } from '../../components/new_post_modal/NewPostModalPage';
import { useModalType } from '../../hooks/use_modal_type';
import { sendNewPost } from '../../utils/fetchers';

/** @type {React.VFC} */
const NewPostContainer = () => {
  const history = useHistory();
  const [_modalType, setModalType] = useModalType();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetError = useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = useCallback(
    (params) => {
      (async () => {
        setIsLoading(true);
        const post = await sendNewPost(params);
        setModalType('none');
        history.push(`/posts/${post.id}`);
      })().catch((err) => {
        setHasError(true);
        setIsLoading(false);
        throw err;
      });
    },
    [history, location],
  );

  return (
    <NewPostModalPage
      hasError={hasError}
      isLoading={isLoading}
      onResetError={handleResetError}
      onSubmit={handleSubmit}
    />
  );
};

export { NewPostContainer };
