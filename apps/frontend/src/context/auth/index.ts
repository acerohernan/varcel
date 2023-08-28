import { createContext, useContext } from "react";

interface IAuthContext {
  actions: {
    saveToken: (token: string) => void;
    logout: () => void;
  };
}

export const AuthContext = createContext({} as IAuthContext);

export const useAuthContext = () => useContext(AuthContext);
