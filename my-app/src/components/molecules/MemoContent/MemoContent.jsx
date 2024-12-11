const MemoContent = ({ title, content, timestamp }) => (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">{content}</p>
      <span className="text-sm text-gray-500">{timestamp}</span>
    </div>
  );
  export default MemoContent;