import type { Ciutat } from '../dades/ciutats';
import styles from './CityList.module.css';

export interface CityListProps {
  ciutats: Ciutat[];
  ciutatSeleccionada: Ciutat;
  enSeleccionar: (ciutat: Ciutat) => void;
}

export function CityList({ ciutats, ciutatSeleccionada, enSeleccionar }: CityListProps) {
  return (
    <nav className={styles.contenidor} aria-label="Llista de ciutats">
      <div className={styles.fila}>
        {ciutats.map((c) => {
          const actiu = c.id === ciutatSeleccionada.id;
          return (
            <button
              key={c.id}
              type="button"
              className={`${styles.boto} ${actiu ? styles.actiu : ''}`}
              aria-pressed={actiu ? 'true' : 'false'}
              onClick={() => enSeleccionar(c)}
            >
              {c.nom}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
