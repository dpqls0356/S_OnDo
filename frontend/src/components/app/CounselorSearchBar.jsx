const SearchBar = () => {
    return (
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="이름으로 검색하기"
          className="w-full bg-white rounded-full py-2 pl-10 pr-4"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    );
  };
  
  export default SearchBar;