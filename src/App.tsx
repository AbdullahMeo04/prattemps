import { useState } from 'react';
import { CityList } from './components/CityList';
import { WeatherCard } from './components/WeatherCard';
import { CLAU_OPENWEATHER } from './config/claus';
import { CIUTATS, type Ciutat } from './dades/ciutats';
import { useApi } from './hooks/useApi';
import type { Temps } from './tipus';
import styles from './App.module.css';

export function App() {
  // Ciutat per defecte: El Prat de Llobregat
  const ciutatPerDefecte = CIUTATS.find((c) => c.id === 'prat') ?? CIUTATS[0];
  const [ciutatSeleccionada, setCiutatSeleccionada] = useState<Ciutat>(ciutatPerDefecte);

  const clauBuit = !CLAU_OPENWEATHER || CLAU_OPENWEATHER.trim() === '';

  // Muntem els paràmetres amb URLSearchParams tal com demana l'enunciat
  let apiUrl: string | null = null;
  if (!clauBuit) {
    const params = new URLSearchParams({
      lat: ciutatSeleccionada.lat.toString(),
      lon: ciutatSeleccionada.lon.toString(),
      appid: CLAU_OPENWEATHER.trim(),
      units: 'metric',
      lang: 'ca',
    });
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`;
  }

  const { data, loading, error } = useApi<Temps>(apiUrl);

  return (
    <div className={styles.app}>
      <main className={styles.contingut}>
        <header className={styles.capcaleraPrincipal}>
          <h1 className={styles.titolApp}>PratTemps</h1>
          <p className={styles.subtitolApp}>El temps de Catalunya en directe</p>
        </header>

        <CityList
          ciutats={CIUTATS}
          ciutatSeleccionada={ciutatSeleccionada}
          enSeleccionar={(ciutat) => setCiutatSeleccionada(ciutat)}
        />

        <WeatherCard
          temps={data}
          ciutat={ciutatSeleccionada}
          carregant={loading}
          error={error}
          faltaClau={clauBuit}
        />
      </main>
    </div>
  );
}

export default App;
