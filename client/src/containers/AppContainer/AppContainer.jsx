import React from 'react';
import { Switch, Route } from 'wouter';

import { AppPage } from '../../components/application/AppPage';
import { useActiveUser } from '../../hooks/use_active_user';
import { useModalType } from '../../hooks/use_modal_type';
import { fetchActiveUser } from '../../utils/fetchers';
import { ModalContainer } from '../ModalContainer';

const TimelineContainer = React.lazy(() => import('../TimelineContainer'));
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer'));
const PostContainer = React.lazy(() => import('../PostContainer'));
const TermContainer = React.lazy(() => import('../TermContainer'));
const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));

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
        <React.Suspense fallback={<div></div>}>
          <Switch>
            <Route path="/">
              <TimelineContainer />
            </Route>
            <Route path="/users/:userId">
              <UserProfileContainer />
            </Route>
            <Route path="/posts/:postId">
              <PostContainer />
            </Route>
            <Route path="/terms">
              <TermContainer />
            </Route>
            <Route path="*">
              <NotFoundContainer />
            </Route>
          </Switch>
        </React.Suspense>
      </AppPage>

      <ModalContainer />
    </>
  );
};

export { AppContainer };
