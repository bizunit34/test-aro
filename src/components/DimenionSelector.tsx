import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

import styles from './PacdoraCustomizationCard.module.css';

interface DimensionSelectorProps {
  onDimensionChange: (selectedDimension: string) => void;
}

const DimensionSelector: React.FC<DimensionSelectorProps> = ({ onDimensionChange }) => {
  const [dimensionOptions, setDimensionOptions] = useState([
    '315*202*62',
    '150*100*50',
    '360*240*40',
    'customize',
  ]);
  const [selectedDimension, setSelectedDimension] = useState('');
  const [customDimension, setCustomDimension] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDimensionChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value;

    if (value === 'customize') {
      setIsModalOpen(true);
    } else {
      setSelectedDimension(value);
      onDimensionChange(value); // Notify parent of the change
    }
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setCustomDimension('');
  };

  const addCustomDimension = (): void => {
    if (customDimension) {
      setDimensionOptions((prevOptions) => [
        ...prevOptions.filter((opt) => opt !== 'customize'),
        customDimension,
        'customize',
      ]);
      setSelectedDimension(customDimension);
      onDimensionChange(customDimension); // Notify parent of the custom dimension
      handleModalClose();
    }
  };

  return (
    <div className={styles.selectorBox}>
      <FormControl fullWidth>
        <InputLabel id='dimension-label'>Choose the dimension</InputLabel>
        <Select
          labelId='dimension-label'
          id='dimension'
          value={selectedDimension}
          onChange={handleDimensionChange}
        >
          {dimensionOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option === 'customize' ? 'Customize' : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby='custom-dimension-modal'
        aria-describedby='add-custom-dimension'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id='custom-dimension-modal'>Enter Custom Dimension</h2>
          <TextField
            fullWidth
            label='Custom Dimension (e.g., 200*150*50)'
            value={customDimension}
            onChange={(e) => setCustomDimension(e.target.value)}
          />
          <Box mt={2} display='flex' justifyContent='flex-end'>
            <Button onClick={handleModalClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant='contained' onClick={addCustomDimension}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DimensionSelector;
