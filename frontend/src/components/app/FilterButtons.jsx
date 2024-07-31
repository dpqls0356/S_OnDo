const FilterButtons = () => {
    return (
      <div className="flex justify-between bg-white rounded-full p-1 mb-4">
        <button className="bg-black text-white rounded-full px-4 py-1">전체</button>
        <button className="px-4 py-1">남</button>
        <button className="px-4 py-1">여</button>
      </div>
    );
  };
  
  export default FilterButtons;