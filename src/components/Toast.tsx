import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar, {
  SnackbarCloseReason,
  SnackbarOrigin,
} from '@mui/material/Snackbar';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

function SlideTransition(
  props: SlideProps,
  direction: 'left' | 'right' | 'up' | 'down',
) {
  return <Slide {...props} direction={direction} />;
}

interface State extends SnackbarOrigin {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement;
    }
  >;
}

interface ToastOptions {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
}

const Toast: React.FC<ToastOptions> = ({ message, severity }) => {
  const [state, setState] = React.useState<State>({
    open: false,
    Transition: Slide,
    vertical: 'top',
    horizontal: 'center',
  });

  const handleClick = (newState: SnackbarOrigin): void => {
    setState({
      ...newState,
      open: true,
      Transition: Slide,
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleClose}
          severity={severity ?? 'success'}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
