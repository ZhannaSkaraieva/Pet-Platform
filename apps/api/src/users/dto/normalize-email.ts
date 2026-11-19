export const normalizeEmailString = (email: string): string =>
  email.trim().normalize('NFC').toLowerCase();
