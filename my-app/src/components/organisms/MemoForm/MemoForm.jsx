import { useState, useEffect } from 'react';
import Button from '../../atoms/Button/Button';

const MemoForm = ({ onSubmit, initialValues, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setContent(initialValues.content);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="정글을 향해 소리쳐!"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button type="submit">
          소리쳐!
        </Button>
      </div>
    </form>
  );
};

export default MemoForm;