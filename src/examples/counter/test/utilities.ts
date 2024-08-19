import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const renderComponent = (
  ui: React.ReactElement,
  options?: Parameters<typeof render>[1],
) => {
  const user = userEvent.setup();
  const result = render(ui, options);
  return {
    ...result,
    user,
  };
};
