/**
 * Formatea un número como moneda con 2 decimales
 * @param amount - El número a formatear
 * @param currency - El símbolo de la moneda (por defecto: $)
 * @returns String formateado como moneda
 */
export const formatCurrency = (amount: number, currency: string = '$'): string => {
  return `${currency}${amount.toFixed(2)}`;
};

/**
 * Trunca un texto a una longitud específica y agrega puntos suspensivos
 * @param text - El texto a truncar
 * @param maxLength - Longitud máxima antes de truncar
 * @returns Texto truncado
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Formatea una fecha a un string legible
 * @param date - La fecha a formatear
 * @param locale - El locale a usar (por defecto: 'es-ES')
 * @returns String formateado de fecha
 */
export const formatDate = (date: Date, locale: string = 'es-ES'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
