const Input = ({ value, onChange, placeholder, type = "text" }) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded"
    />
  );
  export default Input;