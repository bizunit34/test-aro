export interface Pacdora {
  appId: 'string';
  init: () => Promise<number>;
  isInit: () => Promise<boolean>;
  isShowSave: string;
  locale: string;
  userInfo: Record<string, unknown>;
}
