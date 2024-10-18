import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { toast } from "sonner";

import { api } from "@/api";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/api/services/auth/api";
import { User } from "@/entities/User";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

type AuthContextType = {
  user: User | null;
  token: string | null;
  logout: () => void;
  login?: (payload: LoginPayload) => Promise<LoginResponse | undefined>;
  register?: (
    payload: RegisterPayload
  ) => Promise<RegisterResponse | undefined>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  logout: () => {},
});

export const useAuthSession = () => {
  const { user, token, logout, login, register } = useContext(AuthContext);
  return {
    user,
    token,
    logout,
    login,
    register,
  };
};

export const AuthProvider: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const [user, setUser, removeUser] = useLocalStorage<User | null>(
    "user",
    null
  );
  const [token, setToken, removeToken] = useLocalStorage<string | null>(
    "access_token",
    null
  );

  const [selectedCompanyId, setSelectedCompanyId, removeSelectedCompanyId] =
    useLocalStorage<string | null>("selected_company_id", null);

  const logout = useCallback(() => {
    removeUser();
    removeToken();
    removeSelectedCompanyId();
  }, [removeToken, removeUser, removeSelectedCompanyId]);

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        const response = await api.auth.registration(payload);
        console.log("USER", response.user);

        // const token = response.token.substring(1, response.token.length - 1);
        setUser(response.user);
        setToken(response.token);
        return response;
      } catch (error) {
        const errMessage = error as string;
        throw new Error(errMessage);
      }
    },
    [setToken, setUser]
  );

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const response = await api.auth.login(payload);
        console.log("USER", response.user);
        // const token = response.token.substring(1, response.token.length - 1);
        setUser(response.user);
        setToken(response.token);

        return response;
      } catch (error) {
        const errMessage = error as string;
        throw new Error(errMessage);
      }
    },
    [setToken, setUser]
  );

  const defaultProps = useMemo(() => {
    return {
      user,
      token,
      login,
      logout,
      register,
    };
  }, [user, token, login, logout, register]);

  return (
    <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>
  );
};
