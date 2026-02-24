import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiGet, apiPost, setAuthToken, configureApi, ApiError } from '../api/apiClient';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  configureApi('https://api.example.com');
  setAuthToken(null);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('apiGet', () => {
  it('makes a GET request to the correct URL', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '1', name: 'Alice' }),
    });

    const result = await apiGet('/users/1');

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users/1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toEqual({ id: '1', name: 'Alice' });
  });

  it('includes Authorization header when token is set', async () => {
    setAuthToken('my-token');
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await apiGet('/me');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/me',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer my-token',
        }),
      }),
    );
  });

  it('throws ApiError on non-OK response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const error = await apiGet('/users/999').catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(404);
  });
});

describe('apiPost', () => {
  it('makes a POST request with JSON body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: '1' }, token: 'abc' }),
    });

    const body = { email: 'a@b.com', password: 'pw' };
    const result = await apiPost('/auth/login', body);

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    expect(result).toEqual({ user: { id: '1' }, token: 'abc' });
  });

  it('throws ApiError on non-OK response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    const error = await apiPost('/auth/login', {}).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(401);
  });
});
