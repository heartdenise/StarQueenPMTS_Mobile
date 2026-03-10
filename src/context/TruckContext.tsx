import React, { createContext, useContext, useState } from 'react';

const TruckContext = createContext<any>(null);

export const TruckProvider = ({ children }: any) => {
  const [currentKm, setCurrentKm] = useState<number>(0);
  const [lastServiceKm, setLastServiceKm] = useState<Record<number, number>>({});

  return (
    <TruckContext.Provider value={{ currentKm, setCurrentKm, lastServiceKm, setLastServiceKm }}>
      {children}
    </TruckContext.Provider>
  );
};

export const useTruck = () => useContext(TruckContext);