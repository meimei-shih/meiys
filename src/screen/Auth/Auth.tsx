import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { Check, Eye, EyeOff, LoaderCircle, X } from "lucide-react";
import { useAuth } from "src/context/AuthProvider";
import { ROUTE_DEFINITIONS } from "src/routeConfig";
import { FORM_ERRORS_DISPLAY_KEYS, PasswordRequirement } from "./useSignUpForm";
import Footer from 'src/components/Footer';
import Loading from 'src/screen/Loading';
import './Auth.css';

interface PasswordStrengthChecklistProps {
  requirements: PasswordRequirement[];
  showChecklist: boolean;
}

const Login: React.FC = () => {
  const { errors, clearErrors, handleLogin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    return () => clearErrors();
  }, [clearErrors]);

  return (
    <div className="login-and-sign-up-page-content">
      <div className="form-container">
        <h1>Log In</h1>
        <form onSubmit={(e) => handleLogin(e, { email, password })}>
          <div className="input-container">
            <label>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
          </div>
          <div className="input-container">
            <label>
              <i className="fas fa-lock"></i>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <span
              className="toggle-password-visibility-btn"
              onClick={() => setIsPasswordVisible(p => !p)}
            >
              {isPasswordVisible ? <Eye/> : <EyeOff/>}
            </span>
          </div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className="error-message">{error}</li>
            ))}
          </ul>
          <button type="submit">Log In</button>
          <button className='demo-btn' type="button" onClick={() => console.log('demo login')}>Demo site</button>
        </form>
        <p>
          Don't have an account?
          <NavLink className='nav-link-btn' to={ROUTE_DEFINITIONS.SIGNUP_PAGE.path}>
            Sign up for free
          </NavLink>
        </p>
      </div>
    </div>
  )
}

const PasswordStrengthChecklist: React.FC<PasswordStrengthChecklistProps> = ({
  requirements,
  showChecklist
}) => {
  if (!showChecklist) return null;

  return (
    <div className="password-strength-checklist">
      <h4>Password Requirements:</h4>
      <ul className="requirements-list">
        {requirements.map((requirement) => (
          <li 
            key={requirement.id} 
            className={`requirement-item ${requirement.met ? 'met' : 'not-met'}`}
          >
            <span className="requirement-icon">
              {requirement.met ? (
                <Check className="check-icon" />
              ) : (
                <X className="x-icon" />
              )}
            </span>
            <span className="requirement-label">{requirement.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SignUp: React.FC = () => {
  const { rhForm, errors, handleSignUp, clearErrors } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const { register, formErrors, isValid, formState, passwordRequirements, reset } = rhForm;

  const isEmailValid = formState.dirtyFields.email && !formErrors.email;
  const isUsernameValid = formState.dirtyFields.username && !formErrors.username;
  const isPasswordValid = formState.dirtyFields.password && !formErrors.password;
  const isConfirmPasswordValid = formState.dirtyFields.confirmPassword && !formErrors.confirmPassword;
  const isSubmitting = formState.isSubmitting;

  useEffect(() => {
    return () => {
      clearErrors();
      reset();
    };
  }, [clearErrors, reset]);

  return (
    <div className="login-and-sign-up-page-content">
      <div className="form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp} autoComplete="off">
          {/* EMAIL */}
          <div className={`input-container ${formErrors.email && 'input-error'}`}>
            <label>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="email"
                {...register.email}
              />
            </label>
            <Check className={`form-success-icon ${isEmailValid ? 'visible' : 'hidden'}`} />
          </div>
          {/* USERNAME */}
          <div className={`input-container ${formErrors.username && 'input-error'}`}>
            <label>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="username"
                {...register.username}
              />
            </label>
            <Check className={`form-success-icon ${isUsernameValid ? 'visible' : 'hidden'}`} />
          </div>
          {/* PASSWORD */}
          <div className={`input-container ${formErrors.password && 'input-error'}`}>
            <label>
              <i className="fas fa-lock"></i>
              <input
                autoComplete="off"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="password"
                {...register.password}
              />
            </label>
            <span
              className="toggle-password-visibility-btn"
              onClick={() => setIsPasswordVisible(p => !p)}
            >
              {isPasswordVisible ? <Eye/> : <EyeOff/>}
            </span>
            <Check className={`form-success-icon ${isPasswordValid ? 'visible' : 'hidden'}`} />
          </div>
          <PasswordStrengthChecklist 
            requirements={passwordRequirements}
            showChecklist={!!formState.dirtyFields.password && !isPasswordValid}
          />
          {/* CONFIRM PASSWORD */}
          <div className={`input-container ${formErrors.confirmPassword && 'input-error'}`}>
            <label>
              <i className="fas fa-spell-check"></i>
              <input
                autoComplete="off"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder="confirm password"
                {...register.confirmPassword}
              />
            </label>
            <span
              className="toggle-password-visibility-btn"
              onClick={() => setIsConfirmPasswordVisible(p => !p)}
            >
              {isConfirmPasswordVisible ? <Eye/> : <EyeOff/>}
            </span>
            <Check className={`form-success-icon ${isConfirmPasswordValid ? 'visible' : 'hidden'}`} />
          </div>
          {/* ERRORS */}
          <ul>
            {FORM_ERRORS_DISPLAY_KEYS.map(key => {
              if (!formErrors[key]) return null;
              else return <li className="error-message" key={key}>{formErrors[key]?.message}</li>
            })}
            {errors.map((error, idx) => (
              <li key={idx} className="error-message">{error}</li>
            ))}
          </ul>
          {/* SIGN UP BUTTON */}
          <button type="submit" disabled={!isValid || isSubmitting} className={`${!isValid ? 'disabled-button' : isSubmitting ? 'loading-button' : ''}`}>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
            <LoaderCircle className={`loading-spinner ${isSubmitting ? 'visible' : 'not-display'}`}/>
          </button>
        </form>
        <p>
          Already have an account?
          <NavLink className='nav-link-btn' to={ROUTE_DEFINITIONS.LOGIN_PAGE.path}>
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  )
}

const Auth: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading, errors, userProfile } = useAuth();
  const isLoginPage = location.pathname === ROUTE_DEFINITIONS.LOGIN_PAGE.path;
  const isSignUpPage = location.pathname === ROUTE_DEFINITIONS.SIGNUP_PAGE.path;

  if (errors.length > 0) return <Navigate to={ROUTE_DEFINITIONS.ERROR_PAGE.path} />
  else if (isAuthenticated && userProfile) return <Navigate to={`/${userProfile.username}`} />;
  else if (isLoading) return <Loading />;
  else if (isLoginPage || isSignUpPage) {
    return (
      <>
        {isLoginPage ? <Login /> : <SignUp />}
        <Footer />
      </>
    )
  } else return null;
}

export default Auth;
