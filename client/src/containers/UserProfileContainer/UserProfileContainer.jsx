import React from 'react';
import { useParams } from 'react-router-dom';

import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchTimelineByUser, fetchUser } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

const LIMIT = 10;

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const { userId } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);

  const [user, setUser] = React.useState(null);

  const [timeline, setTimeline] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const user = await fetchUser({ userId });
      setUser(user);
    })().finally(() => {
      setIsLoading(false);
    });
  }, [userId]);

  React.useEffect(() => {
    (async () => {
      setIsFetching(true);
      // 初回は10件のみ表示する
      const firstTimeline = await fetchTimelineByUser({
        userId,
        limit: LIMIT,
        offset: 0,
      });
      setTimeline(firstTimeline);
      setOffset(LIMIT);
    })().finally(() => {
      setIsFetching(false);
    });
  }, [userId]);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    if (isFetching) return
    (async () => {
      setIsFetching(true);
      const next = await fetchTimelineByUser({
        userId,
        limit: LIMIT,
        offset,
      });

      setTimeline((prev) => [...prev, ...next]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsFetching(false);
    });
  }, [isFetching, timeline, offset]);

  React.useEffect(() => {
    if (isLoading) {
      document.title = '読込中- CAwitter'
    } else if (user !== null) {
      document.title = `${user.name} さんのタイムライン- CAwitter`
    }
  }, [isLoading, user])

  if (isLoading) {
    return null;
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  return <UserProfilePage timeline={timeline} user={user} />;
};

export { UserProfileContainer };
