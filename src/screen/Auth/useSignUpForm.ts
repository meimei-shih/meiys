import { useEffect } from "react";
import {
  useForm,
  UseFormRegisterReturn,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormGetValues,
  FormState,
  UseFormTrigger,
} from "react-hook-form";

export enum FormErrorsKeys {
  email = 'email',
  username = 'username',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

export interface SignUpFormData {
  [FormErrorsKeys.email]: string;
  [FormErrorsKeys.username]: string;
  [FormErrorsKeys.password]: string;
  [FormErrorsKeys.confirmPassword]: string;
}

interface ValidationRule {
  required?: string | boolean;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: string) => string | boolean;
}

interface ValidationSchema {
  email: ValidationRule;
  username: ValidationRule;
  password: ValidationRule;
  confirmPassword: ValidationRule;
}

export interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
  met: boolean;
}

export interface UseSignUpFormReturn {
  register: Record<keyof SignUpFormData, UseFormRegisterReturn>;
  trigger: UseFormTrigger<SignUpFormData>;
  handleSubmit: UseFormHandleSubmit<SignUpFormData>;
  formState: FormState<SignUpFormData>;
  formErrors: FieldErrors<SignUpFormData>;
  isValid: boolean;
  isDirty: boolean;
  getValues: UseFormGetValues<SignUpFormData>;
  passwordRequirements: PasswordRequirement[];
  resetField: (name: keyof SignUpFormData) => void;
  reset: () => void;
}

export const FORM_ERRORS_DISPLAY_KEYS: FormErrorsKeys[] = [
  FormErrorsKeys.email,
  FormErrorsKeys.username,
  FormErrorsKeys.confirmPassword,
];

// Validation schema
const validationSchema: ValidationSchema = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  },
  username: {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters"
    },
    maxLength: {
      value: 20,
      message: "Username must be less than 20 characters"
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    },
    maxLength: {
      value: 15,
      message: "Password must be less than 15 characters"
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`-])/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }
  },
  confirmPassword: {
    required: "Please confirm your password"
  }
};

export const useSignUpForm = () => {

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState,
    getValues,
    resetField,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  });

  const password = watch("password");

  // Trigger confirmPassword validation when password changes
  useEffect(() => {
    if (formState.dirtyFields.confirmPassword) trigger("confirmPassword");
  }, [password, trigger, formState.dirtyFields.confirmPassword]);

  // Password requirements checklist
  const passwordRequirements: PasswordRequirement[] = [
    {
      id: 'minLength',
      label: 'At least 8 characters',
      validator: (pwd: string) => pwd.length >= 8,
      met: password.length >= 8
    },
    {
      id: 'maxLength',
      label: 'Less than 15 characters',
      validator: (pwd: string) => pwd.length <= 15,
      met: password.length <= 15 && password.length > 0
    },
    {
      id: 'uppercase',
      label: 'At least one uppercase letter',
      validator: (pwd: string) => /[A-Z]/.test(pwd),
      met: /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      label: 'At least one lowercase letter',
      validator: (pwd: string) => /[a-z]/.test(pwd),
      met: /[a-z]/.test(password)
    },
    {
      id: 'number',
      label: 'At least one number',
      validator: (pwd: string) => /\d/.test(pwd),
      met: /\d/.test(password)
    },
    {
      id: 'special',
      label: 'At least one special character',
      validator: (pwd: string) => /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`-]/.test(pwd),
      met: /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`-]/.test(password)
    }
  ];

  // Enhanced register function with validation
  const registerField: Record<keyof SignUpFormData, UseFormRegisterReturn> = {
    email: register("email", validationSchema.email),
    username: register("username", validationSchema.username),
    password: register("password", validationSchema.password),
    confirmPassword: register("confirmPassword", {
      ...validationSchema.confirmPassword,
      validate: (value: string): string | boolean => value === password || "Passwords do not match"
    })
  };

  const returnValue: UseSignUpFormReturn = {
    register: registerField,
    trigger,
    handleSubmit,
    formState,
    formErrors: formState.errors,
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    getValues,
    passwordRequirements,
    resetField,
    reset,
  };

  return returnValue;
}; 