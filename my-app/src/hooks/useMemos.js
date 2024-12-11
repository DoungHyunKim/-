import { useState, useEffect } from 'react';
import { getMemos, createMemo, updateMemo, deleteMemo } from '../api/memos';

export const useMemos = () => {
 const [memos, setMemos] = useState([]);
 const [error, setError] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

 const fetchMemos = async () => {
  try {
    setIsLoading(true);
    const response = await getMemos();
    
    if (!response || !Array.isArray(response)) {
      setMemos([]);
    } else {
      setMemos(response);
    }
    setError(null);  // 성공적으로 데이터를 받아왔으므로 에러는 null로

  } catch (err) {
    console.error('에러:', err);
    setError('서버 오류가 발생했습니다');
    setMemos([]);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);  // 3초 후 에러 메시지 제거

    return () => clearTimeout(timer);  // 클린업 함수
  }
}, [error]);

 const handleSubmit = async (memo, editingMemo) => {
   try {
     setIsLoading(true);
     if (editingMemo) {
       const updatedMemo = await updateMemo(editingMemo.id, {
         title: memo.title,
         content: memo.content
       });
       setMemos(memos.map(m => m.id === editingMemo.id ? updatedMemo.post : m));
     } else {
       const newMemo = await createMemo({
         title: memo.title,
         content: memo.content
       });
       setMemos([newMemo.post, ...memos]);
     }
     setError(null);
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
     setError(null);
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