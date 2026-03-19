/**
 * General-purpose utilities
 */

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date instanceof Date ? date : new Date(date));
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
