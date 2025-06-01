/**
 * Valida si un string es una dirección de email válida
 * @param email - El email a validar
 * @returns booleano indicando si el email es válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si un string es una URL válida
 * @param url - La URL a validar
 * @returns booleano indicando si la URL es válida
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida si un string es un número de teléfono válido
 * @param phone - El número de teléfono a validar
 * @returns booleano indicando si el número de teléfono es válido
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Valida si un string no está vacío y tiene una longitud mínima
 * @param value - El string a validar
 * @param minLength - Longitud mínima requerida
 * @returns booleano indicando si el string es válido
 */
export const isValidString = (value: string, minLength: number = 1): boolean => {
  return value.trim().length >= minLength;
};

/**
 * Valida si un número está dentro de un rango
 * @param value - El número a validar
 * @param min - Valor mínimo
 * @param max - Valor máximo
 * @returns booleano indicando si el número es válido
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
