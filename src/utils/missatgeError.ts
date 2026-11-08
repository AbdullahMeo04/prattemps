export function missatgeError(status: number): string {
  switch (status) {
    case 401:
      return 'Error 401: la clau no és vàlida o encara no està activada.';
    case 404:
      return 'Error 404: no s’ha trobat aquesta ciutat.';
    case 429:
      return 'Error 429: massa peticions en poc temps. Espera una mica.';
    default:
      return `Error ${status}: el servidor no ha pogut respondre.`;
  }
}

export const messageError = missatgeError;
