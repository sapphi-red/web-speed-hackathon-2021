import { useState, useEffect } from 'react';

import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchTimeline } from '../../utils/fetchers';

const LIMIT = 10;

/** @type {React.VFC} */
const TimelineContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [timeline, setTimeline] = useState([]);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      // 初回は10件のみ表示する
      const firstTimeline = await fetchTimeline({ limit: LIMIT, offset: 0 });

      setTimeline(firstTimeline);
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

  useEffect(() => {
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
