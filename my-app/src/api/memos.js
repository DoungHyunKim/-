import axios from 'axios';

// 전체 메모 조회
export const getMemos = async () => {
  const response = await axios.get('/');
  return response;
};

// 개별 메모 조회
export const getMemo = async (id) => {
  const response = await axios.get(`/memos/${id}`);
  return response.data;
};

// 메모 생성
export const createMemo = async (memoData) => {
  const response = await axios.post('/memos', {
    title: memoData.title,
    content: memoData.content
  });
  return response.data.post;
};

// 메모 수정
export const updateMemo = async (id, memoData) => {
  const response = await axios.put(`/memos/${id}`, {
    title: memoData.title,
    content: memoData.content
  });
  return response.data.post;
};

// 메모 삭제
export const deleteMemo = async (id) => {
  await axios.delete(`/memos/${id}`);
};