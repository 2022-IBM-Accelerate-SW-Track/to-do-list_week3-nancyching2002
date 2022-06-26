import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});


afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//example
test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "10/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
    const dueDate = "10/30/2023";
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});

    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    //getBy checks and returns true if text only appears once - will throw if more than one
    const check = screen.getByText(/History Test/i);
    expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const taskName = null;
  const dueDate = "10/30/2023";

  fireEvent.change(inputTask, { target: { value: taskName}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  expect(inputTask).not.toBeInTheDocument 
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = null;

    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);

    expect(inputTask).not.toBeInTheDocument 
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "10/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(inputTask).not.toBeInTheDocument 
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "10/30/2021";

  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const historyCheck = screen.getByTestId(/History Test/i).style.background;
  expect(historyCheck).toBe('red')

 });
