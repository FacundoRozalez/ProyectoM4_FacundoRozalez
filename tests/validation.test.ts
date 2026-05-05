import { describe, expect, it } from 'vitest';
import { validateAuthInput, validateTaskInput, isValidEmail, isValidPassword } from '../src/utils/validation';

describe('validation utilities', () => {
  it('should validate a correct email', () => {
    expect(isValidEmail('usuario@dominio.com')).toBe(true);
  });

  it('should reject an invalid email', () => {
    expect(isValidEmail('usuario@@dominio')).toBe(false);
  });

  it('should accept a strong password', () => {
    expect(isValidPassword('123456')).toBe(true);
  });

  it('should reject a short password', () => {
    expect(isValidPassword('123')).toBe(false);
  });

  it('should validate task input when title is present', () => {
    const result = validateTaskInput({ title: 'Tarea', dueDate: '' });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should invalidate a task without title', () => {
    const result = validateTaskInput({ title: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe('El título es obligatorio.');
  });

  it('should invalidate a task with past due date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateString = yesterday.toISOString().slice(0, 10);

    const result = validateTaskInput({ title: 'Tarea', dueDate: dateString });
    expect(result.valid).toBe(false);
    expect(result.errors.dueDate).toBe('La fecha de vencimiento no puede ser anterior a hoy.');
  });
});
