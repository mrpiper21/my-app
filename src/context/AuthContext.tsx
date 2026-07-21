import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

type AuthContextType = {
  session: string | null;
  isLoading: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be used within a <SessionProvider />');
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: restore a persisted token (e.g. via expo-secure-store) here.
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        signIn: (token: string) => setSession(token),
        signOut: () => setSession(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
