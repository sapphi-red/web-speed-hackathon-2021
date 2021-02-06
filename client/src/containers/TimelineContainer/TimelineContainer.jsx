import React from 'react';

import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchTimeline } from '../../utils/fetchers';

const LIMIT = 10;

/** @type {React.VFC} */
const TimelineContainer = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [allTimeline, setAllTimeline] = React.useState([]);
  const [timeline, setTimeline] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const allTimeline = await fetchTimeline({ limit: undefined, offset: undefined });
      setAllTimeline(allTimeline);

      // 初回は10件のみ表示する
      setTimeline((prev) => [...prev, ...allTimeline.slice(offset, offset + LIMIT)]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsLoading(false);
    });
  }, []);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    setTimeline((prev) => [...prev, ...allTimeline.slice(offset, offset + LIMIT)]);
    setOffset((offset) => offset + LIMIT);
  }, [allTimeline, offset]);

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
