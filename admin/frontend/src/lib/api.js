// API client for ArchiveX admin backend.
// Centralizes fetch logic, JWT injection, error handling, and base URL.

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

function getToken() {
  return localStorage.getItem('archiveX_token');
}

async function request(path, options = {}) {
  const headers = {
    Accept: 'application/json',
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Try to parse JSON; if empty, use empty object
  let data = null;
  const text = await response.text();
  data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const err = new Error(data?.message || `Request failed with status ${response.status}`);
    err.status = response.status;
    err.errors = data?.errors;
    throw err;
  }

  return data;
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),

  // For multipart form data uploads (PDFs) — caller sets FormData
  upload: (path, formData) => request(path, { method: 'POST', body: formData }),
};

export default api;
