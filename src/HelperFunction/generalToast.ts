import { toast, Bounce } from "react-toastify";

/**
 * Displays a general toast notification (success or info type)
 * 
 * @param message - The message text to display in the toast
 * @param type - The type of toast to display ('success' | 'info')
 */
function generalToast (message: string, type: 'success' | 'info') {
  toast[type](message, {
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
}

/**
 * Displays an error toast notification with configurable options
 * 
 * @param message - The error message text to display
 * @param disableCloseButton - If true, removes the close button and makes toast non-draggable (default: false)
 * @param toastId - Unique identifier for the toast. If provided with disableCloseButton=true, prevents duplicate toasts
 */
function errorToast (message: string, disableCloseButton?: boolean, toastId?: string) {
  if (disableCloseButton && toastId  && toast.isActive(toastId )) return;
  toast.error(message, {
    toastId,
    position: "top-right",
    autoClose: false,
    closeButton: !disableCloseButton,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: !disableCloseButton,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
}

export { generalToast, errorToast };