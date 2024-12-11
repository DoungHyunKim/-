import { useState, useEffect } from 'react';
import { getMemos, createMemo, updateMemo, deleteMemo } from '../api/memos';

export const useMemos = () => {
  const [memos, setMemos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMemos = async () => {
    try {
      setIsLoading(true);
      const data = await getMemos();
      setMemos(data);
    } catch (err) {
      setError('메모를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const handleSubmit = async (memo, editingMemo) => {
    try {
      setIsLoading(true);
      if (editingMemo) {
        const updatedMemo = await updateMemo(editingMemo.id, {
          ...memo,
          isEdited: true,
        });
        setMemos(memos.map(m => m.id === editingMemo.id ? updatedMemo : m));
      } else {
        const newMemo = await createMemo({
          ...memo,
          isEdited: false,
        });
        setMemos([newMemo, ...memos]);
      }
    } catch (err) {
      setError('메모 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteMemo(id);
      setMemos(memos.filter(memo => memo.id !== id));
    } catch (err) {
      setError('메모 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    memos,
    error,
    isLoading,
    handleSubmit,
    handleDelete,
  };
};