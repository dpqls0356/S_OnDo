const TimeSlots = ({
  selectedDate,
  selectedTime,
  setSelectedTime,
  unavailableTimes,
}) => {
  console.log("==============selectedDate==========");
  console.log(selectedDate);
  console.log("==============selectedTime==========");
  console.log(selectedTime);
  console.log("==============setSelectedTime==========");
  console.log(setSelectedTime);
  console.log("==============unavailableTimes==========");
  console.log(unavailableTimes);
  const handleTimeClick = (time) => {
    if (selectedDate) {
      setSelectedTime(time);
    }
  };

  const renderTimeButton = (time) => {
    const isUnavailable =
      selectedDate &&
      unavailableTimes.some((unavailableTime) => {
        const unavailableDate = new Date(unavailableTime);
        return (
          unavailableDate.getHours() === parseInt(time.split(":")[0]) &&
          unavailableDate.getMinutes() === parseInt(time.split(":")[1])
        );
      });

    return (
      <button
        key={time}
        className={`py-2 ${
          selectedTime === time
            ? "bg-blue-500 text-white"
            : isUnavailable
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white"
        } rounded`}
        onClick={() => !isUnavailable && handleTimeClick(time)}
        disabled={isUnavailable}
      >
        {time}
      </button>
    );
  };

  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return (
    <div className="mt-4 no-outline">
      <h3 className="font-bold mb-2">오전</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {allTimes.slice(0, 3).map(renderTimeButton)}
      </div>
      <h3 className="font-bold mb-2">오후</h3>
      <div className="grid grid-cols-3 gap-2">
        {allTimes.slice(3).map(renderTimeButton)}
      </div>
    </div>
  );
};
export default TimeSlots;
