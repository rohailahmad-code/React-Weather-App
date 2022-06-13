import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/WeatherService";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: "Akora Khattak" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {

      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for ' + message)

      await getFormattedWeatherData({ ...query, units }).then((data) => {

        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}`
        )


        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 25 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (

    <div className="bg-gradient-to-br from-gray-700 to-purple-400 h-full sm:py-5">

      <div
        className={`mx-auto max-w-screen-md py-5 px-2 sm:px-24
        bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />

            <Forecast title="Hourly Forecast" items={weather.hourly} />
            <Forecast title="Daily Forecast" items={weather.daily} />
          </div>
        )}
        <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
      </div>
    
    </div>



  );
}

export default App;
