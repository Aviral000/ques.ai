import React, { createContext, useState } from 'react'

export const productContext = createContext();

export function ProductProviders({ children }) {
const [productId, setProductId] = useState("");

  return (
    <div>
      <productContext.Provider value={{ productId, setProductId }}>
        {children}
      </productContext.Provider>
    </div>
  )
}
