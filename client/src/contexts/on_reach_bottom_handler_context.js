import { createContext } from 'react';

const OnReachBottomHandlerContext = createContext({
  handlers: new Set(),
});

export { OnReachBottomHandlerContext };
