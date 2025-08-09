import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, validatePassword, onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "../firebase";
import { SignUpFormData, useSignUpForm, UseSignUpFormReturn } from "src/screen/Auth/useSignUpForm";
import { ROUTE_DEFINITIONS } from "src/routeConfig";

const ERROR_MESSAGES = {
  PASSWORD_NOT_VALID: 'Password is not valid.',
  FORM_NOT_VALID: 'Information is not valid.',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again. If the problem persists, please contact support.',
  EMAIL_ALREADY_IN_USE: 'Email already in use.',
  LOGIN_FAILED: 'The username or password you entered is not valid.',
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  // State
  activeUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  rhForm: UseSignUpFormReturn;
  errors: string[];
  // Actions
  handleSignUp: (e: React.BaseSyntheticEvent) => Promise<void>;
  handleLogin: (e: React.BaseSyntheticEvent, credentials: LoginCredentials) => Promise<void>;
  handleLogout: (e: React.BaseSyntheticEvent) => Promise<void>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  clearErrors: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = getAuth(app);
  const rhForm = useSignUpForm();
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const { handleSubmit, isValid, reset } = rhForm;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setActiveUser({ ...user });
        setIsAuthenticated(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
      else {
        setActiveUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [auth])

  const handleSignUp = useCallback(handleSubmit(async (credentials: SignUpFormData) => {
    try {
      const auth = getAuth(app);
      const passwordStatus = await validatePassword(getAuth(), credentials.password);
      const errors = [];
      if (!isValid) errors.push(ERROR_MESSAGES.FORM_NOT_VALID);
      if (!passwordStatus.isValid) errors.push(ERROR_MESSAGES.PASSWORD_NOT_VALID);
      setErrors(errors);
      if (errors.length) return;

      const newUser = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      if (newUser.user) {
        await setDoc(doc(db, "Users", newUser.user.uid), {
          email: newUser.user.email,
          username: credentials.username,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        toast.success('Account created successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate(ROUTE_DEFINITIONS.LOGIN_PAGE.path);
      reset();
      }
    } catch (error) {
      if (String(error).includes('email-already-in-use')) setErrors([ERROR_MESSAGES.EMAIL_ALREADY_IN_USE]);
      else setErrors([ERROR_MESSAGES.SOMETHING_WENT_WRONG]);
    }
  }), [auth, setErrors, navigate, rhForm]);

  const handleLogin = useCallback(async (e: React.BaseSyntheticEvent, credentials: LoginCredentials) => {
    try {
      e.preventDefault();
      const user = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      if (user.user) navigate(ROUTE_DEFINITIONS.HOME_PAGE.path);
    } catch (error) {
      setErrors([ERROR_MESSAGES.LOGIN_FAILED]);
      reset();
    }
  }, [auth, setErrors, navigate, reset]);

  const handleLogout = useCallback(async (e: React.BaseSyntheticEvent) => {
    try {
      e.preventDefault();
      await signOut(auth);
      navigate(ROUTE_DEFINITIONS.HOME_PAGE.path);
    } catch (error) {
      toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      navigate(ROUTE_DEFINITIONS.HOME_PAGE.path);
    }
  }, [auth, navigate]);


  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const contextValue: AuthContextType = {
    // State
    activeUser,
    isAuthenticated,
    isLoading,
    rhForm,
    errors,
    // Actions
    handleSignUp,
    handleLogin,
    handleLogout,
    setErrors,
    clearErrors,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};

