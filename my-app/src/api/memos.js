import { API_BASE_URL } from './config';

export const getMemos = async () => {
  const response = await fetch(`${API_BASE_URL}/memos`);
  if (!response.ok) throw new Error('Failed to fetch memos');
  return response.json();
};

export const createMemo = async (memo) => {
  const response = await fetch(`${API_BASE_URL}/memos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memo),
  });
  if (!response.ok) throw new Error('Failed to create memo');
  return response.json();
};

export const updateMemo = async (id, memo) => {
  const response = await fetch(`${API_BASE_URL}/memos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memo),
  });
  if (!response.ok) throw new Error('Failed to update memo');
  return response.json();
};

export const deleteMemo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/memos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete memo');
};