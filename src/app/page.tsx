'use client';

import { Button } from '@mui/material';
import React from 'react';

import { useToast } from '@/components';

export default function Home(): React.JSX.Element {
  const { showToast } = useToast();

  const handleClick1 = (): void => {
    showToast({
      message: 'This is a success message!',
      severity: 'success',
      duration: 4000,
    });
  };
  const handleClick2 = (): void => {
    showToast({
      message: 'This is an info message!',
      severity: 'info',
      duration: 4000,
    });
  };
  const handleClick3 = (): void => {
    showToast({
      message: 'This is an warn message!',
      severity: 'warning',
      duration: 4000,
    });
  };
  const handleClick4 = (): void => {
    showToast({
      message: 'This is an error message!',
      severity: 'error',
      duration: 4000,
    });
  };

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>Home</div>
        <div>
          <Button variant='contained' color='primary' onClick={handleClick1}>
            Show Success
          </Button>
          <Button variant='contained' color='primary' onClick={handleClick2}>
            Show Info
          </Button>
          <Button variant='contained' color='primary' onClick={handleClick3}>
            Show Warning
          </Button>
          <Button variant='contained' color='primary' onClick={handleClick4}>
            Show Error
          </Button>
        </div>
      </main>
    </div>
  );
}
