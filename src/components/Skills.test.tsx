import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Skills } from './Skills';

describe('Skills Component', () => {
  const defaultProps = {
    skills: ['JavaScript', 'React', 'TypeScript'],
    onChange: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Skills {...defaultProps} />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('displays existing skills', () => {
    render(<Skills {...defaultProps} />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders add skill form', () => {
    render(<Skills {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Add a skill')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('adds a new skill when form is submitted', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    const addButton = screen.getByText('Add');
    
    await user.type(input, 'Python');
    await user.click(addButton);
    
    expect(onChange).toHaveBeenCalledWith(['JavaScript', 'React', 'TypeScript', 'Python']);
  });

  it('adds skill by pressing Enter key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, 'Node.js');
    await user.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalledWith(['JavaScript', 'React', 'TypeScript', 'Node.js']);
  });

  it('clears input after adding a skill', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, 'Python');
    await user.keyboard('{Enter}');
    
    expect(input).toHaveValue('');
  });

  it('prevents adding duplicate skills', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, 'JavaScript'); // Already exists
    await user.keyboard('{Enter}');
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('prevents adding empty skills', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    const addButton = screen.getByText('Add');
    
    await user.click(addButton); // Submit without typing
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('trims whitespace from new skills', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, '  Python  ');
    await user.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalledWith(['JavaScript', 'React', 'TypeScript', 'Python']);
  });

  it('removes a skill when X button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    // Find the X button for the "React" skill
    const reactSkill = screen.getByText('React').closest('span');
    const removeButton = reactSkill?.querySelector('button');
    
    expect(removeButton).toBeInTheDocument();
    await user.click(removeButton!);
    
    expect(onChange).toHaveBeenCalledWith(['JavaScript', 'TypeScript']);
  });

  it('handles empty skills array', () => {
    render(<Skills skills={[]} onChange={vi.fn()} />);
    
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a skill')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('renders skills with remove buttons', () => {
    render(<Skills {...defaultProps} />);
    
    const skills = ['JavaScript', 'React', 'TypeScript'];
    
    skills.forEach(skill => {
      const skillElement = screen.getByText(skill);
      const container = skillElement.closest('span');
      const removeButton = container?.querySelector('button');
      
      expect(skillElement).toBeInTheDocument();
      expect(removeButton).toBeInTheDocument();
    });
  });

  it('updates input value as user types', async () => {
    const user = userEvent.setup();
    
    render(<Skills {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, 'Python');
    
    expect(input).toHaveValue('Python');
  });

  it('handles case sensitivity correctly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, 'javascript'); // Different case
    await user.keyboard('{Enter}');
    
    // Should add because it's case-sensitive
    expect(onChange).toHaveBeenCalledWith(['JavaScript', 'React', 'TypeScript', 'javascript']);
  });

  it('maintains focus on input after adding skill', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, 'Python');
    await user.keyboard('{Enter}');
    
    // Input should still be focused for adding more skills
    expect(input).toHaveFocus();
  });

  it('handles special characters in skills', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Skills {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Add a skill');
    
    await user.type(input, 'C++');
    await user.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalledWith(['JavaScript', 'React', 'TypeScript', 'C++']);
  });
});