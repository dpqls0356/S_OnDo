import useGenderStore from '../../store/app/genderStore'


const FilterGender = () => {
  const { selectedGender, setGender } = useGenderStore()

  const genders = ['전체', '남', '여']

  return (
    <div className="flex bg-[#e8f3f1] rounded-full p-1 max-w-xs">
      {genders.map((gender) => (
        <button
          key={gender}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors
            ${selectedGender === gender 
              ? 'bg-white text-[#2c8475]' 
              : 'bg-transparent text-[#2c8475] hover:bg-white/30'
            }`}
          onClick={() => setGender(gender)}
        >
          {gender === '전체' ? (
            <span className="flex items-center justify-center">
              <span className="mr-1">●</span>{gender}
            </span>
          ) : gender}
        </button>
      ))}
    </div>
  )
}

export default FilterGender