import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      const user = await fetchActiveUser();
      setActiveUser(user);
    })().finally(() => {
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (isLoading) {
      document.title = '読込中- CAwitter'
    }
  }, [isLoading])

  if (isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppPage onOpenModal={setModalType}>
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
      </AppPage>

      <ModalContainer />
    </BrowserRouter>
  );
};

export { AppContainer };
