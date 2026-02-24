let _baseUrl = '';
let _authToken: string | null = null;

export const configureApi = (baseUrl: string) => {
  _baseUrl = baseUrl;
};

export const setAuthToken = (token: string | null) => {
  _authToken = token;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const buildHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (_authToken) {
    headers['Authorization'] = `Bearer ${_authToken}`;
  }
  return headers;
};

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${_baseUrl}${path}`, {
    method: 'GET',
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw new ApiError(response.status, `GET ${path} failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${_baseUrl}${path}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(response.status, `POST ${path} failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
