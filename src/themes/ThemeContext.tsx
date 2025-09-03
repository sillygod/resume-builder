// src/themes/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define theme types
export type ThemeName = 'simple' | 'centered' | 'sidebar' | 'modern' | 'executive';

// Theme context type
interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'simple',
  setTheme: () => {},
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('simple');

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// Theme configuration
export interface ThemeConfig {
  layout: {
    containerClass: string;
    contentClass: string;
  };
  personalInfo: {
    containerClass: string;
    titleClass: string;
    subtitleClass: string;
    gridClass: string;
    infoContainerClass: string;
    avatarContainerClass: string;
    contactContainerClass: string;
    contactItemClass: string;
    labelClass: string;
    valueClass: string;
  };
  section: {
    containerClass: string;
    titleClass: string;
    contentClass: string;
  };
  workExperience: {
    containerClass: string;
    titleClass: string;
    entryClass: string;
    jobTitleClass: string;
    companyClass: string;
    periodClass: string;
    descriptionClass: string;
  };
  education: {
    containerClass: string;
    titleClass: string;
    entryClass: string;
    institutionClass: string;
    degreeClass: string;
    periodClass: string;
  };
  skills: {
    containerClass: string;
    titleClass: string;
    skillsListClass: string;
    skillItemClass: string;
  };
}

// Define themes
export const themes: Record<ThemeName, ThemeConfig> = {
  // Simple layout (left example in image)
  simple: {
    layout: {
      containerClass: "flex flex-col w-full h-full bg-white",
      contentClass: "space-y-4 p-6",
    },
    personalInfo: {
      containerClass: "flex flex-col border-b border-gray-200 pb-4",
      titleClass: "text-xl font-semibold text-gray-800",
      subtitleClass: "text-sm text-gray-600 mt-1",
      gridClass: "flex flex-row items-start mt-2 gap-4",
      infoContainerClass: "flex-1",
      avatarContainerClass: "w-20 h-20 overflow-hidden",
      contactContainerClass: "mt-2 space-y-1",
      contactItemClass: "text-xs text-gray-600 flex items-center",
      labelClass: "font-medium text-gray-700 w-28",
      valueClass: "text-gray-800",
    },
    section: {
      containerClass: "border-b border-gray-200 pb-4",
      titleClass: "text-sm font-medium text-blue-600 uppercase tracking-wider mb-3",
      contentClass: "space-y-4",
    },
    workExperience: {
      containerClass: "border-b border-gray-200 pb-4",
      titleClass: "text-sm font-medium text-blue-600 uppercase tracking-wider mb-3",
      entryClass: "mb-4",
      jobTitleClass: "text-base font-medium text-gray-800",
      companyClass: "text-sm text-gray-700",
      periodClass: "text-xs text-gray-500 mb-2",
      descriptionClass: "text-sm text-gray-600",
    },
    education: {
      containerClass: "border-b border-gray-200 pb-4",
      titleClass: "text-sm font-medium text-blue-600 uppercase tracking-wider mb-3",
      entryClass: "mb-4",
      institutionClass: "text-base font-medium text-gray-800",
      degreeClass: "text-sm text-gray-700",
      periodClass: "text-xs text-gray-500",
    },
    skills: {
      containerClass: "border-b border-gray-200 pb-4",
      titleClass: "text-sm font-medium text-blue-600 uppercase tracking-wider mb-3",
      skillsListClass: "flex flex-wrap gap-2",
      skillItemClass: "text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded",
    },
  },
  
  // Centered layout (middle example in image)
  centered: {
    layout: {
      containerClass: "flex flex-col w-full h-full bg-white",
      contentClass: "space-y-6",
    },
    personalInfo: {
      containerClass: "bg-blue-500 text-white p-6 text-center",
      titleClass: "text-2xl font-bold",
      subtitleClass: "text-white text-opacity-90 mt-1",
      gridClass: "flex flex-col items-center mt-2",
      infoContainerClass: "text-center",
      avatarContainerClass: "w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white",
      contactContainerClass: "flex justify-center space-x-4 mt-4",
      contactItemClass: "text-xs text-white flex items-center space-x-1",
      labelClass: "sr-only",
      valueClass: "text-white",
    },
    section: {
      containerClass: "px-6 py-4",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      contentClass: "space-y-4",
    },
    workExperience: {
      containerClass: "px-6 py-4",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      entryClass: "mb-6",
      jobTitleClass: "text-base font-semibold text-gray-800",
      companyClass: "text-sm text-gray-700",
      periodClass: "text-xs text-gray-500 mb-2",
      descriptionClass: "text-sm text-gray-600",
    },
    education: {
      containerClass: "px-6 py-4",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      entryClass: "mb-6",
      institutionClass: "text-base font-semibold text-gray-800",
      degreeClass: "text-sm text-gray-700",
      periodClass: "text-xs text-gray-500",
    },
    skills: {
      containerClass: "px-6 py-4",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      skillsListClass: "flex flex-wrap gap-2",
      skillItemClass: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs",
    },
  },
  
  // Sidebar layout (right example in image)
  sidebar: {
    layout: {
      containerClass: "flex flex-row w-full h-full bg-white",
      contentClass: "flex flex-row",
    },
    personalInfo: {
      containerClass: "bg-gray-800 text-white p-6 w-1/3 min-w-[280px] overflow-y-auto h-full",
      titleClass: "text-xl font-bold",
      subtitleClass: "text-white text-opacity-90 mt-1",
      gridClass: "flex flex-col mt-4",
      infoContainerClass: "space-y-4",
      avatarContainerClass: "w-24 h-24 mb-4 overflow-hidden rounded-full",
      contactContainerClass: "space-y-2 mt-4",
      contactItemClass: "text-xs text-white flex items-center space-x-2",
      labelClass: "font-medium text-gray-300",
      valueClass: "text-white",
    },
    section: {
      containerClass: "mb-6",
      titleClass: "text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3",
      contentClass: "space-y-3",
    },
    workExperience: {
      containerClass: "p-6 w-2/3",
      titleClass: "text-lg font-semibold text-gray-800 mb-4",
      entryClass: "mb-6",
      jobTitleClass: "text-base font-semibold text-gray-800",
      companyClass: "text-sm text-gray-700",
      periodClass: "text-xs text-gray-500 mb-2",
      descriptionClass: "text-sm text-gray-600",
    },
    education: {
      containerClass: "mb-6",
      titleClass: "text-lg font-semibold text-gray-800 mb-4",
      entryClass: "mb-4",
      institutionClass: "text-base font-semibold text-gray-800",
      degreeClass: "text-sm text-gray-700",
      periodClass: "text-xs text-gray-500",
    },
    skills: {
      containerClass: "mb-6 pt-6 border-t border-gray-600",
      titleClass: "text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4",
      skillsListClass: "flex flex-wrap gap-2",
      skillItemClass: "text-sm bg-gray-700 text-gray-200 px-3 py-1.5 rounded-md",
    },
  },
  
  // Modern layout (combination of the best elements)
  modern: {
    layout: {
      containerClass: "flex flex-col w-full h-full bg-white",
      contentClass: "space-y-6 p-6",
    },
    personalInfo: {
      containerClass: "bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 rounded-md",
      titleClass: "text-2xl font-bold",
      subtitleClass: "text-sm text-white text-opacity-90 mt-1",
      gridClass: "flex flex-row items-center gap-4 mt-2",
      infoContainerClass: "flex-1",
      avatarContainerClass: "w-20 h-20 overflow-hidden rounded-full border-2 border-white",
      contactContainerClass: "flex items-center space-x-4 mt-2",
      contactItemClass: "text-xs text-white flex items-center space-x-1",
      labelClass: "font-medium text-gray-100",
      valueClass: "text-white",
    },
    section: {
      containerClass: "bg-white rounded-md shadow-sm p-6",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      contentClass: "space-y-4",
    },
    workExperience: {
      containerClass: "bg-white rounded-md shadow-sm p-6",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      entryClass: "border-l-4 border-blue-500 pl-4 mb-6",
      jobTitleClass: "text-base font-semibold text-gray-800",
      companyClass: "text-sm text-gray-700",
      periodClass: "text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block mb-2",
      descriptionClass: "text-sm text-gray-600",
    },
    education: {
      containerClass: "bg-white rounded-md shadow-sm p-6",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      entryClass: "border-l-4 border-green-500 pl-4 mb-6",
      institutionClass: "text-base font-semibold text-gray-800",
      degreeClass: "text-sm text-gray-700",
      periodClass: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block",
    },
    skills: {
      containerClass: "bg-white rounded-md shadow-sm p-6",
      titleClass: "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4",
      skillsListClass: "flex flex-wrap gap-2",
      skillItemClass: "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs",
    },
  },

  // Executive layout - sophisticated C-suite professional design
  executive: {
    layout: {
      containerClass: "flex flex-col w-full h-full bg-gradient-to-br from-slate-50 to-white",
      contentClass: "space-y-8 p-8",
    },
    personalInfo: {
      containerClass: "relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-12 py-10 rounded-lg shadow-2xl border border-slate-700/20",
      titleClass: "text-4xl font-light tracking-wide text-white mb-2",
      subtitleClass: "text-lg font-normal text-slate-300 tracking-wide uppercase letter-spacing-2",
      gridClass: "flex flex-row items-center gap-8 mt-6",
      infoContainerClass: "flex-1 space-y-4",
      avatarContainerClass: "w-32 h-32 overflow-hidden rounded-full border-4 border-slate-600/30 shadow-xl ring-4 ring-slate-700/20",
      contactContainerClass: "flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-slate-700/30",
      contactItemClass: "text-sm text-slate-300 flex items-center space-x-2 font-light",
      labelClass: "font-medium text-slate-400",
      valueClass: "text-slate-200 font-light",
    },
    section: {
      containerClass: "bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 p-8 relative overflow-hidden",
      titleClass: "text-2xl font-light text-slate-800 uppercase tracking-widest mb-6 pb-3 border-b-2 border-gradient-to-r from-slate-800 via-slate-600 to-slate-800 relative",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 p-8 relative overflow-hidden",
      titleClass: "text-2xl font-light text-slate-800 uppercase tracking-widest mb-6 pb-3 border-b-2 border-slate-800 relative",
      entryClass: "relative border-l-4 border-gradient-to-b from-slate-700 to-slate-900 pl-6 mb-8 pb-6 border-b border-slate-200/60 last:border-b-0",
      jobTitleClass: "text-xl font-medium text-slate-900 mb-1 tracking-wide",
      companyClass: "text-base text-slate-700 font-light mb-2 tracking-wide",
      periodClass: "text-sm bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-1.5 rounded-full inline-block mb-3 font-light tracking-wide",
      descriptionClass: "text-base text-slate-600 leading-relaxed font-light",
    },
    education: {
      containerClass: "bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 p-8 relative overflow-hidden",
      titleClass: "text-2xl font-light text-slate-800 uppercase tracking-widest mb-6 pb-3 border-b-2 border-slate-800 relative",
      entryClass: "relative border-l-4 border-gradient-to-b from-slate-600 to-slate-800 pl-6 mb-6 pb-6 border-b border-slate-200/60 last:border-b-0",
      institutionClass: "text-xl font-medium text-slate-900 mb-1 tracking-wide",
      degreeClass: "text-base text-slate-700 font-light mb-2 tracking-wide",
      periodClass: "text-sm bg-gradient-to-r from-slate-700 to-slate-600 text-white px-4 py-1.5 rounded-full inline-block font-light tracking-wide",
    },
    skills: {
      containerClass: "bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 p-8 relative overflow-hidden",
      titleClass: "text-2xl font-light text-slate-800 uppercase tracking-widest mb-6 pb-3 border-b-2 border-slate-800 relative",
      skillsListClass: "flex flex-wrap gap-3",
      skillItemClass: "px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full text-sm font-light tracking-wide shadow-md hover:shadow-lg transition-all duration-300 border border-slate-600/20",
    },
  },
};