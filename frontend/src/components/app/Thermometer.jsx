import { useState, useEffect } from "react";
import "./Thermometer.css"; // CSS 파일을 따로 만들어서 import 합니다.

const Thermometer = ({ character }) => {
  const units = {
    Celcius: "°C",
    Fahrenheit: "°F",
  };

  const [config, setConfig] = useState({
    unit: "Celcius",
    exp: null,
    level: null,
    maxExp: null,
  });

  const handleTempChange = (e) => {
    const { id, value } = e.target;
    if (isNaN(value)) {
      return;
    } else {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [id]: parseInt(value, 10),
      }));
    }
  };

  const toggleUnit = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      unit: prevConfig.unit === "Celcius" ? "Fahrenheit" : "Celcius",
    }));
  };

  const handleRangeChange = (e) => {
    const value = e.target.value;
    setConfig((prevConfig) => ({
      ...prevConfig,
      temperature: value,
    }));
  };

  const setConfigInfo = () => {
    const calMaxExp = ((character.level - 1) / 10 + 1) * 100;
    setConfig({
      unit: "Celcius",
      exp: character.exp,
      level: character.level,
      maxExp: calMaxExp,
    });
  };
  const setTemperature = () => {
    const tempElement = document.getElementById("temperature");
    const { exp, level, maxExp, unit } = config;
    const temp = (exp / maxExp) * 100;
    // const temp = (50 / 200) * 100;
    tempElement.style.height = (exp / maxExp) * 100 + "%";
    // tempElement.style.height = (50 / 200) * 100 + "%";
    tempElement.dataset.value = temp + units[unit];
  };

  useEffect(() => {
    setConfigInfo();
    setTemperature();
  }, [config]);

  return (
    <div id="wrapper">
      <div id="termometer">
        <div id="temperature" style={{ height: 0 }} data-value="0°C"></div>
        <div id="graduations"></div>
      </div>

      <div id="playground">
        {/* <div id="range">
          <input id="minTemp" type="text" value={config.minTemp} onChange={handleTempChange} />
          <input type="range" min={config.minTemp} max={config.maxTemp} value={config.temperature} onChange={handleRangeChange} />
          <input id="maxTemp" type="text" value={config.maxTemp} onChange={handleTempChange} />
        </div> */}
        {/* <p id="unit" onClick={toggleUnit}>{config.unit} {units[config.unit]}</p> */}
      </div>

      {/* <p id="info">Click on the values to change them!</p> */}
    </div>
  );
};

export default Thermometer;
