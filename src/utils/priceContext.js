
import React, { createContext, useState } from "react";

const priceContext = createContext({
  priceValue: null,
  setPriceValue: () => {},
});

const PriceProvider = ({ children }) => {
  const [priceValue, setPriceValue] = useState(null);
  return (
    <priceContext.Provider value={{ priceValue, setPriceValue  }}>
      {children}
    </priceContext.Provider>
  );
};

export { PriceProvider, priceContext };

