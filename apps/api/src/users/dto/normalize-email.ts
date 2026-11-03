import type { TransformFnParams } from 'class-transformer';
export const normalizeEmail = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string'
    ? value.trim().normalize('NFC').toLowerCase()
    : value;
