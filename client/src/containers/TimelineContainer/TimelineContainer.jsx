import React from 'react';

import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchTimeline } from '../../utils/fetchers';

const LIMIT = 10;

/** @type {React.VFC} */
const TimelineContainer = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);

  const [timeline, setTimeline] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      setIsFetching(true);
      // 初回は10件のみ表示する
      const allTimeline = await fetchTimeline({ limit: LIMIT, offset: 0 });

      setTimeline(allTimeline);
      setOffset(LIMIT);
    })().finally(() => {
      setIsLoading(false);
      setIsFetching(false);
    });
  }, []);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    if (isFetching) return
    (async () => {
      setIsFetching(true);
      const next = await fetchTimeline({ limit: LIMIT, offset });

      setTimeline((prev) => [...prev, ...next]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsFetching(false);
    });
  }, [isFetching, timeline, offset]);

  React.useEffect(() => {
    if (isLoading) {
      document.title = '読込中- CAwitter'
    } else {
      document.title = 'タイムライン- CAwitter'
    }
  }, [isLoading])

  if (isLoading) {
    return null;
  }

  return <TimelinePage timeline={timeline} />;
};

export { TimelineContainer };
