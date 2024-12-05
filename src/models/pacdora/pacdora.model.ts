export interface PacdoraModel {
  appId: 'string';
  init: (options: {
    userId: string;
    appId: string;
    isDelay: boolean;
    theme: string;
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
