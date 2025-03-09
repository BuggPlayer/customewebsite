const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  if (!sizes || sizes.length === 0) return null;
  
  return (
    <div className="grid grid-cols-3 gap-3">
      {sizes.map((size) => (
        <button
          key={size.id}
          type="button"
          className={`
            border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium 
            ${selectedSize && selectedSize.id === size.id 
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
              : 'border-gray-300 text-gray-900 hover:bg-gray-50'
            }
          `}
          onClick={() => onSelectSize(size)}
        >
          <span>{size.name}</span>
          <span className="ml-1 text-gray-500">${size.price}</span>
        </button>
      ))}
    </div>
  );
};

export default SizeSelector; 