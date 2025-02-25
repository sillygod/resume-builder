import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FoldablePanelProps {
  children: React.ReactNode;
  setIsFolded: (isFolded: boolean) => void;
  isFolded: boolean;
}

export function FoldablePanel({ children, setIsFolded, isFolded: isFoldedProp }: FoldablePanelProps) {
  const [isFolded, setIsFoldedInternal] = useState(isFoldedProp);

  useEffect(() => {
    setIsFolded(isFoldedProp);
  }, [isFoldedProp]);

  const handleToggle = () => {
    const newIsFolded = !isFolded;
    setIsFoldedInternal(newIsFolded);
    setIsFolded(newIsFolded);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="fixed top-4 right-4 z-30"
        onClick={handleToggle}
      >
        {isFolded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>
      <div className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-lg z-20 transform transition-transform duration-300 ${isFolded ? "-translate-x-full" : "translate-x-0"}`}>
        <div className="p-6 space-y-6 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
