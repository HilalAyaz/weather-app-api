import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import { WeatherDetailProps, WeatherDetails } from "./WeatherDetail";
import kelvinToCelsius from "@/utils/convertKelvinToCelsius";

interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  description: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
  const {
    weatherIcon = "02d",
    date = "",
    day = "Tuesday",
    description,
    temp,
    feels_like,
    temp_min,
    temp_max,
  } = props;
  return (
    <Container className="gap-4 ">
      {/* left section  */}
      <section className="flex gap-4 items-center px-4">
        <div>
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        <div className="flex flex-col px-4">
          <span className="text-5xl">{kelvinToCelsius(temp ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span className="text-center">Feels Like</span>
            <span>{kelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>
      {/* Right section  */}

      <section className="flex overflow-x-auto justify-between gap-4 px4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}

export default ForecastWeatherDetail;
