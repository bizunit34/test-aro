'use client';

import {
  Alert,
  Snackbar,
  SnackbarCloseReason,
  SnackbarOrigin,
} from '@mui/material';
import Grow, { GrowProps } from '@mui/material/Grow';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface SnackbarMessage {
  message: string;
  key: number;
}

function GrowTransition(props: GrowProps): React.ReactElement {
  return <Grow {...props} />;
}

// Define the type for the toast
interface ToastOptions {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  duration?: number; // in milliseconds
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>(
    [],
  );
  const [open, setOpen] = useState(false);
  const [toastOptions, setToastOptions] = useState<ToastOptions | undefined>({
    message: '',
    severity: 'info',
    duration: 3000,
  });

  React.useEffect(() => {
    if (snackPack.length > 0) {
      setToastOptions({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && open) {
      setOpen(false);
    }
  }, [snackPack, toastOptions, open]);
  const showToast = (options: ToastOptions): void => {
    setSnackPack((prev) => [
      ...prev,
      { ...options, key: new Date().getTime() },
    ]);
  };

  const handleExited = (): void => {
    setToastOptions(undefined);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const { vertical, horizontal }: SnackbarOrigin = getDisplayLocation(
    toastOptions?.severity,
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={toastOptions?.duration || 3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={GrowTransition}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert
          onClose={handleClose}
          severity={toastOptions?.severity || 'info'}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {toastOptions?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

function getDisplayLocation(severity?: string): SnackbarOrigin {
  let vertical: 'top' | 'bottom' = 'bottom';
  let horizontal: 'left' | 'center' | 'right' = 'center';

  if (severity === 'error' || severity === 'warning') {
    vertical = 'top';
    horizontal = 'right';
  }

  if (severity === 'success') {
    horizontal = 'left';
  }

  return { vertical, horizontal };
}
