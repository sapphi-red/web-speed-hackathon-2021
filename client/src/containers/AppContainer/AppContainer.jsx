import { lazy, useEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useActiveUser } from '../../hooks/use_active_user';
import { useModalType } from '../../hooks/use_modal_type';
import { fetchActiveUser } from '../../utils/fetchers';
import { ModalContainer } from '../ModalContainer';

const TimelineContainer = lazy(() => import('../TimelineContainer'));
const UserProfileContainer = lazy(() => import('../UserProfileContainer'));
const PostContainer = lazy(() => import('../PostContainer'));
const TermContainer = lazy(() => import('../TermContainer'));
const NotFoundContainer = lazy(() => import('../NotFoundContainer'));

/** @type {React.VFC} */
const AppContainer = () => {
  const [_modalType, setModalType] = useModalType();
  const [_activeUser, setActiveUser] = useActiveUser();

  useEffect(() => {
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
    <BrowserRouter>
      <AppPage onOpenModal={setModalType}>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/">
              <TimelineContainer />
            </Route>
            <Route exact path="/users/:userId">
              <UserProfileContainer />
            </Route>
            <Route exact path="/posts/:postId">
              <PostContainer />
            </Route>
            <Route exact path="/terms">
              <TermContainer />
            </Route>
            <Route path="*">
              <NotFoundContainer />
            </Route>
          </Switch>
        </Suspense>
      </AppPage>

      <ModalContainer />
    </BrowserRouter>
  );
};

export { AppContainer };
