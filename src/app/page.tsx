'use client';

import { Button } from '@mui/material';
import React from 'react';

import { useToast } from '@/context/toast.context';

export default function Home(): React.JSX.Element {
  // const images: Array<string> = [];

  // for (let i = 1; i <= 120; i++) {
  //   images.push(`/splash/${i}.png`);
  // }

  // for (let i = 120; i >= 1; i--) {
  //   images.push(`/splash/${i}.png`);
  // }

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
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 100);

  //   return (): void => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        {/* <img key={1} src={firstImage} alt={`Image ${1}`} /> */}
        {/* <div className={styles.carousel}>
          {' '}
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              className={`${styles.carouselImage} ${index === currentImageIndex ? styles.active : ''}`}
            />
          ))}{' '}
        </div> */}
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
