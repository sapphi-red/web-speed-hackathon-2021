import { createContext } from 'react';

import { ActiveUserContext } from '../contexts/active_user_context';

/**
 * @returns {[*. (user: *) => void]}
 */
function useActiveUser() {
  const [user, setUser] = useContext(ActiveUserContext);
  return [user, setUser];
}

export { useActiveUser };
