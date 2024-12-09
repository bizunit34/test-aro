'use client';

import { Alert, Snackbar } from '@mui/material';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the type for the toast
interface ToastOptions {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  duration?: number; // in milliseconds
}

// Context type
interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

// Create Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider Component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [toastOptions, setToastOptions] = useState<ToastOptions>({
    message: '',
    severity: 'info',
    duration: 3000,
  });

  const showToast = (options: ToastOptions): void => {
    setToastOptions({ ...options });
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={toastOptions.duration || 3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={toastOptions.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {toastOptions.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

// Custom Hook
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
