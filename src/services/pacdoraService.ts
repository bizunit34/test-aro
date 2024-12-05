import { Pacdora } from '@/models/pacdora/pacdora';

class PacdoraService {
  private _pacdoraServiceSingleton: PacdoraService | undefined;
  public Pacdora: Pacdora | undefined;

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

  public getPacdora(): Pacdora | undefined {
    return this.Pacdora;
  }
}

export default PacdoraService;
