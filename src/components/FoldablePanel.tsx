import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FoldablePanelProps {
  children: React.ReactNode;
  setIsFolded: (isFolded: boolean) => void;
  isFolded: boolean;
}

export function FoldablePanel({
  children,
  setIsFolded,
  isFolded: isFoldedProp,
}: FoldablePanelProps) {
  const [isFolded, setIsFoldedInternal] = useState(isFoldedProp);

  useEffect(() => {
    setIsFoldedInternal(isFoldedProp);
  }, [isFoldedProp]);

  const handleToggle = () => {
    const newIsFolded = !isFolded;
    setIsFoldedInternal(newIsFolded);
    setIsFolded(newIsFolded);
  };

  return (
    <div className="relative">
      <div
        className={`fixed inset-y-0 left-0 w-full max-w-xl bg-white shadow-lg z-20 transform transition-transform duration-300 ${
          isFolded ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="p-6 space-y-6 animate-fade-in overflow-y-auto max-h-screen">
          {children}
        </div>

        <div
          className={`absolute top-6 -right-8 h-10 flex items-center justify-center bg-white border-t-[1px] border-r-[1px] border-b-[1px] rounded-r-md transition-all duration-300 cursor-pointer`}
          onClick={handleToggle}
        >
          <div className="px-2">
            {isFolded ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
