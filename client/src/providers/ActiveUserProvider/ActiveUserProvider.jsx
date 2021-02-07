import { useState } from 'react';

import { ActiveUserContext } from '../../contexts/active_user_context';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 */

/** @type {React.VFC<Props>} */
const ActiveUserProvider = ({ children }) => {
  const store = useState(null);
  return <ActiveUserContext.Provider value={store}>{children}</ActiveUserContext.Provider>;
};

export { ActiveUserProvider };
