import { render as _render, screen } from 'test/utilities';
import { PackingList } from '.';
import { createStore } from './store';
import { Provider } from 'react-redux';

const render = (ui: React.ReactElement) => {
  return _render(<Provider store={createStore()}>{ui}</Provider>);
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByRole('searchbox', { name: 'New Item Name' });
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const addButton = screen.getByRole('button', { name: 'Add New Item' });
  expect(addButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const addButton = screen.getByRole('button', { name: 'Add New Item' });
  const input = screen.getByRole('searchbox', { name: 'New Item Name' });
  expect(addButton).toBeDisabled();
  await user.type(input, '123');
  expect(addButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const addButton = screen.getByRole('button', { name: 'Add New Item' });
  const input = screen.getByRole('searchbox', { name: 'New Item Name' });
  const unpackedList = screen.getByTestId('unpacked-items-list');
  expect(addButton).toBeDisabled();
  await user.type(input, '123');
  expect(addButton).toBeEnabled();
  await user.click(addButton);
  expect(unpackedList).toHaveTextContent('123');
  expect(addButton).toBeDisabled();
  expect(input).toHaveValue('');
  screen.debug(unpackedList);
});

it('adds a new item to the unpacked item list when the clicking "Add New Item" and removes it', async () => {
  const { user } = render(<PackingList />);
  const inputText = '123';
  const addButton = screen.getByRole('button', { name: 'Add New Item' });
  const input = screen.getByRole('searchbox', { name: 'New Item Name' });
  const unpackedList = screen.getByTestId('unpacked-items-list');
  expect(addButton).toBeDisabled();
  await user.click(input);
  await user.keyboard(inputText);
  expect(addButton).toBeEnabled();
  await user.click(addButton);
  expect(unpackedList).toHaveTextContent(inputText);
  const removeItemButton = screen.getByRole('button', {
    name: `Remove ${inputText}`,
  });
  await user.click(removeItemButton);
  expect(unpackedList).not.toHaveTextContent(inputText);
});
