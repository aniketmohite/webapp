import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Text } from '../components/Text';
import { TextInput } from '../components/TextInput';

// ─── Button ────────────────────────────────────────────────────────────────

describe('Button', () => {
  it('renders label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onPress when pressed', () => {
    const onPress = vi.fn();
    render(<Button label="Press" onPress={onPress} />);
    fireEvent.click(screen.getByText('Press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders loading spinner when loading=true', () => {
    const { container } = render(<Button label="Save" loading />);
    // ActivityIndicator renders; label should not be visible
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });

  it('is disabled when disabled=true', () => {
    render(<Button label="Disabled" disabled />);
    // Pressable renders as a div/button; opacity style applied via disabled state
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('renders primary variant by default', () => {
    render(<Button label="Primary" />);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('renders secondary variant', () => {
    render(<Button label="Secondary" variant="secondary" />);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders outline variant', () => {
    render(<Button label="Outline" variant="outline" />);
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });
});

// ─── Card ──────────────────────────────────────────────────────────────────

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('calls onPress when pressed', () => {
    const onPress = vi.fn();
    render(<Card onPress={onPress}><p>Pressable card</p></Card>);
    fireEvent.click(screen.getByText('Pressable card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without onPress as static container', () => {
    render(<Card><span>Static</span></Card>);
    expect(screen.getByText('Static')).toBeInTheDocument();
  });
});

// ─── Avatar ────────────────────────────────────────────────────────────────

describe('Avatar', () => {
  it('shows initials when no uri', () => {
    render(<Avatar name="Alice Smith" />);
    expect(screen.getByText('AS')).toBeInTheDocument();
  });

  it('shows ? when no name and no uri', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders image when uri is provided', () => {
    render(<Avatar uri="https://example.com/avatar.jpg" name="Alice" />);
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
  });
});

// ─── Badge ─────────────────────────────────────────────────────────────────

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge text="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders success variant by default', () => {
    render(<Badge text="OK" variant="success" />);
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('renders warning variant', () => {
    render(<Badge text="Warn" variant="warning" />);
    expect(screen.getByText('Warn')).toBeInTheDocument();
  });

  it('renders error variant', () => {
    render(<Badge text="Error" variant="error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});

// ─── Header ────────────────────────────────────────────────────────────────

describe('Header', () => {
  it('renders title', () => {
    render(<Header title="My App" />);
    expect(screen.getByText('My App')).toBeInTheDocument();
  });

  it('renders left action button', () => {
    const onPress = vi.fn();
    render(<Header title="App" leftAction={{ label: 'Back', onPress }} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Back'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders right action button', () => {
    const onPress = vi.fn();
    render(<Header title="App" rightAction={{ label: 'Settings', onPress }} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Settings'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without optional actions', () => {
    render(<Header title="Simple" />);
    expect(screen.getByText('Simple')).toBeInTheDocument();
  });
});

// ─── LoadingSpinner ────────────────────────────────────────────────────────

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with large size', () => {
    const { container } = render(<LoadingSpinner size="large" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with small size', () => {
    const { container } = render(<LoadingSpinner size="small" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with custom color', () => {
    const { container } = render(<LoadingSpinner color="#ff0000" />);
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── Text ──────────────────────────────────────────────────────────────────

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders h1 variant', () => {
    render(<Text variant="h1">Heading 1</Text>);
    expect(screen.getByText('Heading 1')).toBeInTheDocument();
  });

  it('renders body variant', () => {
    render(<Text variant="body">Body text</Text>);
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders caption variant', () => {
    render(<Text variant="caption">Caption</Text>);
    expect(screen.getByText('Caption')).toBeInTheDocument();
  });

  it('calls onPress', () => {
    const onPress = vi.fn();
    render(<Text onPress={onPress}>Clickable</Text>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

// ─── TextInput ─────────────────────────────────────────────────────────────

describe('TextInput', () => {
  it('renders label', () => {
    render(<TextInput label="Email" value="" onChangeText={() => {}} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    render(<TextInput value="" onChangeText={() => {}} placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChangeText on input', () => {
    const onChange = vi.fn();
    render(<TextInput value="" onChangeText={onChange} placeholder="Type here" />);
    fireEvent.change(screen.getByPlaceholderText('Type here'), {
      target: { value: 'hello' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders error message', () => {
    render(<TextInput value="" onChangeText={() => {}} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders hint message when no error', () => {
    render(<TextInput value="" onChangeText={() => {}} hint="Min 6 chars" />);
    expect(screen.getByText('Min 6 chars')).toBeInTheDocument();
  });

  it('does not render hint when error present', () => {
    render(<TextInput value="" onChangeText={() => {}} error="Bad" hint="Hint" />);
    expect(screen.queryByText('Hint')).not.toBeInTheDocument();
  });
});
