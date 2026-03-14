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
  // Simple layout -> "Netrunner Core"
  simple: {
    layout: {
      containerClass: "flex flex-col w-full min-h-[297mm] bg-[#0f1219] text-[#f1f5f9] font-sans",
      contentClass: "space-y-6 p-10 relative z-10 before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzYmQ0ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] before:z-[-1]",
    },
    personalInfo: {
      containerClass: "flex flex-col border-b border-[#3bd4f5]/20 pb-8 relative",
      titleClass: "text-3xl font-display font-bold text-[#f1f5f9] tracking-widest uppercase",
      subtitleClass: "text-sm text-[#3bd4f5] font-tech uppercase tracking-[0.2em] mt-2",
      gridClass: "flex flex-row items-start mt-6 gap-8",
      infoContainerClass: "flex-1 min-w-0",
      avatarContainerClass: "w-24 h-24 overflow-hidden border border-[#3bd4f5]/50 p-1 bg-[#3bd4f5]/5 rounded-sm shrink-0",
      contactContainerClass: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4",
      contactItemClass: "text-xs text-[#f1f5f9]/80 flex items-center font-mono break-all",
      labelClass: "font-medium text-[#3bd4f5]/70 uppercase w-20 shrink-0 tracking-wider",
      valueClass: "text-[#f1f5f9] break-words",
    },
    section: {
      containerClass: "border-b border-[#3bd4f5]/10 pb-8 mt-8",
      titleClass: "text-base font-display text-[#3bd4f5] uppercase tracking-[0.15em] mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#3bd4f5]/10 after:ml-4",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "border-b border-[#3bd4f5]/10 pb-8 mt-8",
      titleClass: "text-base font-display text-[#3bd4f5] uppercase tracking-[0.15em] mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#3bd4f5]/10 after:ml-4",
      entryClass: "mb-6 relative pl-4 border-l border-[#3bd4f5]/20",
      jobTitleClass: "text-base font-bold text-[#f1f5f9] tracking-wide",
      companyClass: "text-sm text-[#3bd4f5]/90 font-tech tracking-wider uppercase mt-1",
      periodClass: "text-xs text-[#f1f5f9]/50 mb-3 font-mono mt-1",
      descriptionClass: "text-sm text-[#f1f5f9]/80 leading-relaxed font-light",
    },
    education: {
      containerClass: "border-b border-[#3bd4f5]/10 pb-8 mt-8",
      titleClass: "text-base font-display text-[#3bd4f5] uppercase tracking-[0.15em] mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#3bd4f5]/10 after:ml-4",
      entryClass: "mb-6 relative pl-4 border-l border-[#3b82f6]/20",
      institutionClass: "text-base font-bold text-[#f1f5f9] tracking-wide",
      degreeClass: "text-sm text-[#3bd4f5]/90 font-tech tracking-wider uppercase mt-1",
      periodClass: "text-xs text-[#f1f5f9]/50 font-mono mt-1",
    },
    skills: {
      containerClass: "pb-8 mt-8",
      titleClass: "text-base font-display text-[#3bd4f5] uppercase tracking-[0.15em] mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#3bd4f5]/10 after:ml-4",
      skillsListClass: "flex flex-wrap gap-2",
      skillItemClass: "text-xs border border-[#3bd4f5]/30 bg-[#3bd4f5]/5 text-[#3bd4f5] px-3 py-1.5 uppercase tracking-wider rounded-sm",
    },
  },
  
  // Centered layout -> "Neon City"
  centered: {
    layout: {
      containerClass: "flex flex-col w-full min-h-[297mm] bg-[#151922] text-[#f1f5f9] font-sans",
      contentClass: "space-y-10",
    },
    personalInfo: {
      containerClass: "bg-gradient-to-b from-[#0f1219] to-[#151922] border-b border-[#9b72d1]/30 p-12 text-center relative overflow-hidden",
      titleClass: "text-4xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#3bd4f5] to-[#9b72d1] uppercase tracking-widest",
      subtitleClass: "text-[#f1f5f9]/70 text-sm tracking-[0.3em] font-tech uppercase mt-4",
      gridClass: "flex flex-col items-center mt-6",
      infoContainerClass: "text-center relative z-10",
      avatarContainerClass: "w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border border-[#9b72d1]/50 shadow-[0_0_15px_rgba(155,114,209,0.15)]",
      contactContainerClass: "flex justify-center flex-wrap gap-x-8 gap-y-3 mt-8",
      contactItemClass: "text-xs text-[#f1f5f9]/80 flex items-center space-x-2 font-mono px-4 py-1.5 border border-[#3bd4f5]/20 rounded-full bg-[#0f1219]/50",
      labelClass: "sr-only",
      valueClass: "text-[#f1f5f9]",
    },
    section: {
      containerClass: "px-12 py-2",
      titleClass: "text-lg font-display font-medium text-center text-[#f1f5f9] uppercase tracking-widest pb-4 mb-8 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-[1px] after:bg-[#9b72d1]",
      contentClass: "space-y-8 max-w-4xl mx-auto",
    },
    workExperience: {
      containerClass: "px-12 py-2",
      titleClass: "text-lg font-display font-medium text-center text-[#f1f5f9] uppercase tracking-widest pb-4 mb-8 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-[1px] after:bg-[#9b72d1]",
      entryClass: "mb-8 p-6 bg-[#0f1219]/40 border border-[#3bd4f5]/10 rounded-sm hover:border-[#3bd4f5]/30 transition-colors",
      jobTitleClass: "text-lg font-medium text-[#3bd4f5] tracking-wide",
      companyClass: "text-sm text-[#9b72d1] font-tech tracking-wider uppercase mt-1",
      periodClass: "text-xs text-[#f1f5f9]/50 font-mono mb-4 block mt-2",
      descriptionClass: "text-sm text-[#f1f5f9]/80 leading-relaxed font-light",
    },
    education: {
      containerClass: "px-12 py-2",
      titleClass: "text-lg font-display font-medium text-center text-[#f1f5f9] uppercase tracking-widest pb-4 mb-8 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-[1px] after:bg-[#9b72d1]",
      entryClass: "mb-8 p-6 bg-[#0f1219]/40 border border-[#3bd4f5]/10 rounded-sm text-center",
      institutionClass: "text-lg font-medium text-[#3bd4f5] tracking-wide",
      degreeClass: "text-sm text-[#9b72d1] font-tech tracking-wider uppercase mt-2",
      periodClass: "text-xs text-[#f1f5f9]/50 font-mono mt-3 block",
    },
    skills: {
      containerClass: "px-12 py-2 mb-12",
      titleClass: "text-lg font-display font-medium text-center text-[#f1f5f9] uppercase tracking-widest pb-4 mb-8 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-[1px] after:bg-[#9b72d1]",
      skillsListClass: "flex flex-wrap justify-center gap-3 max-w-3xl mx-auto",
      skillItemClass: "px-4 py-2 bg-[#0f1219] text-[#f1f5f9] border border-[#3bd4f5]/30 font-mono text-xs uppercase hover:bg-[#3bd4f5]/10 transition-colors rounded-sm",
    },
  },
  
  // Sidebar layout -> "Corpo DB"
  sidebar: {
    layout: {
      containerClass: "flex flex-row w-full min-h-[297mm] bg-[#f8fafc] text-[#0f1219] font-sans",
      contentClass: "flex flex-row",
    },
    personalInfo: {
      containerClass: "bg-[#0f1219] text-[#f1f5f9] p-10 w-[32%] min-w-[280px] min-h-[297mm] shadow-xl relative z-10",
      titleClass: "text-2xl font-display font-medium text-[#f1f5f9] uppercase tracking-widest break-words",
      subtitleClass: "text-[#3bd4f5] font-tech text-sm tracking-[0.2em] uppercase mt-3",
      gridClass: "flex flex-col mt-10",
      infoContainerClass: "space-y-6",
      avatarContainerClass: "w-full aspect-square mb-8 overflow-hidden border border-[#3bd4f5]/30 grayscale hover:grayscale-0 transition-all duration-500 rounded-sm",
      contactContainerClass: "space-y-5 mt-10 pt-8 border-t border-[#f1f5f9]/10",
      contactItemClass: "text-xs text-[#f1f5f9]/80 flex flex-col space-y-1.5 font-mono",
      labelClass: "text-[#9b72d1] uppercase tracking-widest text-[10px]",
      valueClass: "text-[#f1f5f9]",
    },
    section: {
      containerClass: "mb-10",
      titleClass: "text-sm font-display font-medium uppercase tracking-[0.2em] text-[#0f1219] mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0f1219]/10 after:ml-4",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "p-12 w-[68%] bg-[#f8fafc]",
      titleClass: "text-sm font-display font-medium uppercase tracking-[0.2em] text-[#0f1219] mb-8 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0f1219]/10 after:ml-4",
      entryClass: "mb-8",
      jobTitleClass: "text-lg font-medium text-[#0f1219] uppercase tracking-wide",
      companyClass: "text-sm font-tech text-[#3b82f6] font-bold tracking-widest mt-1 uppercase",
      periodClass: "text-xs bg-[#0f1219]/5 text-[#0f1219]/70 px-2 py-1 inline-block font-mono my-3 rounded-sm",
      descriptionClass: "text-sm text-[#0f1219]/80 leading-relaxed font-light",
    },
    education: {
      containerClass: "mb-10",
      titleClass: "text-sm font-display font-medium uppercase tracking-[0.2em] text-[#0f1219] mb-8 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0f1219]/10 after:ml-4",
      entryClass: "mb-6",
      institutionClass: "text-lg font-medium text-[#0f1219] uppercase tracking-wide",
      degreeClass: "text-sm font-tech text-[#3b82f6] font-bold tracking-widest mt-1 uppercase",
      periodClass: "text-xs text-[#0f1219]/50 font-mono mt-2 block",
    },
    skills: {
      containerClass: "mt-10 pt-8 border-t border-[#f1f5f9]/10",
      titleClass: "text-[#3bd4f5] uppercase tracking-widest text-[10px] mb-5 block",
      skillsListClass: "flex flex-col gap-2.5",
      skillItemClass: "text-xs font-mono text-[#f1f5f9]/90 border-l-2 border-[#3bd4f5]/50 pl-2",
    },
  },
  
  // Modern layout -> "Wasteland Tech"
  modern: {
    layout: {
      containerClass: "flex flex-col w-full min-h-[297mm] bg-[#1e293b] text-[#f1f5f9] font-sans relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMWUyOTNiIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjM2JkNGY1IiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] before:opacity-50",
      contentClass: "space-y-6 p-6 md:p-12 relative z-10 max-w-5xl mx-auto",
    },
    personalInfo: {
      containerClass: "bg-[#0f1219] border border-[#3bd4f5]/20 p-10 shadow-lg relative overflow-visible rounded-sm",
      titleClass: "text-4xl font-display font-medium text-[#f1f5f9] uppercase tracking-wide",
      subtitleClass: "text-sm text-[#3bd4f5] font-tech font-bold uppercase tracking-[0.3em] mt-2",
      gridClass: "flex flex-col md:flex-row items-start md:items-center gap-8 mt-6",
      infoContainerClass: "flex-1",
      avatarContainerClass: "w-28 h-28 overflow-hidden border border-[#9b72d1]/50 -mt-4 md:-mt-14 bg-[#1e293b] z-20 absolute top-8 right-10 rounded-sm shadow-md",
      contactContainerClass: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-8 pt-6 border-t border-[#f1f5f9]/10",
      contactItemClass: "text-sm text-[#f1f5f9]/80 flex items-center space-x-3 font-mono",
      labelClass: "text-[#9b72d1] uppercase text-xs w-16",
      valueClass: "text-[#f1f5f9]",
    },
    section: {
      containerClass: "bg-[#0f1219]/90 border border-[#f1f5f9]/5 p-8 backdrop-blur-sm relative rounded-sm",
      titleClass: "text-lg font-display font-medium text-[#f1f5f9] uppercase tracking-[0.2em] border-l-2 border-[#3bd4f5] pl-4 mb-6",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "bg-[#0f1219]/90 border border-[#f1f5f9]/5 p-8 backdrop-blur-sm relative mb-6 rounded-sm",
      titleClass: "text-lg font-display font-medium text-[#f1f5f9] uppercase tracking-[0.2em] border-l-2 border-[#3bd4f5] pl-4 mb-8",
      entryClass: "relative pl-6 mb-8 border-l border-[#f1f5f9]/10 hover:border-[#3bd4f5]/50 transition-colors",
      jobTitleClass: "text-lg font-medium text-[#f1f5f9] tracking-wide",
      companyClass: "text-sm font-tech text-[#3bd4f5]/90 uppercase tracking-widest mt-1",
      periodClass: "text-xs font-mono text-[#f1f5f9]/50 mt-2 mb-3 inline-block",
      descriptionClass: "text-sm text-[#f1f5f9]/80 leading-relaxed font-light",
    },
    education: {
      containerClass: "bg-[#0f1219]/90 border border-[#f1f5f9]/5 p-8 backdrop-blur-sm relative mb-6 rounded-sm",
      titleClass: "text-lg font-display font-medium text-[#f1f5f9] uppercase tracking-[0.2em] border-l-2 border-[#9b72d1] pl-4 mb-8",
      entryClass: "relative pl-6 mb-6 border-l border-[#f1f5f9]/10",
      institutionClass: "text-lg font-medium text-[#f1f5f9] tracking-wide",
      degreeClass: "text-sm font-tech text-[#9b72d1]/90 uppercase tracking-widest mt-1",
      periodClass: "text-xs font-mono text-[#f1f5f9]/50 mt-2 block",
    },
    skills: {
      containerClass: "bg-[#0f1219]/90 border border-[#f1f5f9]/5 p-8 backdrop-blur-sm relative rounded-sm",
      titleClass: "text-lg font-display font-medium text-[#f1f5f9] uppercase tracking-[0.2em] border-l-2 border-[#eab308]/70 pl-4 mb-6",
      skillsListClass: "flex flex-wrap gap-2.5",
      skillItemClass: "px-4 py-1.5 bg-[#1e293b]/50 text-[#f1f5f9]/90 border border-[#f1f5f9]/10 font-mono text-xs uppercase rounded-sm",
    },
  },

  // Executive layout -> "Cyber-Executive"
  executive: {
    layout: {
      containerClass: "flex flex-col w-full min-h-[297mm] bg-[#0f1219] text-[#f1f5f9] font-sans",
      contentClass: "space-y-10 p-10 max-w-6xl mx-auto relative z-10",
    },
    personalInfo: {
      containerClass: "relative bg-[#151922] p-10 border-l-4 border-[#3bd4f5] shadow-sm",
      titleClass: "text-4xl font-display font-light text-[#f1f5f9] tracking-wider mb-2",
      subtitleClass: "text-base font-tech text-[#3bd4f5] tracking-[0.3em] uppercase",
      gridClass: "flex flex-col md:flex-row items-center md:items-start gap-8 mt-8",
      infoContainerClass: "flex-1 space-y-6 w-full min-w-0",
      avatarContainerClass: "w-32 h-32 shrink-0 overflow-hidden border border-[#3bd4f5]/30 p-1 bg-[#3bd4f5]/5 rounded-sm",
      contactContainerClass: "grid grid-cols-1 gap-y-3 gap-x-4 mt-8 pt-8 border-t border-[#f1f5f9]/10",
      contactItemClass: "text-xs text-[#f1f5f9]/80 flex items-center space-x-3 font-mono break-all",
      labelClass: "text-[#3bd4f5]/60 uppercase tracking-widest text-xs w-20 shrink-0",
      valueClass: "text-[#f1f5f9] font-light break-words",
    },
    section: {
      containerClass: "relative",
      titleClass: "text-xl font-display font-light text-[#f1f5f9] uppercase tracking-[0.25em] mb-8 pb-4 border-b border-[#f1f5f9]/10 relative flex items-center before:content-[''] before:w-2 before:h-2 before:bg-[#3bd4f5] before:mr-4",
      contentClass: "space-y-8",
    },
    workExperience: {
      containerClass: "relative mt-12",
      titleClass: "text-xl font-display font-light text-[#f1f5f9] uppercase tracking-[0.25em] mb-8 pb-4 border-b border-[#f1f5f9]/10 relative flex items-center before:content-[''] before:w-2 before:h-2 before:bg-[#3bd4f5] before:mr-4",
      entryClass: "relative grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-x-8 gap-y-2 mb-10",
      jobTitleClass: "text-xl font-medium text-[#f1f5f9] tracking-wide mb-1",
      companyClass: "text-sm text-[#3b82f6] font-tech tracking-widest uppercase mb-4",
      periodClass: "text-sm font-mono text-[#f1f5f9]/50 lg:text-right w-full block shrink-0",
      descriptionClass: "text-sm text-[#f1f5f9]/80 leading-relaxed font-light",
    },
    education: {
      containerClass: "relative mt-12",
      titleClass: "text-xl font-display font-light text-[#f1f5f9] uppercase tracking-[0.25em] mb-8 pb-4 border-b border-[#f1f5f9]/10 relative flex items-center before:content-[''] before:w-2 before:h-2 before:bg-[#3bd4f5] before:mr-4",
      entryClass: "relative grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-x-8 gap-y-2 mb-8",
      institutionClass: "text-xl font-medium text-[#f1f5f9] tracking-wide mb-1",
      degreeClass: "text-sm text-[#9b72d1] font-tech tracking-widest uppercase mb-4",
      periodClass: "text-sm font-mono text-[#f1f5f9]/50 lg:text-right w-full block shrink-0",
    },
    skills: {
      containerClass: "relative mt-12",
      titleClass: "text-xl font-display font-light text-[#f1f5f9] uppercase tracking-[0.25em] mb-8 pb-4 border-b border-[#f1f5f9]/10 relative flex items-center before:content-[''] before:w-2 before:h-2 before:bg-[#3bd4f5] before:mr-4",
      skillsListClass: "flex flex-wrap gap-3",
      skillItemClass: "px-5 py-2 border border-[#3bd4f5]/20 bg-[#3bd4f5]/5 text-[#3bd4f5] font-mono text-xs uppercase hover:bg-[#3bd4f5]/10 transition-colors duration-300 rounded-sm",
    },
  },
};