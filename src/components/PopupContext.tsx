"use client";
import React, { createContext, useContext, useState } from "react";

interface PopupOptions {
  gated?: boolean;
}

interface PopupContextType {
  isOpen: boolean;
  isGated: boolean;
  openPopup: (options?: PopupOptions | React.MouseEvent | any) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGated, setIsGated] = useState(false);

  const openPopup = (options?: PopupOptions | React.MouseEvent | any) => {
    if (options && (options.nativeEvent || typeof options.preventDefault === "function")) {
      setIsGated(false);
    } else if (options && typeof options === "object" && "gated" in options) {
      setIsGated(!!options.gated);
    } else {
      setIsGated(false);
    }
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setIsGated(false);
  };

  return (
    <PopupContext.Provider value={{ isOpen, isGated, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
