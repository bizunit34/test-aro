class SessionStorageService {
  public get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}

const SessionStorageServiceInstance: SessionStorageService = new SessionStorageService();

export default SessionStorageServiceInstance;
