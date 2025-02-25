import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FoldablePanelProps {
  children: React.ReactNode;
}

export function FoldablePanel({ children }: FoldablePanelProps) {
  const [isFolded, setIsFolded] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="sticky top-4 right-4 z-10"
        onClick={() => setIsFolded(!isFolded)}
      >
        {isFolded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>
      <div className={`transition-transform duration-300 ${isFolded ? "-translate-x-full" : "translate-x-0"}`}>
        <Card className="p-6 space-y-6 animate-fade-in">
          {children}
        </Card>
      </div>
    </div>
  );
}
