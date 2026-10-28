import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CopyButton } from './CopyButton';

describe('CopyButton', () => {
  const writeText = vi.fn<(text: string) => Promise<void>>();

  beforeEach(() => {
    writeText.mockReset().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  });

  it('copies the value and shows "Copied" for two seconds', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const onCopy = vi.fn();
    render(<CopyButton value="https://halth.com/book/northside" label="Copy link" onCopy={onCopy} />);

    await userEvent.click(screen.getByRole('button', { name: 'Copy link' }));

    expect(writeText).toHaveBeenCalledWith('https://halth.com/book/northside');
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole('button', { name: 'Copy link' })).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('names an icon-only button with its label', () => {
    render(<CopyButton value="ABC123" label="Copy code" isIconOnly />);
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });

  it('reports a blocked clipboard', async () => {
    const error = new Error('Denied');
    writeText.mockRejectedValue(error);
    const onError = vi.fn();
    render(<CopyButton value="ABC123" onError={onError} />);

    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(onError).toHaveBeenCalledWith(error);
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
  });
});
