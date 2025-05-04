// src/contexts/AuthContext.tsx
import { useGetUser } from "@/hooks/use-get-user";
import { useLoginMutation } from "@/hooks/use-login";
import { useLogoutMutation } from "@/hooks/use-logout";
import { createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useGetUser();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/login";
  };

  console.log("AuthProvider", { data, isLoading });
  console.log("AuthProvider", { user: data, isAuthenticated: !!data });

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        isAuthenticated: !!data,
        login,
        logout,
        refetchUser: refetch,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};

export const useUser = () => {
  const { user, isAuthenticated } = useAuth();
  return { user, isAuthenticated };
};
