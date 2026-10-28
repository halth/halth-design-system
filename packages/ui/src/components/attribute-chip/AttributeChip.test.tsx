import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PlusIcon } from '../icons';
import { AttributeChip } from './AttributeChip';

describe('AttributeChip', () => {
  it('is a labelled button with onPress', async () => {
    const onPress = vi.fn();
    render(
      <AttributeChip label="Missing card details" onPress={onPress}>
        <PlusIcon />
      </AttributeChip>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Missing card details' }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('is not a button without onPress', () => {
    render(
      <AttributeChip label="Funding available">
        <PlusIcon />
      </AttributeChip>
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Funding available' })).toHaveClass('w-14', 'rounded-container');
  });
});
