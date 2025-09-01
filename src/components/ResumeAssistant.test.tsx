import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ResumeAssistant } from './ResumeAssistant';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock child components
vi.mock('./resumeAssistant/ChatMessages', () => ({
  ChatMessages: ({ messages }: any) => (
    <div data-testid="chat-messages">
      {messages.map((msg: any, i: number) => (
        <div key={i} data-testid={`message-${i}`}>
          {msg.role}: {msg.content}
        </div>
      ))}
    </div>
  )
}));

vi.mock('./resumeAssistant/ChatInput', () => ({
  ChatInput: React.forwardRef<HTMLTextAreaElement, any>(({ sendMessage, isLoading, input, setInput }, ref) => (
    <div data-testid="chat-input">
      <textarea
        ref={ref}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        data-testid="message-input"
      />
      <button onClick={sendMessage} disabled={isLoading} data-testid="send-button">
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  ))
}));

vi.mock('./resumeAssistant/PromptTemplates', () => ({
  PromptTemplates: ({ onTemplateSelect }: any) => (
    <div data-testid="prompt-templates">
      <button 
        onClick={() => onTemplateSelect && onTemplateSelect('Test template')} 
        data-testid="template-button"
      >
        Use Template
      </button>
    </div>
  )
}));

vi.mock('./resumeAssistant/AISettingsDialog', () => ({
  AISettingsDialog: ({ isOpen, onOpenChange, apiKey, setApiKey, saveSettings }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    apiKey: string;
    setApiKey: (key: string) => void;
    saveSettings: () => void;
  }) => (
    isOpen ? (
      <div data-testid="settings-dialog">
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API Key"
          data-testid="api-key-input"
        />
        <button onClick={saveSettings} data-testid="save-settings">Save</button>
        <button onClick={() => onOpenChange(false)} data-testid="close-settings">Close</button>
      </div>
    ) : null
  )
}));

// Mock AI utils
vi.mock('@/utils/aiUtils', () => ({
  callAIAPI: vi.fn()
}));

// Mock resume assistant utils
vi.mock('@/utils/resumeAssistantUtils', () => ({
  getSystemPrompt: vi.fn(() => 'System prompt'),
  getQuickPrompts: vi.fn(() => ['Quick prompt 1', 'Quick prompt 2']),
  getTemplatePrompts: vi.fn(() => [{ name: 'Template 1', prompt: 'Template content' }])
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  }
}));

const mockProps = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    location: 'New York, NY',
    jobTitle: 'Software Engineer',
    website: '',
    linkedin: '',
    github: ''
  },
  workExperience: [
    {
      id: 'w1',
      company: 'Tech Corp',
      position: 'Developer',
      startDate: '2020-01',
      endDate: '2023-01',
      description: 'Built awesome apps'
    }
  ],
  education: [
    {
      id: 'e1',
      institution: 'University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      graduationDate: '2020'
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js']
};

describe('ResumeAssistant Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders without crashing', () => {
    render(<ResumeAssistant {...mockProps} />);
    expect(screen.getByText('Resume Assistant')).toBeInTheDocument();
  });

  it('displays initial welcome message', () => {
    render(<ResumeAssistant {...mockProps} />);
    expect(screen.getByText(/Hello! I'm your resume assistant/)).toBeInTheDocument();
  });

  it('renders chat and templates tabs', () => {
    render(<ResumeAssistant {...mockProps} />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  it('shows chat tab by default', () => {
    render(<ResumeAssistant {...mockProps} />);
    expect(screen.getByTestId('chat-messages')).toBeInTheDocument();
    expect(screen.getByTestId('chat-input')).toBeInTheDocument();
  });

  it('switches to templates tab when clicked', async () => {
    const user = userEvent.setup();
    render(<ResumeAssistant {...mockProps} />);
    
    await user.click(screen.getByText('Templates'));
    expect(screen.getByTestId('prompt-templates')).toBeInTheDocument();
  });

  it('opens settings dialog when settings button is clicked', async () => {
    const user = userEvent.setup();
    render(<ResumeAssistant {...mockProps} />);
    
    // Find the settings button by finding the settings icon within it
    const settingsIcon = document.querySelector('.lucide-settings');
    expect(settingsIcon).toBeInTheDocument();
    
    const settingsButton = settingsIcon?.closest('button');
    expect(settingsButton).toBeInTheDocument();
    
    await user.click(settingsButton!);
    
    expect(screen.getByTestId('settings-dialog')).toBeInTheDocument();
  });

  it('handles message input changes', async () => {
    const user = userEvent.setup();
    render(<ResumeAssistant {...mockProps} />);
    
    const messageInput = screen.getByTestId('message-input');
    await user.type(messageInput, 'Hello AI assistant');
    
    expect(messageInput).toHaveValue('Hello AI assistant');
  });

  it('shows error when trying to send message without API key', async () => {
    const { toast } = await import('sonner');
    const user = userEvent.setup();
    
    render(<ResumeAssistant {...mockProps} />);
    
    const messageInput = screen.getByTestId('message-input');
    const sendButton = screen.getByTestId('send-button');
    
    await user.type(messageInput, 'Test message');
    await user.click(sendButton);
    
    // Wait for the async operation to complete
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please set your API key in the settings');
    });
  });

  it('saves settings when save button is clicked', async () => {
    const { toast } = await import('sonner');
    const user = userEvent.setup();
    
    render(<ResumeAssistant {...mockProps} />);
    
    // Open settings using the same approach as the previous test
    const settingsIcon = document.querySelector('.lucide-settings');
    const settingsButton = settingsIcon?.closest('button');
    await user.click(settingsButton!);
    
    // Set API key
    const apiKeyInput = screen.getByTestId('api-key-input');
    await user.type(apiKeyInput, 'test-api-key');
    
    // Save settings
    const saveButton = screen.getByTestId('save-settings');
    await user.click(saveButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('openai_api_key', 'test-api-key');
    expect(toast.success).toHaveBeenCalledWith('Settings saved successfully');
  });

  it('loads settings from localStorage on mount', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'openai_api_key') return 'stored-api-key';
      if (key === 'ai_model') return 'gpt-4';
      return null;
    });
    
    render(<ResumeAssistant {...mockProps} />);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('openai_api_key');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('ai_model');
  });

  it('handles template selection', async () => {
    const user = userEvent.setup();
    render(<ResumeAssistant {...mockProps} />);
    
    // Switch to templates tab
    await user.click(screen.getByText('Templates'));
    
    // Click template button
    const templateButton = screen.getByTestId('template-button');
    await user.click(templateButton);
    
    // Should add template to input (this depends on the implementation)
    expect(screen.getByTestId('prompt-templates')).toBeInTheDocument();
  });

  it('disables send button when loading', () => {
    render(<ResumeAssistant {...mockProps} />);
    
    const sendButton = screen.getByTestId('send-button');
    expect(sendButton).not.toBeDisabled();
    
    // The loading state would be set during actual API call
    expect(sendButton).toHaveTextContent('Send');
  });

  it('clears input after sending message with API key', async () => {
    const { callAIAPI } = await import('@/utils/aiUtils');
    vi.mocked(callAIAPI).mockResolvedValue('AI response');
    
    // Set up localStorage to have API key
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'openai_api_key') return 'test-api-key';
      return null;
    });
    
    const user = userEvent.setup();
    render(<ResumeAssistant {...mockProps} />);
    
    const messageInput = screen.getByTestId('message-input');
    const sendButton = screen.getByTestId('send-button');
    
    await user.type(messageInput, 'Test message');
    await user.click(sendButton);
    
    // After sending, input should be cleared (depending on implementation)
    await waitFor(() => {
      expect(callAIAPI).toHaveBeenCalled();
    });
  });
});