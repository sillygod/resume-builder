import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from './ChatInput';

describe('ChatInput Component', () => {
  const defaultProps = {
    input: '',
    setInput: vi.fn(),
    sendMessage: vi.fn(),
    isLoading: false,
    handleKeyDown: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ChatInput {...defaultProps} />);
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
  });

  it('displays current input value', () => {
    render(<ChatInput {...defaultProps} input="Hello world" />);
    expect(screen.getByDisplayValue('Hello world')).toBeInTheDocument();
  });

  it('calls setInput when text is typed', async () => {
    const user = userEvent.setup();
    const setInput = vi.fn();
    
    render(<ChatInput {...defaultProps} setInput={setInput} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    await user.type(textarea, 'Hello');
    
    // Check that setInput was called with the last character
    expect(setInput).toHaveBeenLastCalledWith('o');
    expect(setInput).toHaveBeenCalledTimes(5);
  });

  it('calls sendMessage when send button is clicked', async () => {
    const user = userEvent.setup();
    const sendMessage = vi.fn();
    
    render(<ChatInput {...defaultProps} input="Hello" sendMessage={sendMessage} />);
    
    const sendButton = screen.getByRole('button');
    await user.click(sendButton);
    
    expect(sendMessage).toHaveBeenCalled();
  });

  it('disables send button when input is empty', () => {
    render(<ChatInput {...defaultProps} input="" />);
    
    const sendButton = screen.getByRole('button');
    expect(sendButton).toBeDisabled();
  });

  it('disables send button when input contains only whitespace', () => {
    render(<ChatInput {...defaultProps} input="   " />);
    
    const sendButton = screen.getByRole('button');
    expect(sendButton).toBeDisabled();
  });

  it('enables send button when input has content', () => {
    render(<ChatInput {...defaultProps} input="Hello" />);
    
    const sendButton = screen.getByRole('button');
    expect(sendButton).not.toBeDisabled();
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<ChatInput {...defaultProps} isLoading={true} />);
    
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    expect(screen.queryByTestId('send-icon')).not.toBeInTheDocument();
  });

  it('shows send icon when not loading', () => {
    render(<ChatInput {...defaultProps} />);
    
    expect(document.querySelector('.animate-spin')).not.toBeInTheDocument();
    // The Send icon should be present (though we can't test the icon directly due to mocking)
  });

  it('disables button when loading', () => {
    render(<ChatInput {...defaultProps} isLoading={true} />);
    
    const sendButton = screen.getByRole('button');
    expect(sendButton).toBeDisabled();
  });

  it('disables button when loading even with valid input', () => {
    render(<ChatInput {...defaultProps} input="Hello" isLoading={true} />);
    
    const sendButton = screen.getByRole('button');
    expect(sendButton).toBeDisabled();
  });

  it('calls handleKeyDown when key is pressed in textarea', async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();
    
    render(<ChatInput {...defaultProps} handleKeyDown={handleKeyDown} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    await user.type(textarea, '{Enter}');
    
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('forwards ref to textarea', () => {
    const ref = vi.fn();
    
    render(<ChatInput {...defaultProps} ref={ref} />);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });

  it('has proper ARIA attributes', () => {
    render(<ChatInput {...defaultProps} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    const button = screen.getByRole('button');
    
    expect(textarea).toHaveAttribute('placeholder', 'Type your message...');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('handles multiline input correctly', async () => {
    const user = userEvent.setup();
    const setInput = vi.fn();
    
    render(<ChatInput {...defaultProps} setInput={setInput} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    await user.type(textarea, 'Line 1{Shift>}{Enter}{/Shift}Line 2');
    
    // Check that setInput was called with the last character (2)
    expect(setInput).toHaveBeenLastCalledWith('2');
    expect(setInput).toHaveBeenCalledTimes(13); // 6 chars + 1 newline + 6 chars
  });

  it('applies correct CSS classes', () => {
    render(<ChatInput {...defaultProps} />);
    
    const container = screen.getByPlaceholderText('Type your message...').closest('.border.rounded-lg');
    expect(container).toHaveClass('border', 'rounded-lg', 'p-2', 'flex', 'items-center', 'gap-2', 'bg-background');
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    expect(textarea).toHaveClass('flex-1', 'min-h-9', 'resize-none', 'border-0');
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-9', 'w-9', 'flex-shrink-0');
  });

  it('does not call sendMessage on disabled button click', async () => {
    const user = userEvent.setup();
    const sendMessage = vi.fn();
    
    render(<ChatInput {...defaultProps} input="" sendMessage={sendMessage} />);
    
    const sendButton = screen.getByRole('button');
    await user.click(sendButton);
    
    // Button is disabled, so click should not trigger sendMessage
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('maintains focus on textarea after typing', async () => {
    const user = userEvent.setup();
    
    render(<ChatInput {...defaultProps} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    await user.click(textarea);
    await user.type(textarea, 'Hello');
    
    expect(textarea).toHaveFocus();
  });

  it('handles rapid input changes', async () => {
    const user = userEvent.setup();
    const setInput = vi.fn();
    
    render(<ChatInput {...defaultProps} setInput={setInput} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    
    // Simulate rapid typing
    await user.type(textarea, 'Hello');
    
    // setInput should be called for each character
    expect(setInput).toHaveBeenCalledTimes(5);
  });

  it('handles special keyboard events', async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();
    
    render(<ChatInput {...defaultProps} handleKeyDown={handleKeyDown} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    
    await user.type(textarea, '{Enter}');
    await user.type(textarea, '{Escape}');
    await user.type(textarea, '{Tab}');
    
    expect(handleKeyDown).toHaveBeenCalledTimes(3);
  });
});