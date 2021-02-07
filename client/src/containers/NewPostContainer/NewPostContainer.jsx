import React from 'react';
import { route } from 'preact-router';

import { NewPostModalPage } from '../../components/new_post_modal/NewPostModalPage';
import { useModalType } from '../../hooks/use_modal_type';
import { sendNewPost } from '../../utils/fetchers';

/** @type {React.VFC} */
const NewPostContainer = () => {
  const [_modalType, setModalType] = useModalType();

  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResetError = React.useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = React.useCallback(
    (params) => {
      (async () => {
        setIsLoading(true);
        const post = await sendNewPost(params);
        setModalType('none');
        route(`/posts/${post.id}`);
      })().catch((err) => {
        setHasError(true);
        setIsLoading(false);
        throw err;
      });
    },
    [location],
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
