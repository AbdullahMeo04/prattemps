import type { Ciutat } from '../dades/ciutats';
import type { Temps } from '../tipus';
import { DadaTemps } from './DadaTemps';
import styles from './WeatherCard.module.css';

export interface WeatherCardProps {
  temps: Temps | null;
  ciutat: Ciutat;
  carregant: boolean;
  error: string;
  faltaClau?: boolean;
}

function formataHoraLocal(unixSeconds: number, timezoneOffsetSeconds: number): string {
  // Construïm la data a partir de (unixSeconds + timezone) * 1000 i formategem amb mètodes UTC
  const d = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  const hores = String(d.getUTCHours()).padStart(2, '0');
  const minuts = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hores}:${minuts}`;
}

function majusculaInicial(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function WeatherCard({
  temps,
  ciutat,
  carregant,
  error,
  faltaClau,
}: WeatherCardProps) {
  // 1. Estat de falta de clau
  if (faltaClau) {
    return (
      <div className={styles.avisClau} role="alert">
        <p className={styles.textAvis}>Falta la clau d'OpenWeather</p>
      </div>
    );
  }

  // 2. Estat carregant
  if (carregant) {
    return (
      <div className={styles.targetaEstat} aria-live="polite">
        <p className={styles.carregantText}>Carregant el temps: {ciutat.nom}...</p>
      </div>
    );
  }

  // 3. Estat d'error
  if (error) {
    return (
      <div className={styles.errorBox} role="alert">
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  if (!temps) {
    return null;
  }

  const cel = temps.weather[0];
  const horaActualitzada = formataHoraLocal(temps.dt, temps.timezone);
  const horaSortida = formataHoraLocal(temps.sys.sunrise, temps.timezone);
  const horaPosta = formataHoraLocal(temps.sys.sunset, temps.timezone);

  // 12 dades numerades:
  // 1: Nom ciutat seleccionada + país en --text-suau
  // 2: "Actualitzat a les {hh:mm}"
  // 3: Icona d'OpenWeather amb alt = descripció
  // 4: Temperatura arrodonida: "{T} °C"
  // 5: Descripció amb primera lletra en majúscula
  // 6: "Màx. {max}° · Mín. {min}°"
  // 7-12: DadaTemps
  const tempPrincipal = `${Math.round(temps.main.temp)} °C`;
  const maxMinText = `Màx. ${Math.round(temps.main.temp_max)}° · Mín. ${Math.round(temps.main.temp_min)}°`;
  const descripcio = majusculaInicial(cel?.description ?? '');
  const sensacio = `${Math.round(temps.main.feels_like)} °C`;
  const humitat = `${temps.main.humidity}%`;
  const vent = `${Math.round(temps.wind.speed * 3.6)} km/h`;
  const pressio = `${temps.main.pressure} hPa`;

  return (
    <article className={styles.targeta} aria-label={`Temps actual a ${ciutat.nom}`}>
      {/* Columna esquerra: resum principal */}
      <section className={styles.columnaPrincipal}>
        <header className={styles.capcalera}>
          <h2 className={styles.titolCiutat}>
            {ciutat.nom}, <span className={styles.pais}>{temps.sys.country}</span>
          </h2>
          <p className={styles.horaActualitzacio}>Actualitzat a les {horaActualitzada}</p>
        </header>

        <div className={styles.resumClima}>
          {cel && (
            <img
              className={styles.iconaTemps}
              src={`https://openweathermap.org/img/wn/${cel.icon}@2x.png`}
              alt={cel.description}
            />
          )}
          <div className={styles.blocTemperatura}>
            <span className={styles.temperatura}>{tempPrincipal}</span>
            <span className={styles.descripcio}>{descripcio}</span>
            <span className={styles.maxMin}>{maxMinText}</span>
          </div>
        </div>
      </section>

      {/* Columna dreta: les 6 dades addicionals (7 a 12) en quadrícula */}
      <section className={styles.columnaDades} aria-label="Detalls meteorològics">
        <DadaTemps icon="🌡️" label="Sensació" value={sensacio} />
        <DadaTemps icon="💧" label="Humitat" value={humitat} />
        <DadaTemps icon="💨" label="Vent" value={vent} />
        <DadaTemps icon="🧭" label="Pressió" value={pressio} />
        <DadaTemps icon="🌅" label="Sortida del sol" value={horaSortida} />
        <DadaTemps icon="🌇" label="Posta del sol" value={horaPosta} />
      </section>
    </article>
  );
}
