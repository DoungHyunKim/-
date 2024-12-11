import React, { useState } from 'react';
import { useMemos } from '../../../hooks/useMemos';
import Logo from '../../atoms/Logo/Logo';
import Button from '../../atoms/Button/Button';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import MemoCard from '../../organisms/MemoCard/MemoCard';
import MemoForm from '../../organisms/MemoForm/MemoForm';
import Modal from '../../molecules/Modal/Modal';

const MemoTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState(null);
  const { memos, error, isLoading, handleSubmit, handleDelete } = useMemos();

  const onSubmit = (memo) => {
    handleSubmit(memo, editingMemo);
    setIsModalOpen(false);
    setEditingMemo(null);
  };

  const handleEdit = (memo) => {
    setEditingMemo(memo);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4">
      {error && <ErrorMessage message={error} />}
      {isLoading && <LoadingSpinner />}
      <div className="flex justify-between items-center py-4">
        <Logo />
        <Button onClick={() => setIsModalOpen(true)}>정글을 향해 소리치기</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {memos.map(memo => (
          <MemoCard
            key={memo.id}
            memo={memo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <MemoForm
            onSubmit={onSubmit}
            initialValues={editingMemo}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default MemoTemplate;