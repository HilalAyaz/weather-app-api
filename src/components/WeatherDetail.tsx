import React from "react";
import { LuDroplet, LuEye, LuSunrise, LuSunset, LuWind } from "react-icons/lu";
import { MdSpeed } from "react-icons/md";

export interface WeatherDetailProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}
export const WeatherDetails: React.FC<WeatherDetailProps> = (props) => {
    return (
      <>
        <SingleWeatherDetail
          icon={<LuEye />}
          information="Visibility"
          value={props.visibility}
        />
        <SingleWeatherDetail
          icon={<LuDroplet />}
          information="Humidity"
          value={props.humidity}
        />
        <SingleWeatherDetail
          icon={<LuWind />}
          information="Wind Speed"
          value={props.windSpeed}
        />
        <SingleWeatherDetail
          icon={<MdSpeed />
        }
          information="Air Pressure"
          value={props.airPressure}
        />
        <SingleWeatherDetail
          icon={<LuSunrise />}
          information="Sunrise"
          value={props.sunrise}
        />
        <SingleWeatherDetail
          icon={<LuSunset />}
          information="Sunset"
          value={props.sunset}
        />
      </>
    );
  };
  
export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}
export function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
