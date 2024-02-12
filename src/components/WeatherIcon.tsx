import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

interface WeatherIconProps extends React.HTMLProps<HTMLDivElement> {
  iconName: string;
}

function WeatherIcon(props: WeatherIconProps) {
  const { iconName } = props;

  return (
    <div className={cn("relative h-20 w-20")}>
      <Image
        width={100}
        height={100}
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@2x.png`}
        alt="weather-icon"
      />
    </div>
  );
}

export default WeatherIcon;
