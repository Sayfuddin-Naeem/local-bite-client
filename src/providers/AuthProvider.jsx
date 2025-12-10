import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { loadBackendUser } from "../hooks/user";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
const auth = getAuth(app);

function AuthProvider({ children }) {
  const [fbUser, setFbUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [isLoadUser, setIsLoadUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFbUser(firebaseUser);
        if (isLoadUser) {
          const backendUser = await loadBackendUser(firebaseUser);
          setDbUser(backendUser);
        }
      } else {
        setFbUser(null);
        setDbUser(null);
      }
    });
    return () => unsubscribe();
  }, [isLoadUser]);

  const authData = {
    setIsLoadUser,
    fbUser,
    dbUser,
    setDbUser,
    auth,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
