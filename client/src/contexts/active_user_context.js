import { createContext } from 'react';

const ActiveUserContext = createContext([undefined, () => {}]);

export { ActiveUserContext };
