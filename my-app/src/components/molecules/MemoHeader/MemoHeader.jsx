import Button from '../../atoms/Button/Button';
import Logo from '../../atoms/Logo/Logo';

const MemoHeader = ({ onPostClick }) => (
  <div className="flex justify-between items-center py-4">
    <Logo />
    <Button onClick={onPostClick}>정글을 향해 소리치기</Button>
  </div>
);
export default MemoHeader;