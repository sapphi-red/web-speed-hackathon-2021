import React from 'react';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';

import { AppPage } from '../../components/application/AppPage';
import { useActiveUser } from '../../hooks/use_active_user';
import { useModalType } from '../../hooks/use_modal_type';
import { fetchActiveUser } from '../../utils/fetchers';
import { ModalContainer } from '../ModalContainer';

/** @type {React.VFC} */
const AppContainer = () => {
  const [_modalType, setModalType] = useModalType();
  const [_activeUser, setActiveUser] = useActiveUser();

  React.useEffect(() => {
    ;(async () => {
      try {
        const user = await fetchActiveUser();
        setActiveUser(user);
      } catch {
        setActiveUser(null)
      }
    })()
  }, []);

  return (
    <>
      <AppPage onOpenModal={setModalType}>
        <Router>
          <AsyncRoute
            path="/"
            getComponent={ () => import('../TimelineContainer').then(module => module.default) }
          />
          <AsyncRoute
            path="/users/:userId"
            getComponent={ () => import('../UserProfileContainer').then(module => module.default) }
          />
          <AsyncRoute
            path="/posts/:postId"
            getComponent={ () => import('../PostContainer').then(module => module.default) }
          />
          <AsyncRoute
            path="/terms"
            getComponent={ () => import('../TermContainer').then(module => module.default) }
          />
          <AsyncRoute
            path="*"
            getComponent={ () => import('../NotFoundContainer').then(module => module.default) }
          />
        </Router>
      </AppPage>

      <ModalContainer />
    </>
  );
};

export { AppContainer };
