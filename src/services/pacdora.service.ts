import { PacdoraModel } from '@/models';
import ApiTips from '@/models/pacdora/api-tips';

class PacdoraService {
  public Pacdora: PacdoraModel | undefined;

  public constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- This is added via script and thus cannot be tracked until here
    if (window.Pacdora != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.Pacdora = window.Pacdora;
    }
  }

  public static createPacdoraService(): PacdoraService {
    return new PacdoraService();
  }

  public getPacdora(): PacdoraModel | undefined {
    return this.Pacdora;
  }

  public async initializePacdora(): Promise<void> {
    if (this.Pacdora == null || process.env.PACDORA_API_ID == null) {
      console.error('There was an issue with loading the Pacdora script.');

      return;
    }

    await this.Pacdora.init({
      userId: undefined,
      appId: process.env.PACDORA_API_ID,
      isDelay: true,
      theme: '#333333',
      doneBtn: 'Save',
      localeResource: {
        'Upload & Design': 'Online design',
      },
    });
    const userInfo: Record<string, string | number> =
      await this.Pacdora.getUserInfo();
    console.log('user info:', userInfo);
  }

  public async createPacdoraProject(options: {
    id: number | undefined;
    modelId: number;
    templateId: number | undefined;
    isShowLoading?: boolean;
    doneBtn?: string;
  }): Promise<void> {
    if (this.Pacdora == null || process.env.PACDORA_API_ID == null) {
      console.error('There was an issue with loading the Pacdora script.');

      return;
    }

    const { id, modelId, templateId, isShowLoading, doneBtn } = options;
    await this.Pacdora.createScene({
      id: id,
      modelId: modelId,
      templateId,
      isShowLoading: isShowLoading ?? false,
      doneBtn: doneBtn ?? 'Save',
    });
  }

  public applyListeners(): void {
    // Listen for the event of `data-pacdora-ui="download"`
    this.Pacdora?.$on('download:start', () => {
      const downloadEle: HTMLElement | null =
        document.querySelector('.download-text');

      if (downloadEle == null) {
        return;
      }

      downloadEle.innerText = 'Downloading...';
    });
    this.Pacdora?.$on('download:success', () => {
      const downloadEle: HTMLElement | null =
        document.querySelector('.download-text');

      if (downloadEle == null) {
        return;
      }

      downloadEle.innerText = 'Download success';
      setTimeout(() => {
        downloadEle.innerText = 'Download the Dieline';
      }, 1000);
    });
    this.Pacdora?.$on('download:fail', () => {
      const downloadEle: HTMLElement | null =
        document.querySelector('.download-text');

      if (downloadEle == null) {
        return;
      }

      downloadEle.innerText = 'Download failed';
      setTimeout(() => {
        downloadEle.innerText = 'Download the Dieline';
      }, 1000);
    });

    // Listen for the callback event after the `data-pacdora-ui="design-btn"` component editor has successfully opened
    this.Pacdora?.$on('design:opened', () => {
      const sizeBox: HTMLElement | null = document.querySelector('.size-box');
      const materialBox: HTMLElement | null = document.querySelector(
        '.pacdora-material-box',
      );
      const recommendBox: HTMLElement | null = document.querySelector(
        '.recommend-color-root',
      );
      const saveBtn: HTMLElement | null = document.querySelector('.save-btn');
      const watermark: HTMLElement | null =
        document.querySelector('.pacdora-watermark');
      const designHeader: HTMLElement | null =
        document.querySelector('.design-body');

      if (sizeBox != null) {
        sizeBox.dataset.uiTip = 'editor-size';
        sizeBox.dataset.position = 'right';
      }

      if (materialBox != null) {
        materialBox.dataset.uiTip = 'editor-material';
        materialBox.dataset.position = 'right';
      }

      if (recommendBox != null) {
        recommendBox.dataset.uiTip = 'editor-recommend';
        recommendBox.dataset.position = 'right';
      }

      if (saveBtn != null) {
        saveBtn.dataset.uiTip = 'editor-save';
      }

      if (watermark != null) {
        watermark.dataset.uiTip = 'editor-white-label';
      }

      if (designHeader != null) {
        designHeader.dataset.uiTip = 'locale';
        designHeader.dataset.position = 'bottom';
      }

      const tipEles = [
        sizeBox,
        materialBox,
        recommendBox,
        saveBtn,
        watermark,
        designHeader,
      ];

      for (let i = 0; i < tipEles.length; i++) {
        const ele: HTMLElement | null = tipEles[i];

        if (ele == null) {
          continue;
        }

        const style = getComputedStyle(ele);

        if (style.position !== 'absolute' && style.position !== 'fixed') {
          ele.style.position = 'relative';
        }

        const tipUIEle = document.createElement('div');
        tipUIEle.className = 'api-tip';
        tipUIEle.style.left = '-20px';
        tipUIEle.style.top = '0px';
        const tipInner = document.createElement('div');
        tipInner.className = 'api-tip-inner';
        tipUIEle.appendChild(tipInner);
        ele.appendChild(tipUIEle);

        if (ele === designHeader) {
          tipUIEle.style.left = '10px';
          tipUIEle.style.top = '-24px';
          tipUIEle.style.zIndex = '9999';
        }
        tipUIEle.onclick = (e): void => {
          e.stopPropagation();
          this.showApiTip(ele.dataset.uiTip);
        };
        tipUIEle.onmouseenter = (e): void => {
          e.stopPropagation();
          e.preventDefault();
          this.showApiToast(tipUIEle, ele.dataset.uiTip, true);
        };
        tipUIEle.onmouseleave = (): void => {
          this.showApiToast(tipUIEle, ele.dataset.uiTip, false);
        };
      }
    });
  }

  public showApiToast(
    ele: HTMLElement,
    tipName: string | undefined,
    bool: boolean,
  ): void {
    if (bool) {
      let toastEle: HTMLElement | null = ele.querySelector('.toast');

      if (toastEle == null && tipName != null) {
        toastEle = document.createElement('div');
        toastEle.className = 'toast';
        const tips = ApiTips[tipName];
        toastEle.innerHTML = `Check the API of ${tips['name']}`;

        if (ele.parentNode.dataset.position === 'bottom') {
          toastEle.className = 'toast bottom';
        } else if (ele.parentNode.dataset.position === 'right') {
          toastEle.className = 'toast right';
        }

        ele.appendChild(toastEle);
      }
    } else {
      const toastEle = ele.querySelector('.toast');
      toastEle.parentNode?.removeChild(toastEle);
    }
  }

  public showApiTip(tipName): void {
    const dialog = document.createElement('div');
    Object.assign(dialog.style, {
      width: '50%',
      left: '0',
      top: '50%',
      right: '0',
      transform: 'translateY(-50%)',
      maxHeight: '80%',
      margin: 'auto',
      borderRadius: '24px',
      position: 'fixed',
      zIndex: 9999999999,
      padding: '32px',
      background: '#fff',
    });
    dialog.className = 'api-tip-dialog';
    const mask = document.createElement('div');
    mask.style.zIndex = 999999998;
    mask.className = 'mask';
    document.body.appendChild(dialog);
    document.body.appendChild(mask);
    const tips = ApiTips[tipName].tips;
    let targetHtml = '';

    if (tips) {
      for (let i = 0; i < tips.length; i++) {
        const tip = tips[i];
        let content = '';

        for (let j = 0; j < tip.content.length; j++) {
          switch (tip.content[j].type) {
            case 'p':
              content += `<p>${tip.content[j].value}</p>`;
              break;
            case 'code':
              content += `<pre><code class="${
                tip.content[j].codeLang ?? 'language-html'
              }">${tip.content[j].value
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')}</code></pre>`;
              break;
            case 'image':
              content += `<img src="${tip.content[j].value}"/>`;
              break;
          }
        }
        targetHtml += `
        <div class="tip-title">${tip.title} </div>
        <div class="tip-content">
          ${content}
        </div>
      `;
      }
    }

    dialog.innerHTML = `
    <div class="api-dialog-title">
      Related API for this Feature
      <i class="iconfont icon-ico-qingkong" onclick="onCloseTipDialog()"></i>
    </div>
    <div class="api-dialog-content">
      ${targetHtml}
    </div>
  `;

    hljs.highlightAll();
  }
}

export default PacdoraService;
