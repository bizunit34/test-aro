import { PacdoraModel } from '@/models';

class PacdoraService {
  private _pacdoraServiceSingleton: PacdoraService | undefined;
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

  public async initializePacdora(): Promise<void> {
    if (this.Pacdora == null) {
      console.error('There was an issue with loading the Pacdora script.');

      return;
    }

    await this.Pacdora.init({
      userId: 'Your customer ID',
      appId: 'Your app ID',
      isDelay: true,
      theme: '#3300FF',
    });
    const userInfo: Record<string, string | number> =
      await this.Pacdora.getUserInfo();
    console.log('user info:', userInfo);
  }

  public getPacdora(): PacdoraModel | undefined {
    return this.Pacdora;
  }
}

export default PacdoraService;
