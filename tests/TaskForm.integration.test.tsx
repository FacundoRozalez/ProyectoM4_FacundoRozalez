import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskForm } from '../src/features/tasks/TaskForm';

describe('TaskForm integration', () => {
  it('calls onAdd with valid task data', async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();

    render(<TaskForm onAdd={onAdd} />);

    await user.type(screen.getByPlaceholderText('Título de la tarea'), 'Comprar leche');
    await user.type(screen.getByPlaceholderText('Descripción (opcional)'), 'Leche y pan');
    const [button] = screen.getAllByRole('button', { name: /agregar tarea/i });
    await user.click(button);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('Comprar leche', 'Leche y pan', 'medium', '');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows an error when the title is empty', async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();

    render(<TaskForm onAdd={onAdd} />);

    const [button] = screen.getAllByRole('button', { name: /agregar tarea/i });
    await user.click(button);

    expect(onAdd).not.toHaveBeenCalled();
    const error = await screen.findByText(/título es obligatorio/i);
    expect(error).toBeTruthy();
  });
});
