export interface PacdoraModel {
  $on: (element: string, callback: () => void) => void;
  appId: 'string';
  createScene: (options: {
    id: number | undefined;
    modelId: number;
    templateId: number | undefined;
    isShowLoading?: boolean;
    doneBtn?: string;
  }) => Promise<number>;
  init: (options: {
    userId?: string;
    appId: string;
    isDelay: boolean;
    theme: string;
    doneBtn: string;
    localeResource: Record<string, string>;
  }) => Promise<number>;
  isInit: () => Promise<boolean>;
  isShowSave: string;
  locale: string;
  userInfo: Record<string, unknown>;
  collapse: (id: string, ratio: number) => void;
  getUserInfo: () => Promise<Record<string, string | number>>;
  setMaterial: (options: {
    name: string;
    image: string;
    async: boolean;
  }) => void;
  setSize: (options: {
    length: number;
    width: number;
    height: number;
    async: boolean;
  }) => void;
  setThickness: (options: { value: number; async: boolean }) => void;
}
