import styles from './DadaTemps.module.css';

export interface DadaTempsProps {
  icon: string;
  label: string;
  value: string;
}

export function DadaTemps({ icon, label, value }: DadaTempsProps) {
  return (
    <div className={styles.item}>
      <span className={styles.icona} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.contingut}>
        <span className={styles.etiqueta}>{label}</span>
        <span className={styles.valor}>{value}</span>
      </div>
    </div>
  );
}
