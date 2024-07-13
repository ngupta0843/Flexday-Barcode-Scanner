import { createContext, useState } from "react";

export const UPCcontext = createContext();

export const UPCprovider = ({ children }) => {
  const [upc, setUpc] = useState("");

  return (
    <UPCcontext.Provider value={{ upc, setUpc }}>
      {children}
    </UPCcontext.Provider>
  );
};

