import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import { Box, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: 'primary.main',
        color: 'var(--foreground)',
        padding: 3,
        marginTop: 'auto',
      }}
    >
      <Container maxWidth='lg'>
        <div>
          <a className='flex' href='tel:+12486333525'>
            <FontAwesomeIcon
              icon={faPhone}
              width={10}
              style={{ marginRight: '5px' }}
            />
            248.633.3525
          </a>
          <a className='flex' href='mailto:info@aroconnection.com'>
            <FontAwesomeIcon
              icon={faEnvelope}
              width={10}
              style={{ marginRight: '5px' }}
            />
            info@aroconnection.com
          </a>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
