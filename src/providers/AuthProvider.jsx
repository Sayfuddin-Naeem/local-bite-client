import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { backEndLogin } from "../hooks/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
const auth = getAuth(app);

function AuthProvider({ children }) {
  const [fbUser, setFbUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const backendUser = await backEndLogin(firebaseUser);
        setFbUser(firebaseUser);
        setDbUser(backendUser);
      } else {
        setFbUser(null);
        setDbUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    fbUser,
    dbUser,
    auth,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
