export interface PlatformStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

const inMemoryStorage = new Map<string, string>();

const memoryStorage: PlatformStorage = {
  getItem: (key) => inMemoryStorage.get(key) ?? null,
  setItem: (key, value) => { inMemoryStorage.set(key, value); },
  removeItem: (key) => { inMemoryStorage.delete(key); },
};

let _storage: PlatformStorage = memoryStorage;

export const configureStorage = (storage: PlatformStorage) => {
  _storage = storage;
};

export const getConfiguredStorage = (): PlatformStorage => _storage;
