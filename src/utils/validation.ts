import type { Priority } from '../types';

export interface ValidationErrors {
  title?: string;
  dueDate?: string;
  email?: string;
  password?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

export const isNonEmptyString = (value: string) => value.trim().length > 0;

export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidPassword = (password: string) => password.trim().length >= 6;

export const isValidDate = (value: string) => {
  if (!value) return true;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const isSameOrFutureDate = (value: string) => {
  if (!value) return true;
  const incoming = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  incoming.setHours(0, 0, 0, 0);
  return incoming >= today;
};

export const validateTaskInput = (data: {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
}): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!isNonEmptyString(data.title || '')) {
    errors.title = 'El título es obligatorio.';
  }

  if (data.dueDate && !isValidDate(data.dueDate)) {
    errors.dueDate = 'La fecha de vencimiento no es válida.';
  }

  if (data.dueDate && !isSameOrFutureDate(data.dueDate)) {
    errors.dueDate = 'La fecha de vencimiento no puede ser anterior a hoy.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateAuthInput = (email: string, password: string): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!isNonEmptyString(email)) {
    errors.email = 'El email es obligatorio.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Ingrese un email válido.';
  }

  if (!isNonEmptyString(password)) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (!isValidPassword(password)) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
