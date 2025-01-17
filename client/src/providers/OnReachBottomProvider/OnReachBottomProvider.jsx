import React from 'react';

import { OnReachBottomHandlerContext } from '../../contexts/on_reach_bottom_handler_context';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 */

/** @type {React.VFC<Props>} */
const OnReachBottomProvider = ({ children }) => {
  const store = React.useMemo(() => ({ handlers: new Set() }), []);
  const prevReachedRef = React.useRef(true);

  React.useEffect(() => {
    const handler = () => {
      // 念の為 2の18乗 回、最下部かどうかを確認する
      const hasReached =
        window.innerHeight + Math.ceil(window.scrollY)
          >= document.body.offsetHeight;

      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current) {
        for (const handler of store.handlers) {
          handler();
        }
      }
      prevReachedRef.current = hasReached;
    };

    document.addEventListener('wheel', handler, { passive: true });
    document.addEventListener('touchmove', handler, { passive: true });
    document.addEventListener('resize', handler, { passive: true });
    document.addEventListener('scroll', handler, { passive: true });
    return () => {
      document.removeEventListener('wheel', handler);
      document.removeEventListener('touchmove', handler);
      document.removeEventListener('resize', handler);
      document.removeEventListener('scroll', handler);
    };
  }, [store]);

  return <OnReachBottomHandlerContext.Provider value={store}>{children}</OnReachBottomHandlerContext.Provider>;
};

export { OnReachBottomProvider };
