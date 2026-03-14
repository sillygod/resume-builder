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
      containerClass: "flex flex-col w-full h-full bg-[#050510] text-[#00ff9f] font-mono",
      contentClass: "space-y-4 p-8 relative z-10 before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMGZmOWYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] before:z-[-1]",
    },
    personalInfo: {
      containerClass: "flex flex-col border-b-2 border-[#00ff9f]/30 pb-6 relative",
      titleClass: "text-3xl font-display font-bold text-[#00ff9f] tracking-widest uppercase",
      subtitleClass: "text-sm text-[#00b8ff] font-tech uppercase tracking-[0.3em] mt-2",
      gridClass: "flex flex-row items-start mt-4 gap-6",
      infoContainerClass: "flex-1",
      avatarContainerClass: "w-24 h-24 overflow-hidden border border-[#00ff9f] p-1 bg-[#00ff9f]/10",
      contactContainerClass: "mt-4 space-y-2",
      contactItemClass: "text-xs text-[#00ff9f]/80 flex items-center",
      labelClass: "font-bold text-[#ff00e5] uppercase w-28 tracking-widest",
      valueClass: "text-[#d1d1e9]",
    },
    section: {
      containerClass: "border-b border-[#00ff9f]/20 pb-6 mt-6",
      titleClass: "text-lg font-display text-[#ff00e5] uppercase tracking-[0.2em] mb-4 flex items-center before:content-['//'] before:mr-2 before:text-[#00ff9f]",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "border-b border-[#00ff9f]/20 pb-6 mt-6",
      titleClass: "text-lg font-display text-[#ff00e5] uppercase tracking-[0.2em] mb-4 flex items-center before:content-['//'] before:mr-2 before:text-[#00ff9f]",
      entryClass: "mb-6 relative pl-4 border-l border-[#00ff9f]/30",
      jobTitleClass: "text-base font-bold text-[#00b8ff] uppercase tracking-wider",
      companyClass: "text-sm text-[#d1d1e9]",
      periodClass: "text-xs text-[#ff8a00] mb-2 font-tech tracking-widest",
      descriptionClass: "text-sm text-[#00ff9f]/70 leading-relaxed",
    },
    education: {
      containerClass: "border-b border-[#00ff9f]/20 pb-6 mt-6",
      titleClass: "text-lg font-display text-[#ff00e5] uppercase tracking-[0.2em] mb-4 flex items-center before:content-['//'] before:mr-2 before:text-[#00ff9f]",
      entryClass: "mb-6 relative pl-4 border-l border-[#00b8ff]/30",
      institutionClass: "text-base font-bold text-[#00b8ff] uppercase tracking-wider",
      degreeClass: "text-sm text-[#d1d1e9]",
      periodClass: "text-xs text-[#ff8a00] font-tech tracking-widest",
    },
    skills: {
      containerClass: "pb-6 mt-6",
      titleClass: "text-lg font-display text-[#ff00e5] uppercase tracking-[0.2em] mb-4 flex items-center before:content-['//'] before:mr-2 before:text-[#00ff9f]",
      skillsListClass: "flex flex-wrap gap-3",
      skillItemClass: "text-xs border border-[#00ff9f]/50 bg-[#00ff9f]/10 text-[#00ff9f] px-3 py-1 uppercase tracking-wider",
    },
  },
  
  // Centered layout -> "Neon City"
  centered: {
    layout: {
      containerClass: "flex flex-col w-full h-full bg-[#1c1c24] text-[#d1d1e9] font-sans",
      contentClass: "space-y-8",
    },
    personalInfo: {
      containerClass: "bg-gradient-to-b from-[#050510] to-[#1c1c24] border-b-4 border-[#ff00e5] p-10 text-center relative overflow-hidden",
      titleClass: "text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00b8ff] via-[#ff00e5] to-[#fdfb00] uppercase tracking-widest",
      subtitleClass: "text-[#00ff9f] text-sm tracking-[0.4em] font-tech uppercase mt-3",
      gridClass: "flex flex-col items-center mt-6",
      infoContainerClass: "text-center relative z-10",
      avatarContainerClass: "w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-2 border-[#00b8ff] shadow-[0_0_20px_rgba(0,184,255,0.4)]",
      contactContainerClass: "flex justify-center flex-wrap gap-x-6 gap-y-2 mt-6",
      contactItemClass: "text-xs text-[#d1d1e9] flex items-center space-x-2 font-mono bg-[#050510]/50 px-3 py-1 border border-[#ff00e5]/30 rounded",
      labelClass: "sr-only",
      valueClass: "text-[#d1d1e9]",
    },
    section: {
      containerClass: "px-10 py-2",
      titleClass: "text-xl font-display font-bold text-center text-[#fdfb00] uppercase tracking-widest border-b border-[#fdfb00]/30 pb-4 mb-8 relative after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#ff00e5]",
      contentClass: "space-y-8 max-w-4xl mx-auto",
    },
    workExperience: {
      containerClass: "px-10 py-2",
      titleClass: "text-xl font-display font-bold text-center text-[#fdfb00] uppercase tracking-widest border-b border-[#fdfb00]/30 pb-4 mb-8 relative after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#ff00e5]",
      entryClass: "mb-8 bg-[#050510]/40 p-6 border border-[#00b8ff]/20 rounded-lg hover:border-[#00b8ff]/60 transition-colors",
      jobTitleClass: "text-lg font-bold text-[#00b8ff] uppercase tracking-wide",
      companyClass: "text-sm text-[#ff00e5] font-tech tracking-widest",
      periodClass: "text-xs text-[#00ff9f] font-mono mb-4 block",
      descriptionClass: "text-sm text-[#d1d1e9]/80 leading-relaxed",
    },
    education: {
      containerClass: "px-10 py-2",
      titleClass: "text-xl font-display font-bold text-center text-[#fdfb00] uppercase tracking-widest border-b border-[#fdfb00]/30 pb-4 mb-8 relative after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#ff00e5]",
      entryClass: "mb-8 bg-[#050510]/40 p-6 border border-[#00b8ff]/20 rounded-lg text-center",
      institutionClass: "text-lg font-bold text-[#00b8ff] uppercase tracking-wide",
      degreeClass: "text-sm text-[#ff00e5] font-tech tracking-widest mt-1",
      periodClass: "text-xs text-[#00ff9f] font-mono mt-2 block",
    },
    skills: {
      containerClass: "px-10 py-2 mb-10",
      titleClass: "text-xl font-display font-bold text-center text-[#fdfb00] uppercase tracking-widest border-b border-[#fdfb00]/30 pb-4 mb-8 relative after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#ff00e5]",
      skillsListClass: "flex flex-wrap justify-center gap-3 max-w-3xl mx-auto",
      skillItemClass: "px-4 py-2 bg-[#050510] text-[#00ff9f] border border-[#00ff9f] shadow-[0_0_10px_rgba(0,255,159,0.2)] font-mono text-xs uppercase hover:bg-[#00ff9f] hover:text-[#050510] transition-all",
    },
  },
  
  // Sidebar layout -> "Corpo DB"
  sidebar: {
    layout: {
      containerClass: "flex flex-row w-full h-full bg-[#d1d1e9] text-[#1c1c24] font-sans",
      contentClass: "flex flex-row",
    },
    personalInfo: {
      containerClass: "bg-[#050510] text-[#d1d1e9] p-8 w-[35%] min-w-[300px] border-r-4 border-[#ff8a00] h-full shadow-2xl relative z-10",
      titleClass: "text-2xl font-display font-bold text-[#ff8a00] uppercase tracking-widest break-words",
      subtitleClass: "text-[#d1d1e9]/60 font-tech text-sm tracking-[0.2em] uppercase mt-2",
      gridClass: "flex flex-col mt-8",
      infoContainerClass: "space-y-6",
      avatarContainerClass: "w-full aspect-square mb-6 overflow-hidden border-2 border-[#ff8a00] grayscale hover:grayscale-0 transition-all duration-500",
      contactContainerClass: "space-y-4 mt-8 pt-8 border-t border-[#d1d1e9]/10",
      contactItemClass: "text-xs text-[#d1d1e9] flex flex-col space-y-1 font-mono",
      labelClass: "text-[#00b8ff] uppercase tracking-widest text-[10px]",
      valueClass: "text-[#d1d1e9]",
    },
    section: {
      containerClass: "mb-10",
      titleClass: "text-sm font-display font-bold uppercase tracking-[0.3em] text-[#ff8a00] mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#1c1c24]/20 after:ml-4",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "p-10 w-[65%] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9IiMxYzFjMjQiIGZpbGwtb3BhY2l0eT0iMC4wMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')]",
      titleClass: "text-sm font-display font-bold uppercase tracking-[0.3em] text-[#ff8a00] mb-8 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#1c1c24]/20 after:ml-4",
      entryClass: "mb-8 bg-white p-6 shadow-[4px_4px_0px_#1c1c24] border border-[#1c1c24]",
      jobTitleClass: "text-lg font-bold text-[#1c1c24] uppercase",
      companyClass: "text-sm font-tech text-[#00b8ff] font-bold tracking-widest mt-1",
      periodClass: "text-xs bg-[#1c1c24] text-[#d1d1e9] px-2 py-1 inline-block font-mono my-3",
      descriptionClass: "text-sm text-[#1c1c24]/80 leading-relaxed font-medium",
    },
    education: {
      containerClass: "mb-10",
      titleClass: "text-sm font-display font-bold uppercase tracking-[0.3em] text-[#ff8a00] mb-8 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#1c1c24]/20 after:ml-4",
      entryClass: "mb-6 bg-white p-6 shadow-[4px_4px_0px_#1c1c24] border border-[#1c1c24]",
      institutionClass: "text-lg font-bold text-[#1c1c24] uppercase",
      degreeClass: "text-sm font-tech text-[#00b8ff] font-bold tracking-widest mt-1",
      periodClass: "text-xs text-[#1c1c24]/60 font-mono mt-2 block",
    },
    skills: {
      containerClass: "mt-8 pt-8 border-t border-[#d1d1e9]/10",
      titleClass: "text-[#00b8ff] uppercase tracking-widest text-[10px] mb-4 block",
      skillsListClass: "flex flex-col gap-2",
      skillItemClass: "text-xs font-mono text-[#050510] bg-[#00ff9f] px-2 py-1",
    },
  },
  
  // Modern layout -> "Wasteland Tech"
  modern: {
    layout: {
      containerClass: "flex flex-col w-full h-full bg-[#1c1c24] text-[#d1d1e9] font-sans relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMWMxYzI0Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMjYyNjMwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] before:opacity-50",
      contentClass: "space-y-6 p-6 md:p-10 relative z-10 max-w-5xl mx-auto",
    },
    personalInfo: {
      containerClass: "bg-[#050510] border-2 border-[#ff8a00] p-8 shadow-[8px_8px_0px_rgba(255,138,0,0.3)] relative overflow-visible",
      titleClass: "text-4xl font-display font-black text-[#ff8a00] uppercase tracking-tighter",
      subtitleClass: "text-sm text-[#00b8ff] font-tech font-bold uppercase tracking-[0.3em] mt-2",
      gridClass: "flex flex-col md:flex-row items-start md:items-center gap-8 mt-6",
      infoContainerClass: "flex-1",
      avatarContainerClass: "w-28 h-28 overflow-hidden border-2 border-[#ff00e5] shadow-[4px_4px_0px_#ff00e5] -mt-4 md:-mt-12 bg-[#1c1c24] z-20 absolute top-8 right-8",
      contactContainerClass: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-6 border-t border-[#ff8a00]/30",
      contactItemClass: "text-sm text-[#d1d1e9] flex items-center space-x-3 font-mono",
      labelClass: "text-[#00ff9f] uppercase text-xs w-16",
      valueClass: "text-[#d1d1e9]",
    },
    section: {
      containerClass: "bg-[#050510]/80 border border-[#d1d1e9]/20 p-8 backdrop-blur-sm relative",
      titleClass: "text-xl font-display font-bold text-[#d1d1e9] uppercase tracking-[0.2em] border-l-4 border-[#00b8ff] pl-4 mb-6",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "bg-[#050510]/80 border border-[#d1d1e9]/20 p-8 backdrop-blur-sm relative mb-6",
      titleClass: "text-xl font-display font-bold text-[#d1d1e9] uppercase tracking-[0.2em] border-l-4 border-[#00b8ff] pl-4 mb-8",
      entryClass: "relative pl-6 mb-8 border-l-2 border-[#ff00e5]/30 hover:border-[#ff00e5] transition-colors",
      jobTitleClass: "text-lg font-bold text-[#00b8ff] uppercase tracking-wide",
      companyClass: "text-base font-tech text-[#d1d1e9] uppercase tracking-widest mt-1",
      periodClass: "text-xs font-mono text-[#ff8a00] mt-2 mb-3 inline-block",
      descriptionClass: "text-sm text-[#d1d1e9]/70 leading-relaxed",
    },
    education: {
      containerClass: "bg-[#050510]/80 border border-[#d1d1e9]/20 p-8 backdrop-blur-sm relative mb-6",
      titleClass: "text-xl font-display font-bold text-[#d1d1e9] uppercase tracking-[0.2em] border-l-4 border-[#00ff9f] pl-4 mb-8",
      entryClass: "relative pl-6 mb-6 border-l-2 border-[#00ff9f]/30",
      institutionClass: "text-lg font-bold text-[#00ff9f] uppercase tracking-wide",
      degreeClass: "text-base font-tech text-[#d1d1e9] uppercase tracking-widest mt-1",
      periodClass: "text-xs font-mono text-[#ff8a00] mt-2 block",
    },
    skills: {
      containerClass: "bg-[#050510]/80 border border-[#d1d1e9]/20 p-8 backdrop-blur-sm relative",
      titleClass: "text-xl font-display font-bold text-[#d1d1e9] uppercase tracking-[0.2em] border-l-4 border-[#fdfb00] pl-4 mb-6",
      skillsListClass: "flex flex-wrap gap-3",
      skillItemClass: "px-4 py-2 bg-[#1c1c24] text-[#fdfb00] border border-[#fdfb00]/50 font-mono text-sm uppercase shadow-[2px_2px_0px_rgba(253,251,0,0.3)]",
    },
  },

  // Executive layout -> "Cyber-Executive"
  executive: {
    layout: {
      containerClass: "flex flex-col w-full h-full bg-[#050510] text-[#d1d1e9] font-sans",
      contentClass: "space-y-10 p-10 max-w-6xl mx-auto relative z-10",
    },
    personalInfo: {
      containerClass: "relative bg-gradient-to-r from-[#1c1c24] to-[#050510] p-12 border border-[#00ff9f]/20 cyber-panel",
      titleClass: "text-5xl font-display font-light text-white uppercase tracking-[0.1em] mb-2",
      subtitleClass: "text-lg font-tech text-[#00ff9f] tracking-[0.4em] uppercase",
      gridClass: "flex flex-col md:flex-row items-center md:items-start gap-10 mt-8",
      infoContainerClass: "flex-1 space-y-6 w-full",
      avatarContainerClass: "w-40 h-40 overflow-hidden border border-[#00ff9f] p-2 bg-[#00ff9f]/5 relative before:absolute before:inset-0 before:border before:border-[#00ff9f]/50 before:m-1",
      contactContainerClass: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#00ff9f]/20",
      contactItemClass: "text-sm text-[#d1d1e9] flex items-center space-x-3 font-mono",
      labelClass: "text-[#00ff9f]/50 uppercase tracking-widest text-xs w-20",
      valueClass: "text-white font-light",
    },
    section: {
      containerClass: "relative",
      titleClass: "text-2xl font-display font-light text-white uppercase tracking-[0.3em] mb-8 pb-4 border-b border-[#00ff9f]/30 relative flex items-center before:content-[''] before:w-3 before:h-3 before:bg-[#00ff9f] before:mr-4",
      contentClass: "space-y-8",
    },
    workExperience: {
      containerClass: "relative mt-12",
      titleClass: "text-2xl font-display font-light text-white uppercase tracking-[0.3em] mb-8 pb-4 border-b border-[#00ff9f]/30 relative flex items-center before:content-[''] before:w-3 before:h-3 before:bg-[#00ff9f] before:mr-4",
      entryClass: "relative grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 mb-12",
      jobTitleClass: "text-xl font-bold text-white uppercase tracking-wider mb-1",
      companyClass: "text-base text-[#00b8ff] font-tech tracking-widest uppercase mb-4",
      periodClass: "text-sm font-mono text-[#00ff9f] lg:text-right w-full block",
      descriptionClass: "text-base text-[#d1d1e9]/80 leading-relaxed font-light",
    },
    education: {
      containerClass: "relative mt-12",
      titleClass: "text-2xl font-display font-light text-white uppercase tracking-[0.3em] mb-8 pb-4 border-b border-[#00ff9f]/30 relative flex items-center before:content-[''] before:w-3 before:h-3 before:bg-[#00ff9f] before:mr-4",
      entryClass: "relative grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 mb-8",
      institutionClass: "text-xl font-bold text-white uppercase tracking-wider mb-1",
      degreeClass: "text-base text-[#ff00e5] font-tech tracking-widest uppercase mb-4",
      periodClass: "text-sm font-mono text-[#00ff9f] lg:text-right w-full block",
    },
    skills: {
      containerClass: "relative mt-12",
      titleClass: "text-2xl font-display font-light text-white uppercase tracking-[0.3em] mb-8 pb-4 border-b border-[#00ff9f]/30 relative flex items-center before:content-[''] before:w-3 before:h-3 before:bg-[#00ff9f] before:mr-4",
      skillsListClass: "flex flex-wrap gap-4",
      skillItemClass: "px-6 py-3 border border-[#00b8ff]/30 bg-[#00b8ff]/5 text-[#00b8ff] font-mono text-sm uppercase hover:bg-[#00b8ff] hover:text-[#050510] transition-colors duration-300",
    },
  },
};