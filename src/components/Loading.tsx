import { useState, useEffect } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

const words = ["GroovyForecasting"];

export default function LoadingPage() {

  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  


  useEffect(() => {
    const interval = setInterval(() => {
      if (isDeleting) {
        setCurrentCharIndex((prevIndex) => prevIndex - 1);
        if (currentCharIndex === 0) {
          setIsDeleting(false);
        }
      } else {
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
        if (currentCharIndex === words[0].length) {
          setIsDeleting(false);
        }
       
        if (currentCharIndex === words[0].length && !isDeleting) {
          clearInterval(interval);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentCharIndex, isDeleting]);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 to-blue-500 z-10000">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mb-8">
          <h1 className=" text-9xl text-yellow-400 animate-bounce">
            <TiWeatherPartlySunny />
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <h1 id="typewriter" className="text-5xl font-bold text-gray-700">
            {words[0].substring(0, currentCharIndex)}
          </h1>
        </div>
      </div>
    </div>
  );
}
