// ServerUrlContext.js
import React, { createContext, useState } from 'react';

export const ServerUrlContext = createContext();

export const ServerUrlProvider = ({ children }) => {
  const [serverUrl, setServerUrl] = useState('');

  return (
    <ServerUrlContext.Provider value={{ serverUrl, setServerUrl }}>
      {children}
    </ServerUrlContext.Provider>
  );
};
