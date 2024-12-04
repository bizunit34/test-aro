import { Container, SelectChangeEvent } from '@mui/material';
import React from 'react';

import { Item } from '@/models';

const PRICE_CONFIG: Record<string, Array<SimpleQuotationItem>> = {
  paper: [
    {
      name: 'White card board',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 1.5,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
    {
      name: 'E-flute paper',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 2.6,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
    {
      name: 'B-flute paper',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 2.9,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
    {
      name: 'Kraft paper',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 1.2,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
  ],
  print: [
    {
      name: 'default',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.5,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
  ],
  surface: [
    {
      name: 'blank',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
    {
      name: 'gloss',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.35,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
    {
      name: 'matte',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.3,
          unit: 'm',
          minFee: 0,
        },
      ],
    },
  ],
  cut: [
    {
      name: 'default',
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.1,
          unit: '',
          minFee: 0,
        },
      ],
    },
  ],
};

interface ItemDetailsProps {
  item: Item;
}

class RangeItem {
  public minCount: number;
  public maxCount: number;
  public minFee: number;
  public price: number;
  public unit: string;
  constructor(
    minCount: number,
    maxCount: number,
    minFee: number,
    price: number,
    unit: string,
  ) {
    this.minCount = minCount;
    this.maxCount = maxCount;
    this.minFee = minFee;
    this.price = price;
    this.unit = unit;
  }
}

class CalcResultItem {
  public name: string;
  public mode: string;
  public count: number;
  public minFee: number;
  public price: number;
  public unit: number;
  public fee: number;
  constructor(
    name: string,
    mode: string,
    count: number,
    minFee: number,
    price: number,
    unit: number,
    fee: number,
  ) {
    this.name = name;
    this.mode = mode;
    this.count = count;
    this.minFee = minFee;
    this.price = price;
    this.unit = unit;
    this.fee = fee;
  }
}

class CalcResult {
  public fee: number;
  public list: unknown;
  constructor(fee: number, list: unknown) {
    this.fee = fee;
    this.list = list;
  }
}

interface SimpleQuotationItem {
  name: string;
  range: Array<RangeItem>;
}

interface Params {
  count: number;
  knifeX: number;
  knifeY: number;
  printName: string;
  printSide: number;
  paperName: string;
  surfaceName: string;
  cutName: string;
}

class SimpleQuotation {
  public config: Record<string, Array<SimpleQuotationItem>>;
  public params?: Params;
  constructor(config: Record<string, Array<SimpleQuotationItem>>) {
    this.config = config;
  }

  makeQuotation(params: Params) {
    this.params = params;
    const resItems = [
      this.feePaper(),
      this.feePrint(),
      this.feeSurface(),
      this.feeCut(),
    ];
    const totalFee = resItems.reduce(
      (total, item) => total + (item?.fee ?? 0),
      0,
    );

    return new CalcResult(totalFee, resItems);
  }

  getQuotationConfig(
    type: string,
    name: string,
    count: number,
  ): RangeItem | undefined {
    const cfg: Array<SimpleQuotationItem> = this.config?.[type];
    if (!cfg) throw new Error();
    const c = cfg.find((item) => item.name === name);
    if (!c) throw new Error();
    let config: RangeItem | undefined;
    for (const r of c.range) {
      if (r.minCount <= count && r.maxCount > count) {
        config = r;
      }
    }

    return config;
  }

  makeQuotationByArea(
    { area, count }: { area: number; count: number },
    config: RangeItem | undefined,
  ) {
    if (config == null) {
      return;
    }

    const fee = Math.max(area * config.price * count, config.minFee || 0);

    return new CalcResultItem(
      config.name,
      'area',
      count,
      config.minFee,
      config.price,
      config.unit,
      fee,
    );
  }

  makeQuotationByCount(
    { count }: { count: number },
    config: CalcResultItem | RangeItem | undefined,
  ) {
    if (config == null) {
      return;
    }

    const fee = Math.max(config.price * count, config.minFee || 0);

    return new CalcResultItem(
      config.name,
      'count',
      count,
      config.minFee,
      config.price,
      config.unit,
      fee,
    );
  }

  feePaper() {
    if (this.params == null) {
      return;
    }

    const { count, knifeX, knifeY, paperName } = this.params;
    const cfg: RangeItem | undefined = this.getQuotationConfig(
      'paper',
      paperName,
      count,
    );

    return this.makeQuotationByArea(
      { area: (knifeX * knifeY) / 1e6, count },
      cfg,
    );
  }

  feePrint() {
    if (this.params == null) {
      return;
    }

    const { count, knifeX, knifeY, printName, printSide } = this.params;
    const cfg = this.getQuotationConfig('print', printName, count);

    return this.makeQuotationByArea(
      { area: (knifeX * knifeY) / 1e6, count: count * printSide },
      cfg,
    );
  }

  feeSurface() {
    if (this.params == null) {
      return;
    }

    const { count, knifeX, knifeY, surfaceName } = this.params;
    const cfg = this.getQuotationConfig('surface', surfaceName, count);

    return this.makeQuotationByArea(
      { area: (knifeX * knifeY) / 1e6, count },
      cfg,
    );
  }

  feeCut() {
    if (this.params == null) {
      return;
    }

    const { count, cutName = 'default' } = this.params;
    const cfg: RangeItem | undefined = this.getQuotationConfig(
      'cut',
      cutName,
      count,
    );

    return this.makeQuotationByCount({ count }, cfg);
  }
}

function getQueryValue(queryName: string) {
  const paramsString = window.location.search.substring(1);
  const params = new URLSearchParams(paramsString);

  return params.get(queryName);
}

function makeQuotationForBox() {
  const dimension: HTMLInputElement | null =
    document.querySelector('#dimension');
  const material: HTMLInputElement | null = document.querySelector('#material');
  const print: HTMLInputElement | null = document.querySelector('#print');
  const finishing: HTMLInputElement | null =
    document.querySelector('#finishing');
  const number: HTMLInputElement | null = document.querySelector('#number');

  if (
    !dimension?.value ||
    !material?.value ||
    !print?.value ||
    !finishing?.value ||
    !number?.value
  ) {
    return;
  }

  const sizes = dimension.value.split('*');
  const length = Number(sizes[0]);
  const width = Number(sizes[1]);
  const height = Number(sizes[2]);

  const knifeX = 2 * (length + width);
  const knifeY = height + 2 * width;

  const quotation = new SimpleQuotation(PRICE_CONFIG);
  let faces = 0;
  if (print.value === 'inside' || print.value === 'outside') {
    faces = 1;
  } else if (print.value === 'both') {
    faces = 2;
  }

  const result = quotation.makeQuotation({
    count: Number(number.value),
    knifeX: knifeX,
    knifeY: knifeY,
    paperName: material.value,
    printName: 'default',
    printSide: faces,
    surfaceName: finishing.value,
    cutName: 'default',
  });
  if (result) {
    const price: Element | null = document.querySelector('#price-box');

    if (price == null) {
      return;
    }

    price.innerHTML = '$' + result.fee.toFixed(1);
    price.innerHTML = `
      <span class="price-text">Total:</span>
      <span class="price-total">$${result.fee.toFixed(1)} </span>
      <span class="price-unit">($${(result.fee / Number(number.value)).toFixed(
        2,
      )} / unit)</span>
      `;
    console.log('quotation:', result.fee.toFixed(2));
  }
}

function makeQuotationForMockup() {
  const number: HTMLInputElement | null = document.querySelector('#number');

  if (!number?.value) {
    return;
  }

  const fee = 3 * Number(number.value);

  const price: HTMLInputElement | null = document.querySelector('#price-box');

  if (price == null) {
    return;
  }

  price.innerHTML = '$' + fee.toFixed(1);
  price.innerHTML = `
    <span class="price-text">Total:</span>
    <span class="price-total">$${fee.toFixed(1)} </span>
    `;
}

function allowMakeQuotation() {
  const modelId = getQueryValue('modelId');
  if (!isNumber(modelId) || Number(modelId) >= 400000) {
    return false;
  }

  return true;
}

function makeQuotation() {
  if (allowMakeQuotation()) {
    return makeQuotationForBox();
  } else {
    return makeQuotationForMockup();
  }
}

// Transition animation method for the slide switch component
function onSwitch2DAnd3D(type: string) {
  const switchItems = document.querySelectorAll('.switch-item');
  const boxInfo: HTMLInputElement | null =
    document.querySelector('.box-info-slider');
  if (type === '3d') {
    switchItems[0].className = 'switch-item active';
    switchItems[1].className = 'switch-item';
    switchItems[2].className = 'switch-item';

    if (boxInfo != null) {
      boxInfo.style.transform = 'translateX(0)';
    }
  } else if (type === 'dieline') {
    switchItems[0].className = 'switch-item';
    switchItems[1].className = 'switch-item active';
    switchItems[2].className = 'switch-item';

    if (boxInfo != null) {
      boxInfo.style.transform = 'translateX(-100%)';
    }
  } else {
    switchItems[0].className = 'switch-item';
    switchItems[1].className = 'switch-item';
    switchItems[2].className = 'switch-item active';

    if (boxInfo != null) {
      boxInfo.style.transform = 'translateX(-200%)';
    }
  }
}

function openPacdora(ratio: number) {
  Pacdora.collapse('d3', ratio);
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

// Control methods for the Slider component
function onSliderDown(e: React.PointerEvent<HTMLDivElement>) {
  const parentBounding = (
    e as unknown as HTMLElement
  ).parentNode?.getBoundingClientRect();
  document.onpointermove = (ev) => {
    ev.preventDefault();
    const { clientX } = ev;
    const len = clientX - parentBounding.left;
    let ratio = len / parentBounding.width;
    if (ratio < 0) {
      ratio = 0;
    }
    if (ratio > 1) {
      ratio = 1;
    }
    Pacdora.collapse('d3', ratio);
    e.style.left = `${ratio * 100}%`;
    const selected = e.parentNode.querySelector('.slider-selecter');
    selected.style.width = `${ratio * 100}%`;
  };
  document.onpointerup = () => {
    document.onpointermove = null;
    document.onpointerup = null;
  };
}

/**
 * The callback function triggered by the dimension change event
 * updates the project via the Pacdora.setSize method.
 * @param {*} e
 * @returns
 */
function onChangeDimension(e: React.ChangeEvent<HTMLSelectElement>) {
  let value = e.value;
  if (value === '') {
    return;
  }

  if (value === 'customize') {
    const number = prompt(
      'Please input your dimension in the format of 315*202*62',
      '315*202*62',
    );
    const sizes = number.split('*');
    if (sizes.length !== 3) {
      return;
    }

    const length = Number(sizes[0]);
    const width = Number(sizes[1]);
    const height = Number(sizes[2]);
    if (!isNumber(length) || !isNumber(width) || !isNumber(height)) {
      e.selectedIndex = 0;

      return;
    }

    const newOption = document.createElement('option');
    newOption.value = number;
    newOption.text = number + 'mm';

    e.add(newOption, e.options[1]);
    e.selectedIndex = 1;
    value = number;
  }

  const size = value.split('*');
  Pacdora.setSize({
    length: Number(size[0]),
    width: Number(size[1]),
    height: Number(size[2]),
    async: true,
  });
  makeQuotation();
}

/**
 * The callback function triggered by the Material change event
 * updates the project via the Pacdora.setMaterial method.
 * @param {*} e
 */
function onChangeMaterial(e: React.ChangeEvent<HTMLSelectElement>) {
  const value = e.value;
  if (value !== '') {
    switch (value) {
      case 'White card board':
        Pacdora.setMaterial({
          name: 'White card board',
          image:
            '//cdn.pacdora.com/science/image/94e8078a-9931-42cd-97ed-57883bd88085.png',
          async: true,
        });
        break;
      case 'E-flute paper':
        Pacdora.setMaterial({
          name: 'E-flute paper',
          image:
            '//cdn.pacdora.com/science/image/00e45c0b-9cf7-4d39-bdc8-82bb202909d9.png',
          async: true,
        });
        break;
      case 'Kraft paper':
        Pacdora.setMaterial({
          name: 'Kraft paper',
          image: '//cdn.pacdora.com/science/image/material_kraft.png',
          async: true,
        });
        break;
    }
  }
  makeQuotation();
}

/**
 * The callback function triggered by the Thickness change event
 * updates the project via the Pacdora.setThickness method.
 * @param {*} e
 */
function onChangeThickness(e: React.ChangeEvent<HTMLSelectElement>) {
  const value = e.value;
  if (value !== '') {
    Pacdora.setThickness({
      value: Number(value),
      async: true,
    });
  }
  makeQuotation();
}

function onChangePrint(e: React.ChangeEvent<HTMLSelectElement>) {
  makeQuotation();
}

function onChangeFinishing(e: React.ChangeEvent<HTMLSelectElement>) {
  makeQuotation();
}

function onChangeNumber(e: React.ChangeEvent<HTMLSelectElement>) {
  const value = e.value;
  if (value === 'customize') {
    const number = prompt('Please input your number');
    if (!isNumber(number) || !number) {
      e.selectedIndex = 0;

      return;
    }

    const newOption = document.createElement('option');
    newOption.value = number;
    newOption.text = number;

    e.add(newOption, e.options[1]);
    e.selectedIndex = 1;
  }

  makeQuotation();
}

function onBuyClick() {
  makeQuotation();
  const message = document.querySelector('.toast-message');
  if (message) {
    message.className = 'toast-message active';
    setTimeout(() => {
      message.className = 'toast-message';
    }, 2000);
  }
}

function onStep(count: number): void {
  if (document.getElementById('count')?.innerText == null) {
    return;
  }

  const cur: number = Number(document.getElementById('count').innerText);

  if (cur + count <= 0) {
    return;
  }

  document.getElementById('count').innerText = cur + count;
}

function isNumber(content: unknown) {
  return !isNaN(content);
}

const ItemDetails: React.FC<ItemDetailsProps> = (
  {
    //   item,
  },
) => {
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <div className='box-info'>
        <div className='left'>
          <div className='box-info-slider'>
            <div className='box-info-item active'>
              {/* <!-- 3D box expansion and collapse control component start --> */}
              <div
                className='collapse-control'
                data-ui-tip='collapse'
                data-position='bottom'
              >
                <div onClick={() => openPacdora(0)}>Open</div>
                <div className='slider-box'>
                  <div className='slider-selecter'></div>
                  <div
                    className='pointer'
                    onPointerDown={(e: React.PointerEvent<HTMLDivElement>) =>
                      onSliderDown(e)
                    }
                  ></div>
                </div>
                <div onClick={() => openPacdora(1)}>Close</div>
              </div>
              {/* <!-- 3D box expansion and collapse control component end --> */}

              {/* <!-- Pacdora component data-pacdora-ui="3d" start --> */}
              <div
                className='d3'
                data-pacdora-ui='3d'
                data-pacdora-id='d3'
                data-init-rotation='true'
              ></div>
              {/* <!-- Pacdora component data-pacdora-ui="3d" end --> */}
            </div>
            {/* <!-- Pacdora component data-pacdora-ui="dieline" start --> */}
            <div className='box-info-item' data-tip-position='center'>
              <div className='dieline' data-pacdora-ui='dieline'></div>
            </div>
            {/* <!-- Pacdora component data-pacdora-ui="dieline" end --> */}

            {/* <!-- Pacdora-component data-pacdora-ui="3d-preview" start --> */}
            <div className='box-info-item' data-tip-position='center'>
              <div data-pacdora-ui='3d-preview' className='preview'></div>
            </div>
            {/* <!-- Pacdora-component data-pacdora-ui="3d-preview" end --> */}
          </div>

          {/* <!-- Slide Switch Component --> */}
          <div className='d3-and-d2-switch' data-ui-tip='switch'>
            <div
              className='switch-item active'
              onClick={() => onSwitch2DAnd3D('3d')}
            >
              3D
            </div>
            <div
              className='switch-item'
              onClick={() => onSwitch2DAnd3D('dieline')}
            >
              Dieline
            </div>
            <div className='switch-item' onClick={() => onSwitch2DAnd3D('2d')}>
              2D
            </div>
          </div>
          {/* <!-- Slide Switch Component end --> */}
          <div className='pac-loading crop-parent'></div>
        </div>
        <div className='right'>
          <div className='sub-title' data-ui-tip='dimension'>
            Dimension
          </div>
          <div className='selector-box'>
            <select onChange={(e) => onChangeDimension(e)} id='dimension'>
              <option value=''>Choose the dimension</option>
              <option value='315*202*62'>315*202*62mm</option>
              <option value='150*100*50'>150*100*50mm</option>
              <option value='360*240*40'>360*240*40mm</option>
              <option value='customize'>Customize</option>
            </select>
          </div>
          <div className='sub-title mt30' data-ui-tip='material'>
            Material
          </div>
          <div className='selector-box'>
            <select onChange={(e) => onChangeMaterial(e)} id='material'>
              <option value=''>Choose the material</option>
              <option value='White card board'>White card board</option>
              <option value='E-flute paper'>E-flute paper</option>
              <option value='Kraft paper'>Dark kraft paper</option>
            </select>
          </div>
          <div className='sub-title mt30' data-ui-tip='thickness'>
            Thickness
          </div>
          <div className='selector-box'>
            <select onChange={(e) => onChangeThickness(e)} id='thickness'>
              <option value=''>Choose the thickness</option>
              <option value='1.5'>1.5mm</option>
              <option value='1'>1mm</option>
              <option value='2'>2mm</option>
            </select>
          </div>

          <div className='flex-between' id='quotation-selects'>
            <div className='flex1'>
              <div className='sub-title mt30'>Print</div>
              <div className='selector-box'>
                <select onChange={(e) => onChangePrint(e)} id='print'>
                  <option value=''>Choose the print method</option>
                  <option value='blank'>Blank</option>
                  <option value='outside' selected={true}>
                    Outside
                  </option>
                  <option value='inside'>Inside</option>
                  <option value='both'>Both Sides</option>
                </select>
              </div>
            </div>

            <div className='flex1 ml20'>
              <div className='sub-title mt30'>Finishing</div>
              <div className='selector-box'>
                <select onChange={(e) => onChangeFinishing(e)} id='finishing'>
                  <option value=''>Choose the Finishing</option>
                  <option value='blank'>Blank</option>
                  <option value='gloss' selected={true}>
                    Gloss
                  </option>
                  <option value='matte'>Matte</option>
                </select>
              </div>
            </div>
          </div>

          <div className='flex-between flex-end'>
            {/* <!-- <div className="ml-auto number-box">
                  <div className="number-control" onClick={() => onStep(-1)}>-</div>
                  <div id="count">1</div>
                  <div className="number-control" onClick={() => onStep(1)}>+</div>
                </div> --> */}

            <div>
              <div className='sub-title mt30'>Quantity</div>
              <div className='selector-box'>
                <select onChange={(e) => onChangeNumber(e)} id='number'>
                  <option value='500' selected={true}>
                    500
                  </option>
                  <option value='1000'>1000</option>
                  <option value='2000'>2000</option>
                  <option value='customize'>Customize</option>
                </select>
              </div>
            </div>

            <div className='price-box mt30' id='price-box'>
              {/* <!-- <span className="price-unit">$1.22 / unit</span> -->
                  <!-- <span className="price-text">Total:</span> -->
                  <!-- <span className="price-total">$200</span> --> */}
            </div>
          </div>
          <div className='btn-group'>
            <div className='btn btn-buy' onClick={() => onBuyClick()}>
              <div className='pac-loading small white'></div>
              Buy
            </div>
            <div
              className='btn design-btn'
              data-pacdora-ui='design-btn'
              data-save-screenshot='false'
              data-screenshot-width='800'
              data-ui-tip='editor'
            >
              <div className='pac-loading small'></div>
              Design online
            </div>
          </div>
          <div
            className='download-text'
            data-pacdora-ui='download'
            data-app-key='Your app key'
            data-pacdora-id='download'
            data-ui-tip='download'
          >
            Download the Dieline
          </div>
        </div>
      </div>
      <div className='description-box'>
        <h2>Description of the product</h2>
        <div
          className='description-info mt30'
          data-pacdora-ui='info-description'
        ></div>
        <div
          className='description-info mt30'
          data-pacdora-ui='info-description'
        ></div>
        <div
          className='description-info mt30'
          data-pacdora-ui='info-description'
        ></div>
      </div>
    </Container>
  );
};

export default ItemDetails;
