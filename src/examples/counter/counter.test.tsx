// @vitest-environment happy-dom

import { screen, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Counter from '.';
import { renderComponent } from './test/utilities';

test('it should render the component', () => {
  renderComponent(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = renderComponent(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
  const button = screen.getByRole('button', { name: 'Increment' });
  // fireEvent.click(button);
  await user.click(button);
  expect(currentCount).toHaveTextContent('1');
  screen.debug(document.body);
});
