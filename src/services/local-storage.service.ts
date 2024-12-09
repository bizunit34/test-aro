class LocalStorageService {
  public get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}

const LocalStorageServiceInstance: LocalStorageService =
  new LocalStorageService();

export default LocalStorageServiceInstance;
