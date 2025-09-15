import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatMessages } from './ChatMessages';
import { Message } from '@/types/resumeAssistantTypes';

// Mock the scrollIntoView method
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

describe('ChatMessages Component', () => {
  const mockMessages: Message[] = [
    {
      role: 'system',
      content: 'System message',
    },
    {
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      timestamp: new Date('2023-01-01T10:00:00'),
    },
    {
      role: 'user',
      content: 'Please review my resume',
      timestamp: new Date('2023-01-01T10:01:00'),
    },
    {
      role: 'assistant',
      content: 'I\'d be happy to help you with your resume!',
      timestamp: new Date('2023-01-01T10:02:00'),
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ChatMessages messages={[]} isLoading={false} />);
    expect(document.querySelector('.flex-1')).toBeInTheDocument();
  });

  it('displays messages excluding system messages', () => {
    render(<ChatMessages messages={mockMessages} isLoading={false} />);
    
    expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
    expect(screen.getByText('Please review my resume')).toBeInTheDocument();
    expect(screen.getByText('I\'d be happy to help you with your resume!')).toBeInTheDocument();
    
    // System message should not be displayed
    expect(screen.queryByText('System message')).not.toBeInTheDocument();
  });

  it('applies correct styling to assistant messages', () => {
    render(<ChatMessages messages={mockMessages} isLoading={false} />);

    // Find the message container (should have bg-secondary classes)
    const messageContainer = screen.getByText('Hello! How can I help you today?').closest('.bg-secondary');
    expect(messageContainer).toHaveClass('bg-secondary', 'text-secondary-foreground');

    // Find the flex container (should justify-start for assistant messages)
    const assistantContainer = messageContainer?.closest('.flex');
    expect(assistantContainer).toHaveClass('justify-start');

    // Check that the content is wrapped in prose styling
    const proseContainer = screen.getByText('Hello! How can I help you today?').closest('.prose');
    expect(proseContainer).toHaveClass('prose', 'prose-sm', 'prose-slate');
  });

  it('applies correct styling to user messages', () => {
    render(<ChatMessages messages={mockMessages} isLoading={false} />);

    // Find the message container (should have bg-primary classes)
    const messageContainer = screen.getByText('Please review my resume').closest('.bg-primary');
    expect(messageContainer).toHaveClass('bg-primary', 'text-primary-foreground');

    // Find the flex container (should justify-end for user messages)
    const userContainer = messageContainer?.closest('.flex');
    expect(userContainer).toHaveClass('justify-end');

    // Check that user content has whitespace-pre-wrap styling
    const userContent = screen.getByText('Please review my resume').closest('.whitespace-pre-wrap');
    expect(userContent).toHaveClass('whitespace-pre-wrap');
  });

  it('displays timestamps when available', () => {
    render(<ChatMessages messages={mockMessages} isLoading={false} />);
    
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('10:01 AM')).toBeInTheDocument();
    expect(screen.getByText('10:02 AM')).toBeInTheDocument();
  });

  it('handles messages without timestamps', () => {
    const messagesWithoutTimestamps: Message[] = [
      {
        role: 'assistant',
        content: 'Message without timestamp',
      },
      {
        role: 'user',
        content: 'Another message',
      }
    ];
    
    render(<ChatMessages messages={messagesWithoutTimestamps} isLoading={false} />);
    
    expect(screen.getByText('Message without timestamp')).toBeInTheDocument();
    expect(screen.getByText('Another message')).toBeInTheDocument();
  });

  it('shows loading indicator when isLoading is true', () => {
    render(<ChatMessages messages={mockMessages} isLoading={true} />);
    
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('hides loading indicator when isLoading is false', () => {
    render(<ChatMessages messages={mockMessages} isLoading={false} />);
    
    expect(screen.queryByText('Thinking...')).not.toBeInTheDocument();
  });

  it('handles empty messages array', () => {
    render(<ChatMessages messages={[]} isLoading={false} />);
    
    // Should render the container but no messages
    expect(document.querySelector('.space-y-4')).toBeInTheDocument();
  });

  it('preserves whitespace in message content', () => {
    const messageWithWhitespace: Message[] = [
      {
        role: 'user',
        content: 'Line 1\n\nLine 2\nLine 3',
      }
    ];

    render(<ChatMessages messages={messageWithWhitespace} isLoading={false} />);

    // Find the div with whitespace-pre-wrap class (user messages preserve whitespace)
    const messageElement = document.querySelector('.whitespace-pre-wrap');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('whitespace-pre-wrap');
    // Check that the content contains all parts
    expect(messageElement).toHaveTextContent('Line 1');
    expect(messageElement).toHaveTextContent('Line 2');
    expect(messageElement).toHaveTextContent('Line 3');
  });

  it('handles long messages with proper max width', () => {
    const longMessage: Message[] = [
      {
        role: 'assistant',
        content: 'This is a very long message that should be constrained by the max width setting to ensure proper layout and readability in the chat interface.',
      }
    ];

    render(<ChatMessages messages={longMessage} isLoading={false} />);

    // Find the message container that should have max-w-[70%] class
    const messageContainer = screen.getByText(/This is a very long message/).closest('div');
    // Find the container with the max-width class by traversing up the DOM
    let maxWidthContainer = messageContainer;
    while (maxWidthContainer && !maxWidthContainer.classList.contains('max-w-[70%]')) {
      maxWidthContainer = maxWidthContainer.parentElement as HTMLElement;
    }
    expect(maxWidthContainer).toHaveClass('max-w-[70%]');
  });

  it('scrolls to bottom when messages change', () => {
    const { rerender } = render(<ChatMessages messages={mockMessages.slice(0, 2)} isLoading={false} />);
    
    const scrollIntoViewSpy = vi.spyOn(Element.prototype, 'scrollIntoView');
    
    // Add more messages
    rerender(<ChatMessages messages={mockMessages} isLoading={false} />);
    
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest' });
  });

  it('applies consistent styling across all messages', () => {
    render(<ChatMessages messages={mockMessages} isLoading={false} />);
    
    const allMessageBubbles = document.querySelectorAll('.rounded-lg.p-3');

    allMessageBubbles.forEach(bubble => {
      expect(bubble).toHaveClass('rounded-lg', 'p-3');
      expect(bubble.querySelector('.text-sm')).toBeInTheDocument();
    });
  });

  it('shows timestamp with correct format', () => {
    const messageWithSpecificTime: Message[] = [
      {
        role: 'assistant',
        content: 'Test message',
        timestamp: new Date('2023-01-01T14:30:45'),
      }
    ];
    
    render(<ChatMessages messages={messageWithSpecificTime} isLoading={false} />);
    
    // The timestamp is displayed in 12-hour format with AM/PM
    expect(screen.getByText('02:30 PM')).toBeInTheDocument();
  });

  it('handles mixed message types correctly', () => {
    const mixedMessages: Message[] = [
      { role: 'system', content: 'System' },
      { role: 'assistant', content: 'Assistant message' },
      { role: 'user', content: 'User message' },
      { role: 'assistant', content: 'Another assistant message', timestamp: new Date() },
    ];
    
    render(<ChatMessages messages={mixedMessages} isLoading={false} />);
    
    // Should show 3 messages (excluding system)
    expect(screen.getByText('Assistant message')).toBeInTheDocument();
    expect(screen.getByText('User message')).toBeInTheDocument();
    expect(screen.getByText('Another assistant message')).toBeInTheDocument();
    expect(screen.queryByText('System')).not.toBeInTheDocument();
  });
});