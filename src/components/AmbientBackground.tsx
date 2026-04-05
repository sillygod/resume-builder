import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[-1]">
      {/* Primary blob: Top-center */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[1400px] bg-[var(--accent)] rounded-[100%] blur-[150px] opacity-25 animate-float"
        style={{ animationDuration: '10s' }}
      ></div>

      {/* Secondary blob: Left side */}
      <div
        className="absolute -left-[200px] top-[20%] w-[600px] h-[800px] bg-[#9b72d1] rounded-[100%] blur-[120px] opacity-15 animate-float"
        style={{ animationDuration: '8s', animationDelay: '1s' }}
      ></div>

      {/* Tertiary blob: Right side */}
      <div
        className="absolute -right-[150px] top-[40%] w-[500px] h-[700px] bg-indigo-500 rounded-[100%] blur-[100px] opacity-12 animate-float"
        style={{ animationDuration: '12s', animationDelay: '2s' }}
      ></div>

      {/* Bottom accent */}
      <div
        className="absolute left-1/2 bottom-[-20%] -translate-x-1/2 w-[800px] h-[600px] bg-[var(--accent)] rounded-[100%] blur-[120px] opacity-10 animate-pulse"
      ></div>
    </div>
  );
};
