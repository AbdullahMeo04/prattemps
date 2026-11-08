// Només els camps de /data/2.5/weather que fa servir l'aplicació
export type Temps = {
  dt: number; // moment de la mesura (segons UTC)
  timezone: number; // desfasament de la ciutat respecte d'UTC (segons)
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number }; // m/s
};

// Àlies per mantenir compatibilitat amb ambdues denominacions
export type Weather = Temps;
