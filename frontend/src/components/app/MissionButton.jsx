
function MissionButton({ mission, onComplete, isCompleted, missionType }) {
  const getButtonStyle = () => {
    if (!isCompleted) {
      return "bg-white border-2 border-black text-black";
    }
    return missionType === 'daily' 
      ? "bg-green-500 text-white shadow-[2px_2px_0px_0px_#3D3D3D] cursor-pointer" 
      : "bg-pink-500 text-white shadow-[2px_2px_0px_0px_#3D3D3D] cursor-pointer";
  };

  return (
    <button 
      className={`
        p-4 rounded-lg 
        ${getButtonStyle()} 
        transition-colors duration-300 
      `}
      onClick={() => !isCompleted && onComplete(mission)}
      disabled={isCompleted}
    >
      <h3 className="font-bold">{mission.title}</h3>
      <p>{mission.content}</p>
      <p>경험치: {mission.exp}</p>
      <p>레벨: {mission.level}</p>
    </button>
  );
}

export default MissionButton;