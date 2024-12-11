const Button = ({ children, onClick, variant = 'primary' }) => {
    return (
      <button
        onClick={onClick}
        className={`text-lg px-4 py-2 cursor-pointer rounded transition-colors ${
          variant === 'primary' ? 'bg-green-500 hover:bg-green-600 text-white' : 
          variant === 'danger' ? 'bg-red-500 hover:bg-red-600 text-white' :
          'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;