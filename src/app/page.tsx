/**@format */

"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { format, fromUnixTime, parseISO } from "date-fns";
import kelvinToCelsius from "@/utils/convertKelvinToCelsius";
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";
import LoadingPage from "@/components/Loading";
import { getDayOrNightIcon } from "@/utils/dayOrNight";
import { WeatherDetails } from "@/components/WeatherDetail";
import { convertVisibilityMetersToKm } from "@/utils/m-Km";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import { useAtom } from "jotai";
import { loadingAtom, placeAtom } from "./atom";
import { useEffect } from "react";

interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: CityData;
}

interface WeatherData {
  list: WeatherData[];
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherInfo[];
  clouds: CloudsInfo;
  wind: WindInfo;
  visibility: number;
  pop: number;
  sys: SysInfo;
  dt_txt: string;
  city: CityData;
}

interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CloudsInfo {
  all: number;
}

interface WindInfo {
  speed: number;
  deg: number;
  gust: number;
}

interface SysInfo {
  pod: string;
}

interface CityData {
  id: number;
  name: string;
  coord: CoordInfo;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface CoordInfo {
  lat: number;
  lon: number;
}
const Home = () => {
  const [place] = useAtom(placeAtom);
  const [loading] = useAtom(loadingAtom);

  const {
    isLoading,
    error,
    data: weatherData,
    refetch,
  } = useQuery<WeatherData>("repoData", async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=830b2a0f334c093d67baa6da1260d2cd`
    );
    return response.data;
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const firstData = weatherData?.list[0];

  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];
  // filtering data
  const firstDataForEachDate = uniqueDates.map((date) => {
    return weatherData?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 gap-4 min-h-screen bg-cover bg-center">
          <Navbar />
          <main className="px-3 min-w-7xl max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
            {/* current day data  */}
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end ">
                  <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                  <p className="text-lg">
                    {format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}
                  </p>
                </h2>
                <Container className="gap-10 px-6 text-center">
                  <div className="flex flex-col px-4">
                    <span className="text-5xl">
                      {" "}
                      {kelvinToCelsius(firstData?.main.temp ?? 0)}°
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels Like</span>
                      <span>
                        {kelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                      </span>
                    </p>
                    <p className="text-sx space-x-2">
                      <span>
                        {kelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                      </span>

                      <span>
                        {kelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                      </span>
                    </p>
                  </div>
                  {/* time and weather icons  */}

                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {weatherData?.list.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p>{format(parseISO(d.dt_txt), "h:mm a")}</p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />

                        <p className="pb-3">
                          {" "}
                          {kelvinToCelsius(d?.main.temp ?? 0)}°
                        </p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>

              <div className="flex gap-4">
                {/* left  */}
                <Container className="w-fit justify-center flex-col px-8 items-center">
                  <p className="capitalize text-center">
                    {firstData?.weather[0].description}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(
                      firstData?.weather[0].icon ?? "",
                      firstData?.dt_txt ?? ""
                    )}
                  />
                </Container>

                {/* right */}
                <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visibility={convertVisibilityMetersToKm(
                      firstData?.visibility ?? 10000
                    )}
                    airPressure={`${firstData?.main.pressure}hPa`}
                    humidity={`${firstData?.main.humidity}%`}
                    windSpeed={`${firstData?.wind.speed}km/h`}
                    sunrise={format(
                      fromUnixTime(weatherData?.city?.sunrise ?? 121221),
                      "H:mm"
                    )}
                    sunset={format(
                      fromUnixTime(weatherData?.city?.sunset ?? 121221),
                      "H:mm"
                    )}
                  />
                </Container>
              </div>
            </section>

            {/* seven day data  */}
            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Forecast (7 days)</p>
              {firstDataForEachDate.map(
                (d, i) =>
                  // Check if d is defined before accessing its properties
                  d && (
                    <ForecastWeatherDetail
                      key={i}
                      description={d.weather[0]?.description ?? ""}
                      weatherIcon={d.weather[0]?.icon ?? "01d"}
                      date={format(parseISO(d.dt_txt ?? ""), "dd.MM")}
                      day={format(parseISO(d.dt_txt ?? ""), "EEEE")}
                      feels_like={d.main?.feels_like ?? 0}
                      temp={d.main?.temp ?? 0}
                      temp_max={d.main?.temp_max ?? 0}
                      temp_min={d.main?.temp_min ?? 0}
                      airPressure={`${d.main?.pressure} hPa`}
                      humidity={`${d.main?.humidity}%`}
                      sunrise={format(
                        fromUnixTime(weatherData?.city.sunrise ?? 1702517657),
                        "H:mm"
                      )}
                      sunset={format(
                        fromUnixTime(weatherData?.city.sunset ?? 1702517657),
                        "H:mm"
                      )}
                      visibility={`${convertVisibilityMetersToKm(
                        d.visibility ?? 10000
                      )} km`}
                      windSpeed={(d.wind?.speed ?? 1.64) + "km/h"}
                    />
                  )
              )}
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
