import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CloudRain,
  Wind,
  Droplets,
  Sun,
  CloudLightning,
  AlertTriangle,
  Compass,
  MapPin,
  RefreshCw,
  Eye,
  Layers,
  ShieldAlert,
  ChevronRight,
  Cloud,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// --- LUPI MUNICIPAL COORDINATES ---
const LUPI_COORDS = { lat: 13.7842, lng: 122.9123 };

// WMO Weather Code Translator
function getWeatherCondition(code: number): { text: string; icon: React.ReactNode } {
  if (code === 0) return { text: "Clear Sky", icon: <Sun className="h-5 w-5 text-amber-500" /> };
  if (code >= 1 && code <= 3) return { text: "Partly Cloudy", icon: <Cloud className="h-5 w-5 text-slate-400" /> };
  if (code >= 51 && code <= 67) return { text: "Rain Showers", icon: <CloudRain className="h-5 w-5 text-sky-500" /> };
  if (code >= 80 && code <= 82) return { text: "Heavy Rain", icon: <CloudRain className="h-5 w-5 text-sky-600" /> };
  if (code >= 95) return { text: "Thunderstorm", icon: <CloudLightning className="h-5 w-5 text-indigo-500" /> };
  return { text: "Cloudy", icon: <Cloud className="h-5 w-5 text-slate-400" /> };
}

// Convert wind direction degrees to cardinal compass
function getWindDirection(deg: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[Math.round(deg / 22.5) % 16];
}

interface CurrentWeatherState {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  uvIndex: number;
  rainChance: number;
  condition: string;
  weatherCode: number;
  floodRisk: "LOW" | "MODERATE" | "HIGH";
}

interface HourlyForecastItem {
  time: string;
  temp: number;
  pop: number;
  weatherCode: number;
}

interface DailyForecastItem {
  day: string;
  condition: string;
  high: number;
  low: number;
  rainProb: number;
  weatherCode: number;
}

export default function Weather() {
  const [activeOverlay, setActiveOverlay] = useState<"wind" | "rain">("wind");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");
  //const [isLoading, setIsLoading] = useState(true);

  // Live weather state populated via Open-Meteo
  const [current, setCurrent] = useState<CurrentWeatherState>({
    temp: 28,
    feelsLike: 32,
    humidity: 82,
    windSpeed: 10,
    windDir: "ENE",
    uvIndex: 5,
    rainChance: 35,
    condition: "Scattered Showers",
    weatherCode: 61,
    floodRisk: "LOW",
  });

  const [hourly, setHourly] = useState<HourlyForecastItem[]>([]);
  const [daily, setDaily] = useState<DailyForecastItem[]>([]);

  // Fetch Accurate Live Weather Data
  const fetchLiveData = async () => {
    setIsRefreshing(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LUPI_COORDS.lat}&longitude=${LUPI_COORDS.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FManila`;

      const res = await fetch(url);
      const data = await res.json();

      if (data && data.current) {
        const cond = getWeatherCondition(data.current.weather_code);
        const rainChance = data.current.precipitation_probability ?? data.hourly.precipitation_probability[0] ?? 30;

        // Calculate flood risk dynamically based on precipitation chance
        let floodRiskLevel: "LOW" | "MODERATE" | "HIGH" = "LOW";
        if (rainChance >= 80) floodRiskLevel = "HIGH";
        else if (rainChance >= 50) floodRiskLevel = "MODERATE";

        setCurrent({
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: Math.round(data.current.relative_humidity_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          windDir: getWindDirection(data.current.wind_direction_10m),
          uvIndex: Math.round(data.current.uv_index ?? 5),
          rainChance: rainChance,
          condition: cond.text,
          weatherCode: data.current.weather_code,
          floodRisk: floodRiskLevel,
        });

        // Format Next 7 Hours Forecast
        const hourlyArr: HourlyForecastItem[] = [];
        const currentHourIndex = new Date().getHours();
        for (let i = 0; i < 7; i++) {
          const idx = currentHourIndex + i;
          const timeStr = i === 0 ? "NOW" : `${(currentHourIndex + i) % 12 || 12} ${ (currentHourIndex + i) >= 12 ? "PM" : "AM" }`;
          hourlyArr.push({
            time: timeStr,
            temp: Math.round(data.hourly.temperature_2m[idx] || 28),
            pop: data.hourly.precipitation_probability[idx] || 0,
            weatherCode: data.hourly.weather_code[idx] || 0,
          });
        }
        setHourly(hourlyArr);

        // Format 5-Day Daily Forecast
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dailyArr: DailyForecastItem[] = [];
        for (let i = 0; i < 5; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dayName = i === 0 ? "Today" : daysOfWeek[date.getDay()];
          const dayCode = data.daily.weather_code[i] || 0;
          dailyArr.push({
            day: dayName,
            condition: getWeatherCondition(dayCode).text,
            high: Math.round(data.daily.temperature_2m_max[i]),
            low: Math.round(data.daily.temperature_2m_min[i]),
            rainProb: data.daily.precipitation_probability_max[i] || 0,
            weatherCode: dayCode,
          });
        }
        setDaily(dailyArr);

        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsRefreshing(false);
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  const mapUrl = `https://embed.windy.com/embed2.html?lat=${LUPI_COORDS.lat}&lon=${LUPI_COORDS.lng}&detailLat=${LUPI_COORDS.lat}&detailLon=${LUPI_COORDS.lng}&width=650&height=450&zoom=10&level=surface&overlay=${activeOverlay}&product=ecmwf&menu=&message=&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`;
   const animate = useInOutAnimation();
  return (
    <section id="weather" className="relative w-full bg-slate-50 py-24 text-slate-800 overflow-hidden font-sans">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />

      <motion.div  variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25 }}  className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div variants={animate.itemVariants} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 mb-3 shadow-sm">
              <Compass className="h-3.5 w-3.5 text-emerald-600 animate-spin-slow" />
              <span>Municipal Environmental Monitoring</span>
            </motion.div>
            <motion.h2 variants={animate.itemVariants} className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Weather & <span className="text-emerald-600">Flood Advisory</span>
            </motion.h2>
            <motion.p variants={animate.itemVariants} className="mt-2 text-sm text-slate-600 max-w-xl">
              Live atmospheric data, precipitation probabilities, river basin flood risk levels, and radar for Lupi, Camarines Sur.
            </motion.p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Updated: {lastUpdated}
            </span>
            <button
              onClick={fetchLiveData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-95 disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-emerald-600" : "text-slate-500"}`} />
              <span>{isRefreshing ? "Fetching..." : "Sync Forecast"}</span>
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* HERO CURRENT WEATHER CARD */}
            <motion.div
             variants={animate.itemVariants}
              className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 via-teal-700 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-emerald-900/10"
            >
              <CloudLightning className="absolute -right-6 -bottom-6 h-56 w-56 text-white/10 pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-200">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  <span>Lupi, Camarines Sur</span>
                </div>
                <span className="rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                  Live Station
                </span>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <div>
                  <div className="text-6xl font-black tracking-tighter">{current.temp}°C</div>
                  <div className="text-sm font-medium text-emerald-100 mt-1">
                    Feels like {current.feelsLike}°C • {current.condition}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
                  {getWeatherCondition(current.weatherCode).icon}
                </div>
              </div>

              {/* FLOOD & RAIN RISK BARS */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
                <div className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-100">
                    <span className="flex items-center gap-1.5">
                      <Droplets className="h-3.5 w-3.5 text-sky-300" /> Rain Chance
                    </span>
                    <span className="text-white font-bold">{current.rainChance}%</span>
                  </div>
                  <div className="mt-2.5 h-2 w-full rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${current.rainChance}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-sky-300"
                    />
                  </div>
                  <span className="mt-2 block text-[10px] text-emerald-200/80">
                    {current.rainChance > 50 ? "High chance of rainfall" : "Low precipitation chance"}
                  </span>
                </div>

                <div className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-100">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="h-3.5 w-3.5 text-amber-300" /> Flood Risk
                    </span>
                    <span className={`font-bold ${current.floodRisk === "HIGH" ? "text-red-400" : current.floodRisk === "MODERATE" ? "text-amber-300" : "text-emerald-300"}`}>
                      {current.floodRisk}
                    </span>
                  </div>
                  <div className="mt-2.5 h-2 w-full rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: current.floodRisk === "HIGH" ? "85%" : current.floodRisk === "MODERATE" ? "50%" : "25%" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${current.floodRisk === "HIGH" ? "bg-red-400" : current.floodRisk === "MODERATE" ? "bg-amber-400" : "bg-emerald-400"}`}
                    />
                  </div>
                  <span className="mt-2 block text-[10px] text-emerald-200/80">Bicol River Basin Watch</span>
                </div>
              </div>
            </motion.div>

            {/* KEY METRICS GRID */}
            <motion.div variants={animate.itemVariants} className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Wind className="h-4 w-4 text-emerald-600" />
                  <span>Wind</span>
                </div>
                <div className="mt-3">
                  <span className="text-xl font-bold text-slate-900">{current.windSpeed}</span>
                  <span className="text-xs text-slate-500 ml-1">km/h</span>
                  <span className="block text-[10px] font-semibold text-emerald-600 mt-0.5">{current.windDir} Vector</span>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Droplets className="h-4 w-4 text-sky-600" />
                  <span>Humidity</span>
                </div>
                <div className="mt-3">
                  <span className="text-xl font-bold text-slate-900">{current.humidity}</span>
                  <span className="text-xs text-slate-500 ml-1">%</span>
                  <span className="block text-[10px] font-semibold text-sky-600 mt-0.5">Tropical Relative</span>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>UV Index</span>
                </div>
                <div className="mt-3">
                  <span className="text-xl font-bold text-slate-900">{current.uvIndex}</span>
                  <span className="text-xs text-slate-500 ml-1">/ 11</span>
                  <span className="block text-[10px] font-semibold text-amber-600 mt-0.5">
                    {current.uvIndex > 7 ? "High" : current.uvIndex > 4 ? "Moderate" : "Low"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* HOURLY FORECAST STRIP */}
            <motion.div variants={animate.itemVariants} className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span>Hourly Precipitation Forecast</span>
                <span className="text-emerald-600 font-bold">Next 7 Hours</span>
              </h3>

              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
                {hourly.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-between min-w-14.5 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500">{item.time}</span>
                    <div className="my-2">{getWeatherCondition(item.weatherCode).icon}</div>
                    <span className="text-xs font-bold text-slate-800">{item.temp}°</span>
                    <span className="mt-1 text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-full">
                      {item.pop}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* MAP CARD WITH CONTROLS  */}
            <motion.div variants={animate.itemVariants} className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col h-120">
              <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-white border border-slate-700/80 shadow-md pointer-events-auto">
                  <Eye className="h-4 w-4 text-emerald-400" />
                  <span>Live Lupi Radar</span>
                </div>

                <div className="flex items-center rounded-xl bg-slate-900/90 backdrop-blur-md p-1 border border-slate-700/80 shadow-md pointer-events-auto">
                  <button
                    onClick={() => setActiveOverlay("wind")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      activeOverlay === "wind" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Wind className="h-3.5 w-3.5" />
                    <span>Wind Vector</span>
                  </button>
                  <button
                    onClick={() => setActiveOverlay("rain")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      activeOverlay === "rain" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <CloudRain className="h-3.5 w-3.5" />
                    <span>Rain Radar</span>
                  </button>
                </div>
              </div>

              <iframe
                title="Lupi Live Weather Map"
                src={mapUrl}
                className="h-full w-full border-0 filter contrast-105"
                loading="lazy"
              />

              <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-emerald-400" /> Active Layer:{" "}
                  <strong className="text-white capitalize">{activeOverlay} Overlay</strong>
                </span>
                <a
                  href="https://www.windy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Windy Satellite</span>
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
           

            {/* 5-DAY EXTENDED OUTLOOK */}
            <motion.div variants={animate.itemVariants} className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span>5-Day Extended Weather Outlook</span>
                <span className="text-slate-500 font-medium text-[11px]">Municipality of Lupi</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {daily.map((day, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="w-20 font-bold text-slate-800">{day.day}</div>
                    
                    <div className="flex items-center gap-2 flex-1">
                      {getWeatherCondition(day.weatherCode).icon}
                      <span className="font-medium text-slate-600 hidden sm:inline">{day.condition}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sky-600 font-semibold bg-sky-50 px-2 py-0.5 rounded-full text-[10px]">
                        {day.rainProb}% rain
                      </span>
                      <div className="w-16 text-right font-bold text-slate-900">
                        {day.high}° <span className="text-slate-400 font-normal">/ {day.low}°</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* MUNICIPAL DISASTER RISK REDUCTION NOTICE */}
            <motion.div variants={animate.itemVariants} className="rounded-2xl bg-amber-50 border border-amber-200/80 p-4 flex items-start gap-3.5">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <span className="font-bold block text-amber-950 mb-0.5">
                  MDRRMO Advisory for Low-Lying Barangays
                </span>
                Residents in riverbank and coastal zones are advised to keep emergency kits ready during heavy rainfall warnings. Call Lupi MDRRMO Hotline: <strong>(054) 881-LUPI</strong>.
              </div>
            </motion.div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}