import Button from '../../atoms/Button/Button';

const MemoCard = ({ memo, onEdit, onDelete }) => {
 const formatDate = (timestamp) => {
   const date = new Date(Number(timestamp));
   const options = {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
     hour12: true
   };
   
   return date.toLocaleString('ko-KR', options);
 };

 return (
   <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
     <h2 className="text-xl font-bold">{memo.title}</h2>
     <p className="mt-2 text-gray-600">{memo.content}</p>
     <div className="mt-4 flex justify-between items-center">
       <span className="text-sm text-gray-500">
         {formatDate(memo.id)}
         {memo.isEdited && <span className="ml-2">(수정됨)</span>}
       </span>
       <div className="space-x-2">
         <Button onClick={() => onEdit(memo)}>수정</Button>
         <Button variant="danger" onClick={() => onDelete(memo.id)}>삭제</Button>
       </div>
     </div>
   </div>
 );
};

export default MemoCard;