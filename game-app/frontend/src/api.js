// Same-origin session cookies and CSRF; no tokens in local storage.
async function request(path, options = {}) {
  const response = await fetch(path, { credentials: 'same-origin', ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(response.status === 401 ? 'Please sign in again, then retry.' : data.error || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return data;
}
async function post(path, data, userId) {
  const session = await request('/api/csrf');
  if (userId !== undefined && session.user_id !== userId) throw new Error('Account changed. Sign back into the original account to save this run.');
  return request(path, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRFToken': session.csrf_token }, body: JSON.stringify(data) });
}
export async function startRun() {
  const session = await request('/api/csrf');
  const ticket = await post('/api/runs', { restart: true }, session.user_id);
  return { ...ticket, userId: session.user_id };
}
export async function saveRun(ticket, result) {
  try {
    return await post(`/api/runs/${ticket.id}/complete`, result, ticket.userId);
  } catch (error) {
    if (error.status !== 409) throw error;
    // A lost response/retry may find the result already committed. Verify it.
    const saved = await request(`/api/runs/${ticket.id}`);
    if (saved.completed_at === null || saved.score !== result.score) throw new Error('This run already has a different result. Open My results.');
    return saved;
  }
}
