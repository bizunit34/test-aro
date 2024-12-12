'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import React, { useState } from 'react';

import { ItemModel } from '@/models';
import { PacdoraModel } from '@/models/pacdora/pacdora.model';
import PacdoraServiceInstance from '@/services/pacdora.service';

import DimensionSelector from './DimenionSelector';
import styles from './PacdoraCustomizationCard.module.css';

interface ItemDetailsProps {
  item: ItemModel;
}

// Transition animation method for the slide switch component
function onSwitch2DAnd3D(type: string): void {
  const switchItems = document.querySelectorAll('.switch-item');
  const boxInfo: HTMLInputElement | null =
    document.querySelector('.box-info-slider');

  if (type === '3d') {
    switchItems[0].className = `${styles['switch-item']} ${styles['active']} switch-item active`;
    switchItems[1].className = `${styles['switch-item']} switch-item`;
    switchItems[2].className = `${styles['switch-item']} switch-item`;

    if (boxInfo != null) {
      boxInfo.style.transform = 'translateX(0)';
    }
  } else if (type === 'dieline') {
    switchItems[0].className = `${styles['switch-item']} switch-item`;
    switchItems[1].className = `${styles['switch-item']} ${styles['active']} switch-item active`;
    switchItems[2].className = `${styles['switch-item']} switch-item`;

    if (boxInfo != null) {
      boxInfo.style.transform = 'translateX(-100%)';
    }
  } else {
    switchItems[0].className = `${styles['switch-item']} switch-item`;
    switchItems[1].className = `${styles['switch-item']} switch-item`;
    switchItems[2].className = `${styles['switch-item']} ${styles['active']} switch-item active`;

    if (boxInfo != null) {
      boxInfo.style.transform = 'translateX(-200%)';
    }
  }
}

function openPacdora(ratio: number): void {
  PacdoraServiceInstance.getPacdora()?.collapse('d3', ratio);
  const pointer: HTMLInputElement | null = document.querySelector('.pointer');

  if (pointer != null) {
    pointer.style.left = `${ratio * 100}%`;
  }
  const selected: HTMLInputElement | null =
    document.querySelector('.slider-selecter');

  if (selected != null) {
    selected.style.width = `${ratio * 100}%`;
  }
}

/**
 * The callback function triggered by the dimension change event
 * updates the project via the Pacdora.setSize method.
 * @param {*} e
 * @returns
 */
function onChangeDimension(value: string): void {
  console.log('value: ', value);

  if (value.trim() === '') {
    return;
  }

  console.log('value: ', value);
  const size = value.split('*');
  PacdoraServiceInstance.getPacdora()?.setSize({
    length: Number(size[0]),
    width: Number(size[1]),
    height: Number(size[2]),
    async: true,
  });
}

/**
 * The callback function triggered by the Material change event
 * updates the project via the Pacdora.setMaterial method.
 * @param {*} e
 */
function onChangeMaterial(
  e: EventTarget & { value: string; name: string },
): void {
  const value = e.value;

  if (value !== '') {
    switch (value) {
      case 'White card board':
        Pacdora?.setMaterial({
          name: 'White card board',
          image:
            '//cdn.pacdora.com/science/image/94e8078a-9931-42cd-97ed-57883bd88085.png',
          async: true,
        });
        break;
      case 'E-flute paper':
        Pacdora?.setMaterial({
          name: 'E-flute paper',
          image:
            '//cdn.pacdora.com/science/image/00e45c0b-9cf7-4d39-bdc8-82bb202909d9.png',
          async: true,
        });
        break;
      case 'Kraft paper':
        Pacdora?.setMaterial({
          name: 'Kraft paper',
          image: '//cdn.pacdora.com/science/image/material_kraft.png',
          async: true,
        });
        break;
    }
  }
}

/**
 * The callback function triggered by the Thickness change event
 * updates the project via the Pacdora.setThickness method.
 * @param {*} e
 */
function onChangeThickness(
  e: EventTarget & { value: string; name: string },
): void {
  const value = e.value;

  if (value !== '') {
    PacdoraServiceInstance.getPacdora()?.setThickness({
      value: Number(value),
      async: true,
    });
  }
}

function onBuyClick(): void {
  const message = document.querySelector('.toast-message');

  if (message) {
    message.className = 'toast-message active';
    setTimeout(() => {
      message.className = 'toast-message';
    }, 2000);
  }
}

const PacdoraCustomizationCard: React.FC<ItemDetailsProps> = () => {
  const [sliderValue, setSlider] = React.useState<number>(100);
  const [material, setMaterial] = useState('');
  const [thickness, setThickness] = useState('');
  const [print, setPrint] = useState('outside');
  const [finishing, setFinishing] = useState('gloss');
  const [quantity, setQuantity] = useState('500');
  const [selectedDimension, setSelectedDimension] = useState<string>('');
  console.log(selectedDimension);

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
  ): void => {
    if (typeof newValue != 'number') {
      newValue = 50;
    }

    setSlider(newValue);
    console.log('newValue: ', newValue);
    console.log('newValue / 100: ', newValue / 100);
    console.log('Pacdora: ', PacdoraServiceInstance.getPacdora());
    PacdoraServiceInstance.getPacdora()?.collapse('d3', newValue / 100);
    console.log('newValue / 100: ', newValue / 100);
  };

  const handleDimensionChange = (dimension: string): void => {
    console.log('Selected Dimension:', dimension);
    setSelectedDimension(dimension);
    onChangeDimension(dimension);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <div className={styles['box-info']}>
        <div className={styles['left']}>
          <div className={`${styles['box-info-slider']} box-info-slider`}>
            <div className={`${styles['box-info-item']} ${styles['active']}`}>
              {/* <!-- 3D box expansion and collapse control component start --> */}
              <div
                className={styles['collapse-control']}
                data-ui-tip='collapse'
                data-position='bottom'
              >
                <div onClick={() => openPacdora(0)}>Open</div>
                <Slider
                  size='small'
                  aria-label='Box State'
                  value={sliderValue}
                  onChange={handleSliderChange}
                  sx={{ marginLeft: 1, marginRight: 1 }}
                />
                <div onClick={() => openPacdora(1)}>Close</div>
              </div>
              {/* <!-- 3D box expansion and collapse control component end --> */}

              {/* <!-- Pacdora component data-pacdora-ui="3d" start --> */}
              <div
                className={styles['d3']}
                data-pacdora-ui='3d'
                data-pacdora-id='d3'
                data-init-rotation='true'
              ></div>
              {/* <!-- Pacdora component data-pacdora-ui="3d" end --> */}
            </div>
            {/* <!-- Pacdora component data-pacdora-ui="dieline" start --> */}
            <div className={styles['box-info-item']} data-tip-position='center'>
              <div
                className={`${styles['dieline']} dieline`}
                data-pacdora-ui='dieline'
              ></div>
            </div>
            {/* <!-- Pacdora component data-pacdora-ui="dieline" end --> */}

            {/* <!-- Pacdora-component data-pacdora-ui="3d-preview" start --> */}
            <div className={styles['box-info-item']} data-tip-position='center'>
              <div
                data-pacdora-ui='3d-preview'
                className={`${styles['preview']} preview`}
              ></div>
            </div>
            {/* <!-- Pacdora-component data-pacdora-ui="3d-preview" end --> */}
          </div>

          {/* <!-- Slide Switch Component --> */}
          <div className={styles['d3-and-d2-switch']} data-ui-tip='switch'>
            <div
              className={`${styles['switch-item']} ${styles['active']} switch-item active`}
              onClick={() => onSwitch2DAnd3D('3d')}
            >
              3D
            </div>
            <div
              className={`${styles['switch-item']} switch-item active`}
              onClick={() => onSwitch2DAnd3D('dieline')}
            >
              Dieline
            </div>
            <div
              className={`${styles['switch-item']} switch-item active`}
              onClick={() => onSwitch2DAnd3D('2d')}
            >
              2D
            </div>
          </div>
        </div>
        <div className={styles['right']}>
          <Box>
            <div className={styles['sub-title']} data-ui-tip='dimension'>
              Dimension
            </div>
            <DimensionSelector onDimensionChange={handleDimensionChange} />
          </Box>

          <Box>
            <div className={styles['sub-title']} data-ui-tip='material'>
              Material
            </div>
            <FormControl fullWidth className={styles['selector-box']}>
              <InputLabel id='material-label'>Choose the material</InputLabel>
              <Select
                labelId='material-label'
                value={material}
                onChange={(e) => {
                  setMaterial(e.target.value);
                  onChangeMaterial(e.target);
                }}
              >
                <MenuItem value=''>Choose the material</MenuItem>
                <MenuItem value='White card board'>White card board</MenuItem>
                <MenuItem value='E-flute paper'>E-flute paper</MenuItem>
                <MenuItem value='Kraft paper'>Dark kraft paper</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <div className={styles['sub-title']} data-ui-tip='thickness'>
              Thickness
            </div>
            <FormControl fullWidth className={styles['selector-box']}>
              <InputLabel id='thickness-label'>Choose the thickness</InputLabel>
              <Select
                labelId='thickness-label'
                value={thickness}
                onChange={(e) => {
                  setThickness(e.target.value);
                  onChangeThickness(e.target);
                }}
              >
                <MenuItem value=''>Choose the thickness</MenuItem>
                <MenuItem value='1.5'>1.5mm</MenuItem>
                <MenuItem value='1'>1mm</MenuItem>
                <MenuItem value='2'>2mm</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <div className={styles['sub-title']}>Print</div>
            <FormControl fullWidth className={styles['selector-box']}>
              <InputLabel id='print-label'>Choose the print method</InputLabel>
              <Select
                labelId='print-label'
                value={print}
                onChange={(e) => setPrint(e.target.value)}
              >
                <MenuItem value=''>Choose the print method</MenuItem>
                <MenuItem value='blank'>Blank</MenuItem>
                <MenuItem value='outside'>Outside</MenuItem>
                <MenuItem value='inside'>Inside</MenuItem>
                <MenuItem value='both'>Both Sides</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <div className={styles['sub-title']}>Finishing</div>
            <FormControl fullWidth className={styles['selector-box']}>
              <InputLabel id='finishing-label'>Choose the finishing</InputLabel>
              <Select
                labelId='finishing-label'
                value={finishing}
                onChange={(e) => setFinishing(e.target.value)}
              >
                <MenuItem value=''>Choose the finishing</MenuItem>
                <MenuItem value='blank'>Blank</MenuItem>
                <MenuItem value='gloss'>Gloss</MenuItem>
                <MenuItem value='matte'>Matte</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <div className={styles['sub-title']}>Quantity</div>
            <FormControl fullWidth className={styles['selector-box']}>
              <InputLabel id='quantity-label'>Choose the quantity</InputLabel>
              <Select
                labelId='quantity-label'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                <MenuItem value='500'>500</MenuItem>
                <MenuItem value='1000'>1000</MenuItem>
                <MenuItem value='2000'>2000</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ButtonGroup className={styles['btn-group']}>
            <Button
              className={`${styles['btn']} ${styles['btn-buy']}`}
              onClick={() => onBuyClick()}
            >
              {/* <div
      className={`${styles['pac-loading']} ${styles['small']} ${styles['white']}`}
    ></div> */}
              Add to Cart
            </Button>
            <Button
              className={`${styles['btn']} ${styles['design-btn']}`}
              data-pacdora-ui='design-btn'
              data-save-screenshot='false'
              data-screenshot-width='800'
              data-ui-tip='editor'
            >
              {/* <div
      className={`${styles['pac-loading']} ${styles['small']}`}
    ></div> */}
              Design online
            </Button>
          </ButtonGroup>
          <div
            className={styles['download-text']}
            data-pacdora-ui='download'
            data-app-key='Your app key'
            data-pacdora-id='download'
            data-ui-tip='download'
          >
            Download the Dieline
          </div>
        </div>
      </div>
      <div className={styles['description-box']}>
        <h2>Description of the product</h2>
        <div
          className={`${styles['description-info']} ${styles['mt30']}`}
          data-pacdora-ui='info-description'
        ></div>
        <div
          className={`${styles['description-info']} ${styles['mt30']}`}
          data-pacdora-ui='info-description'
        ></div>
        <div
          className={`${styles['description-info']} ${styles['mt30']}`}
          data-pacdora-ui='info-description'
        ></div>
      </div>
    </Container>
  );
};

export default PacdoraCustomizationCard;
