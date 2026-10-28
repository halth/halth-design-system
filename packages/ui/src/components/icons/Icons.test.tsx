import { render } from '@testing-library/react';

import { CheckIcon } from './Icons';

describe('Icons', () => {
  it('is decorative and inherits the text colour by default', () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  it('passes through props', () => {
    const { container } = render(<CheckIcon className="size-4" strokeWidth={3} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('size-4');
    expect(svg).toHaveAttribute('stroke-width', '3');
  });
});
