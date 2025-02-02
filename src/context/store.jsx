import React, { useContext, useState, createContext } from 'react';

const storeContext = createContext();
const storeUpdateContext = createContext();

export function Store() {
  return useContext(storeContext);
}

export function UpdateStore() {
  return useContext(storeUpdateContext);
}

export function StoreProvider({ children }) {
  const [store, setStore] = useState({
    selecedData: '',
  });

  const updateStore = (data) => {
    setStore((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={updateStore}>
        {children}
      </storeUpdateContext.Provider>
    </storeContext.Provider>
  );
}
