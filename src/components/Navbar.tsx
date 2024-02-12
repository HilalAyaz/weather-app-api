/**@format */

"use client";
import React, { useState } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingAtom, placeAtom } from "@/app/atom";
import LoadingPage from "./Loading";

interface SuggestionBoxProps {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}
const Navbar = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=830b2a0f334c093d67baa6da1260d2cd`
        );

        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
        setError("Please type something");
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setError("");
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Please select a City");
      setLoading(false);
    } else {
      setError("");
      setTimeout(() => {
        setPlace(city);
        setShowSuggestions(false);
        setLoading(false);
      }, 3000);
    }
  };
  const handleSuggestionClick = async (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=830b2a0f334c093d67baa6da1260d2cd`
          );
          setPlace(response.data.name);
        } catch (err) {
          console.error("Error fetching weather data:", err);
          setPlace("");
        } finally {
          setLoading(false);
        }
      });
    }
  }

  return (
    <>
      <nav className="shadow-md sticky top-0 left-0 z-100 bg-gradient-to-r from-cyan-300 to-blue-300">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <h2 className="flex items-center justify-center gap-2 font-extrabold text-3xl">
            GroovyForecasting{" "}
            <MdWbSunny className="text-3xl mt-1 text-yellow-400" />
          </h2>
          <section className="relative hidden md:flex gap-2 items-center ml-2">
            <MdMyLocation
              title="My Location"
              onClick={handleCurrentLocation}
              className="text-2xl  hover:opacity-80 cursor-pointer "
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-gray-800/90 font-medium text-sm">{place}</p>

            <div>
              <SearchBar
                value={city}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className=" gap-2 items-center flex max-w-7xl mx-auto pb-5 md:hidden z--20">
        <MdMyLocation
          title="My Location"
          onClick={handleCurrentLocation}
          className="text-2xl  hover:opacity-80 cursor-pointer"
        />
        <MdOutlineLocationOn className="text-3xl" />
        <p className="text-gray-800/90 font-medium text-sm">{place}</p>

        <div>
          <SearchBar
            value={city}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
          <SuggestionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;

const SuggestionBox: React.FC<SuggestionBoxProps> = ({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}) => {
  return (
    <>
      {((showSuggestions && suggestions.length > 0) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px]left-0 border-gray-300 rounded-md w-[230px] min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length === 0 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer text-slate-400 p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
