import React, { useState } from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
  const [prevSliderValue, setPrevSliderValue] = useState();
  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      {value <= 1 && value > 0.5 && (
        <BsFillVolumeUpFill
          size={25}
          color="#FFF"
          onClick={() => {
            setPrevSliderValue(value), setVolume(0);
          }}
        />
      )}
      {value <= 0.5 && value > 0 && (
        <BsVolumeDownFill
          size={25}
          color="#FFF"
          onClick={() => {
            setPrevSliderValue(value), setVolume(0);
          }}
        />
      )}
      {value <= 0 && (
        <BsFillVolumeMuteFill
          size={25}
          color="#FFF"
          onClick={() => {
            setVolume(prevSliderValue), setPrevSliderValue(value);
          }}
        />
      )}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 bg-red-50"
      />
    </div>
  );
};

export default VolumeBar;
