import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme, themes, ThemeName } from './ThemeContext';

// Test component that uses the theme context
const TestComponent = () => {
  const { currentTheme, setTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="current-theme">{currentTheme}</div>
      <button onClick={() => setTheme('centered')} data-testid="set-centered">
        Set Centered
      </button>
      <button onClick={() => setTheme('sidebar')} data-testid="set-sidebar">
        Set Sidebar
      </button>
      <button onClick={() => setTheme('classic')} data-testid="set-classic">
        Set Classic
      </button>
      <button onClick={() => setTheme('executive')} data-testid="set-executive">
        Set Executive
      </button>
    </div>
  );
};

// Component to test theme outside provider
const ComponentWithoutProvider = () => {
  const { currentTheme, setTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-without-provider">{currentTheme}</div>
      <button onClick={() => setTheme('centered')} data-testid="set-theme-no-provider">
        Set Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  describe('ThemeProvider', () => {
    it('provides default theme value', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('classic');
    });

    it('allows theme changes', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('classic');
      
      await user.click(screen.getByTestId('set-centered'));
      expect(screen.getByTestId('current-theme')).toHaveTextContent('centered');
      
      await user.click(screen.getByTestId('set-sidebar'));
      expect(screen.getByTestId('current-theme')).toHaveTextContent('sidebar');
    });

    it('handles multiple theme changes', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      const currentThemeElement = screen.getByTestId('current-theme');
      
      await user.click(screen.getByTestId('set-centered'));
      expect(currentThemeElement).toHaveTextContent('centered');
      
      await user.click(screen.getByTestId('set-classic'));
      expect(currentThemeElement).toHaveTextContent('classic');

      await user.click(screen.getByTestId('set-executive'));
      expect(currentThemeElement).toHaveTextContent('executive');
    });
  });

  describe('useTheme hook', () => {
    it('returns default values when used outside provider', () => {
      render(<ComponentWithoutProvider />);
      
      expect(screen.getByTestId('theme-without-provider')).toHaveTextContent('classic');
    });

    it('provides functional setTheme even outside provider', async () => {
      const user = userEvent.setup();
      
      render(<ComponentWithoutProvider />);
      
      // The setTheme function should exist and be callable (though it won't change state)
      const setThemeButton = screen.getByTestId('set-theme-no-provider');
      expect(setThemeButton).toBeInTheDocument();
      
      // Should not throw error when clicked
      await user.click(setThemeButton);
    });
  });

  describe('Theme configurations', () => {
    it('has all required theme names', () => {
      const expectedThemes: ThemeName[] = ['classic', 'centered', 'executive'];
      
      expectedThemes.forEach(themeName => {
        expect(themes[themeName]).toBeDefined();
      });
    });

    it('has consistent structure across all themes', () => {
      const requiredSections = [
        'layout',
        'personalInfo', 
        'section',
        'workExperience',
        'education',
        'skills'
      ];
      
      Object.keys(themes).forEach(themeName => {
        const theme = themes[themeName as ThemeName];
        
        requiredSections.forEach(section => {
          expect(theme[section as keyof typeof theme]).toBeDefined();
        });
      });
    });

    it('has required layout properties', () => {
      Object.keys(themes).forEach(themeName => {
        const theme = themes[themeName as ThemeName];
        
        expect(theme.layout.containerClass).toBeDefined();
        expect(theme.layout.contentClass).toBeDefined();
      });
    });

    it('has required personal info properties', () => {
      const requiredPersonalInfoProps = [
        'containerClass',
        'titleClass',
        'subtitleClass',
        'gridClass',
        'infoContainerClass',
        'avatarContainerClass',
        'contactContainerClass',
        'contactItemClass',
        'labelClass',
        'valueClass'
      ];
      
      Object.keys(themes).forEach(themeName => {
        const theme = themes[themeName as ThemeName];
        
        requiredPersonalInfoProps.forEach(prop => {
          expect(theme.personalInfo[prop as keyof typeof theme.personalInfo]).toBeDefined();
        });
      });
    });

    it('has required work experience properties', () => {
      const requiredWorkProps = [
        'containerClass',
        'titleClass',
        'entryClass',
        'jobTitleClass',
        'companyClass',
        'periodClass',
        'descriptionClass'
      ];
      
      Object.keys(themes).forEach(themeName => {
        const theme = themes[themeName as ThemeName];
        
        requiredWorkProps.forEach(prop => {
          expect(theme.workExperience[prop as keyof typeof theme.workExperience]).toBeDefined();
        });
      });
    });

    it('has required education properties', () => {
      const requiredEducationProps = [
        'containerClass',
        'titleClass',
        'entryClass',
        'institutionClass',
        'degreeClass',
        'periodClass'
      ];
      
      Object.keys(themes).forEach(themeName => {
        const theme = themes[themeName as ThemeName];
        
        requiredEducationProps.forEach(prop => {
          expect(theme.education[prop as keyof typeof theme.education]).toBeDefined();
        });
      });
    });

    it('has required skills properties', () => {
      const requiredSkillsProps = [
        'containerClass',
        'titleClass',
        'skillsListClass',
        'skillItemClass'
      ];
      
      Object.keys(themes).forEach(themeName => {
        const theme = themes[themeName as ThemeName];
        
        requiredSkillsProps.forEach(prop => {
          expect(theme.skills[prop as keyof typeof theme.skills]).toBeDefined();
        });
      });
    });
  });

  describe('Theme-specific tests', () => {
    it('classic theme has linear design styling', () => {
      const classicTheme = themes.classic;
      expect(classicTheme.layout.containerClass).toContain('bg-[#050506]');
      expect(classicTheme.personalInfo.titleClass).toContain('text-4xl');
    });

    it('executive theme has sophisticated styling', () => {
      const executiveTheme = themes.executive;
      expect(executiveTheme.personalInfo.titleClass).toContain('text-5xl');
      expect(executiveTheme.layout.containerClass).toContain('bg-[#020203]');
    });

    it('centered theme has center alignment for grid', () => {
      const centeredTheme = themes.centered;
      expect(centeredTheme.personalInfo.titleClass).toContain('text-center');
      expect(centeredTheme.personalInfo.gridClass).toContain('items-center');
    });
  });
});