 const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        type="button"
        className="px-3 py-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
        onClick={onDecrease}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="px-4 py-2 text-center w-full">{quantity}</span>
      <button
        type="button"
        className="px-3 py-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
        onClick={onIncrease}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;