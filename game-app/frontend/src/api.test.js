import { afterEach, expect, it, vi } from 'vitest';
import { saveRun } from './api.js';
const ticket = { id: 'run-1', userId: 1 };
const result = { score: 75, elapsed_seconds: 5, reason: 'collision' };
const response = (status, data) => ({ ok: status < 400, status, json: async () => data });
afterEach(() => vi.unstubAllGlobals());

it('recovers a previously saved result after a lost response without submitting a new run', async () => {
  const fetch = vi.fn()
    .mockResolvedValueOnce(response(200, { csrf_token: 'token', user_id: 1 }))
    .mockResolvedValueOnce(response(409, { error: 'Run already completed' }))
    .mockResolvedValueOnce(response(200, { id: 'run-1', score: 75, completed_at: 123 }));
  vi.stubGlobal('fetch', fetch);
  expect((await saveRun(ticket, result)).score).toBe(75);
  expect(fetch.mock.calls.map(call => call[0])).toEqual(['/api/csrf', '/api/runs/run-1/complete', '/api/runs/run-1']);
});

it('does not submit an old run under a different signed-in account', async () => {
  const fetch = vi.fn().mockResolvedValue(response(200, { csrf_token: 'token', user_id: 2 }));
  vi.stubGlobal('fetch', fetch);
  await expect(saveRun(ticket, result)).rejects.toThrow('Account changed');
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('shows unauthorized and conflicting-result failures instead of claiming a save', async () => {
  const fetch = vi.fn().mockResolvedValueOnce(response(401, {}));
  vi.stubGlobal('fetch', fetch);
  await expect(saveRun(ticket, result)).rejects.toThrow('sign in again');
  fetch.mockResolvedValueOnce(response(200, { csrf_token: 'token', user_id: 1 }))
    .mockResolvedValueOnce(response(409, {}))
    .mockResolvedValueOnce(response(200, { completed_at: 123, score: 99 }));
  await expect(saveRun(ticket, result)).rejects.toThrow('different result');
});
