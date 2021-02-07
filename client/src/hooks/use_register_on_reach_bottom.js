import { useContext, useEffect } from 'react';

import { OnReachBottomHandlerContext } from '../contexts/on_reach_bottom_handler_context';

/**
 * @param {() => void} handler
 * @param {Array<*>} deps
 */
function useRegisterOnReachBottom(handler, deps) {
  const { handlers } = useContext(OnReachBottomHandlerContext);

  const memoizedHandler = useCallback(handler, deps);

  useEffect(() => {
    handlers.add(memoizedHandler);
    return () => handlers.delete(memoizedHandler);
  }, [memoizedHandler]);
}

export { useRegisterOnReachBottom };
