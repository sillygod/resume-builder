// src/themes/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define theme types
export type ThemeName = 'centered' | 'sidebar' | 'executive' | 'classic';

// Theme context type
interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'classic',
  setTheme: () => {},
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('classic');

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
  // Classic layout -> "Linear Standard"
  classic: {
    layout: {
      containerClass: "flex flex-col w-full min-h-[297mm] bg-[#050506] text-[#EDEDEF] font-sans relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')] before:opacity-[0.015]",
      contentClass: "space-y-6 p-10 relative z-10",
    },
    personalInfo: {
      containerClass: "border-b border-white/[0.06] pb-8 mb-8",
      avatarContainerClass: "w-24 h-24 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0c] shadow-[0_4px_24px_rgba(0,0,0,0.4)] shrink-0",
      titleClass: "text-4xl font-semibold text-[#EDEDEF] tracking-tight mb-2",
      subtitleClass: "text-[#8A8F98] text-base font-medium",
      gridClass: "flex items-start gap-8",
      infoContainerClass: "flex-1",
      contactContainerClass: "flex flex-wrap gap-4 mt-4",
      contactItemClass: "text-sm text-[#8A8F98] flex items-center space-x-2 font-mono",
      labelClass: "hidden",
      valueClass: "",
    },
    section: {
      containerClass: "mb-8",
      titleClass: "text-lg font-semibold text-[#EDEDEF] uppercase tracking-widest mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-white/[0.06] after:ml-4",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "mb-8",
      titleClass: "text-lg font-semibold text-[#EDEDEF] uppercase tracking-widest mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-white/[0.06] after:ml-4",
      entryClass: "mb-6 relative pl-6 border-l border-white/[0.06] hover:border-[#5E6AD2]/50 transition-colors",
      jobTitleClass: "text-lg font-medium text-[#EDEDEF] tracking-tight",
      companyClass: "text-sm text-[#8A8F98] mt-1",
      periodClass: "text-xs font-mono text-[#5E6AD2]/80 mt-2 mb-3 inline-block",
      descriptionClass: "text-sm text-[#8A8F98] leading-relaxed",
    },
    education: {
      containerClass: "mb-8",
      titleClass: "text-lg font-semibold text-[#EDEDEF] uppercase tracking-widest mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-white/[0.06] after:ml-4",
      entryClass: "mb-6 relative pl-6 border-l border-white/[0.06]",
      institutionClass: "text-lg font-medium text-[#EDEDEF] tracking-tight",
      degreeClass: "text-sm text-[#8A8F98] mt-1",
      periodClass: "text-xs font-mono text-[#5E6AD2]/80 mt-2 block",
    },
    skills: {
      containerClass: "mb-8",
      titleClass: "text-lg font-semibold text-[#EDEDEF] uppercase tracking-widest mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-white/[0.06] after:ml-4",
      skillsListClass: "flex flex-wrap gap-2.5",
      skillItemClass: "px-3 py-1.5 bg-white/[0.03] text-[#EDEDEF] border border-white/[0.06] font-mono text-xs rounded-lg",
    },
  },
  
  // Sidebar layout -> "Linear Sidebar"
  sidebar: {
    layout: {
      containerClass: "flex flex-row w-full min-h-[297mm] bg-[#050506] text-[#EDEDEF] font-sans",
      contentClass: "flex flex-row",
    },
    personalInfo: {
      containerClass: "bg-[#020203] text-[#EDEDEF] p-10 w-[32%] min-w-[280px] min-h-[297mm] shadow-[4px_0_24px_rgba(0,0,0,0.5)] relative z-10 border-r border-white/[0.06]",
      titleClass: "text-2xl font-semibold text-[#EDEDEF] tracking-tight break-words",
      subtitleClass: "text-[#8A8F98] text-sm mt-2 font-mono tracking-widest",
      gridClass: "flex flex-col mt-10",
      infoContainerClass: "space-y-6",
      avatarContainerClass: "w-full aspect-square mb-8 overflow-hidden rounded-xl border border-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] bg-white/[0.02]",
      contactContainerClass: "space-y-5 mt-10 pt-8 border-t border-white/[0.06]",
      contactItemClass: "text-xs text-[#8A8F98] flex flex-col space-y-1.5 font-mono",
      labelClass: "text-[#5E6AD2] uppercase tracking-widest text-[10px]",
      valueClass: "text-[#EDEDEF]",
    },
    section: {
      containerClass: "mb-10",
      titleClass: "text-sm font-semibold uppercase tracking-widest text-[#EDEDEF] mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-white/[0.06] after:ml-4",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "p-12 w-[68%] bg-[#050506] relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')] before:opacity-[0.015]",
      titleClass: "text-sm font-semibold uppercase tracking-widest text-[#EDEDEF] mb-8 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-white/[0.06] after:ml-4",
      entryClass: "mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:border-[#5E6AD2]/30 transition-colors",
      jobTitleClass: "text-lg font-medium text-[#EDEDEF] tracking-tight",
      companyClass: "text-sm text-[#8A8F98] mt-1",
      periodClass: "text-xs bg-white/[0.05] text-[#8A8F98] px-2 py-1 inline-block font-mono my-3 rounded-md border border-white/[0.06]",
      descriptionClass: "text-sm text-[#8A8F98] leading-relaxed",
    },
    education: {
      containerClass: "mb-10",
      titleClass: "text-sm font-semibold uppercase tracking-widest text-[#EDEDEF] mb-8 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-white/[0.06] after:ml-4",
      entryClass: "mb-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]",
      institutionClass: "text-lg font-medium text-[#EDEDEF] tracking-tight",
      degreeClass: "text-sm text-[#8A8F98] mt-1",
      periodClass: "text-xs text-[#5E6AD2] font-mono mt-2 block",
    },
    skills: {
      containerClass: "mt-10 pt-8 border-t border-white/[0.06]",
      titleClass: "text-[#5E6AD2] uppercase tracking-widest text-[10px] mb-5 block",
      skillsListClass: "flex flex-col gap-2.5",
      skillItemClass: "text-xs font-mono text-[#8A8F98] border-l-2 border-[#5E6AD2]/50 pl-2",
    },
  },
  
  // Modern layout -> "Linear Centered"
  centered: {
    layout: {
      containerClass: "flex flex-col w-full min-h-[297mm] bg-[#050506] text-[#EDEDEF] font-sans relative",
      contentClass: "space-y-6 p-6 md:p-12 relative z-10 max-w-5xl mx-auto",
    },
    personalInfo: {
      containerClass: "bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.06] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative overflow-visible rounded-2xl",
      titleClass: "text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/60 tracking-tight text-center md:text-left",
      subtitleClass: "text-sm text-[#8A8F98] font-mono tracking-widest mt-3 text-center md:text-left",
      gridClass: "flex flex-col md:flex-row items-center md:items-center justify-between gap-8 mt-6",
      infoContainerClass: "flex-1 min-w-0 w-full",
      avatarContainerClass: "w-28 h-28 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0c] z-20 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] shrink-0 mx-auto md:mx-0",
      contactContainerClass: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-8 pt-6 border-t border-white/[0.06]",
      contactItemClass: "text-sm text-[#8A8F98] flex items-center justify-center md:justify-start space-x-3 font-mono min-w-0",
      labelClass: "text-[#5E6AD2] uppercase text-xs w-16 shrink-0 text-right md:text-left",
      valueClass: "text-[#EDEDEF] break-all flex-1 min-w-0 text-left",
    },
    section: {
      containerClass: "mb-8",
      titleClass: "text-xl font-semibold text-[#EDEDEF] tracking-tight mb-6 flex items-center justify-center gap-4 before:content-[''] before:h-1 before:w-1 before:rounded-full before:bg-[#5E6AD2] after:content-[''] after:h-1 after:w-1 after:rounded-full after:bg-[#5E6AD2]",
      contentClass: "space-y-6",
    },
    workExperience: {
      containerClass: "mb-8",
      titleClass: "text-xl font-semibold text-[#EDEDEF] tracking-tight mb-6 flex items-center justify-center gap-4 before:content-[''] before:h-1 before:w-1 before:rounded-full before:bg-[#5E6AD2] after:content-[''] after:h-1 after:w-1 after:rounded-full after:bg-[#5E6AD2]",
      entryClass: "relative p-6 mb-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-[#5E6AD2]/50 transition-colors text-center md:text-left",
      jobTitleClass: "text-lg font-medium text-[#EDEDEF] tracking-tight",
      companyClass: "text-sm text-[#8A8F98] mt-1",
      periodClass: "text-xs font-mono text-[#5E6AD2]/80 mt-2 mb-3 inline-block",
      descriptionClass: "text-sm text-[#8A8F98] leading-relaxed",
    },
    education: {
      containerClass: "mb-8",
      titleClass: "text-xl font-semibold text-[#EDEDEF] tracking-tight mb-6 flex items-center justify-center gap-4 before:content-[''] before:h-1 before:w-1 before:rounded-full before:bg-[#5E6AD2] after:content-[''] after:h-1 after:w-1 after:rounded-full after:bg-[#5E6AD2]",
      entryClass: "relative p-6 mb-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-center md:text-left",
      institutionClass: "text-lg font-medium text-[#EDEDEF] tracking-tight",
      degreeClass: "text-sm text-[#8A8F98] mt-1",
      periodClass: "text-xs font-mono text-[#5E6AD2]/80 mt-2 block",
    },
    skills: {
      containerClass: "mb-8",
      titleClass: "text-xl font-semibold text-[#EDEDEF] tracking-tight mb-6 flex items-center justify-center gap-4 before:content-[''] before:h-1 before:w-1 before:rounded-full before:bg-[#5E6AD2] after:content-[''] after:h-1 after:w-1 after:rounded-full after:bg-[#5E6AD2]",
      skillsListClass: "flex flex-wrap justify-center gap-2.5",
      skillItemClass: "px-3 py-1.5 bg-white/[0.03] text-[#EDEDEF] border border-white/[0.06] font-mono text-xs rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
    },
  },

  // Executive layout -> "Linear Executive"
  executive: {
    layout: {
      containerClass: "flex flex-col w-full min-h-[297mm] bg-[#020203] text-[#EDEDEF] font-sans relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')] before:opacity-[0.02]",
      contentClass: "space-y-10 p-10 max-w-6xl mx-auto relative z-10",
    },
    personalInfo: {
      containerClass: "relative bg-[#050506] p-10 border border-white/[0.06] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
      titleClass: "text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/70 tracking-tight mb-2",
      subtitleClass: "text-base font-mono text-[#5E6AD2] tracking-widest uppercase",
      gridClass: "flex flex-col md:flex-row items-center md:items-start gap-8 mt-8",
      infoContainerClass: "flex-1 space-y-6 w-full min-w-0",
      avatarContainerClass: "w-32 h-32 shrink-0 overflow-hidden border border-white/[0.1] bg-[#0a0a0c] rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)]",
      contactContainerClass: "grid grid-cols-1 gap-y-3 gap-x-4 mt-8 pt-8 border-t border-white/[0.06]",
      contactItemClass: "text-xs text-[#8A8F98] flex items-center space-x-3 font-mono break-all",
      labelClass: "text-[#5E6AD2]/80 uppercase tracking-widest text-xs w-20 shrink-0",
      valueClass: "text-[#EDEDEF] break-words",
    },
    section: {
      containerClass: "relative",
      titleClass: "text-2xl font-semibold text-[#EDEDEF] tracking-tight mb-8 pb-4 border-b border-white/[0.06] relative",
      contentClass: "space-y-8",
    },
    workExperience: {
      containerClass: "relative mt-12",
      titleClass: "text-2xl font-semibold text-[#EDEDEF] tracking-tight mb-8 pb-4 border-b border-white/[0.06] relative",
      entryClass: "relative grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-x-8 gap-y-2 mb-10 p-6 rounded-2xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all",
      jobTitleClass: "text-xl font-medium text-[#EDEDEF] tracking-tight mb-1",
      companyClass: "text-sm text-[#8A8F98] mb-4",
      periodClass: "text-sm font-mono text-[#5E6AD2]/80 lg:text-right w-full block shrink-0",
      descriptionClass: "text-sm text-[#8A8F98] leading-relaxed",
    },
    education: {
      containerClass: "relative mt-12",
      titleClass: "text-2xl font-semibold text-[#EDEDEF] tracking-tight mb-8 pb-4 border-b border-white/[0.06] relative",
      entryClass: "relative grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-x-8 gap-y-2 mb-8 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04]",
      institutionClass: "text-xl font-medium text-[#EDEDEF] tracking-tight mb-1",
      degreeClass: "text-sm text-[#8A8F98] mb-4",
      periodClass: "text-sm font-mono text-[#5E6AD2]/80 lg:text-right w-full block shrink-0",
    },
    skills: {
      containerClass: "relative mt-12",
      titleClass: "text-2xl font-semibold text-[#EDEDEF] tracking-tight mb-8 pb-4 border-b border-white/[0.06] relative",
      skillsListClass: "flex flex-wrap gap-3",
      skillItemClass: "px-4 py-2 border border-white/[0.06] bg-white/[0.03] text-[#EDEDEF] font-mono text-sm rounded-lg hover:bg-white/[0.06] hover:border-[#5E6AD2]/50 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
    },
  },
};