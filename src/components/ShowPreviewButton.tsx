
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ShowPreviewButtonProps {
  showPreview: boolean;
  togglePreview: () => void;
  handlePreviewPdf: () => void;
}

export function ShowPreviewButton({ 
  showPreview, 
  togglePreview,
  handlePreviewPdf
}: ShowPreviewButtonProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-2'}`}>
      <Button onClick={handlePreviewPdf} variant="outline" className="flex items-center gap-2 w-full">
        <Download className="w-4 h-4" /> 
        {isMobile ? 'PDF' : 'Preview Download PDF'}
      </Button>
      <Button onClick={togglePreview} variant="outline" className="flex items-center gap-2 w-full">
        {showPreview ? (
          <>
            <EyeOff className="w-4 h-4" /> 
            {isMobile ? 'Hide' : 'Hide Preview'}
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" /> 
            {isMobile ? 'Show' : 'Show Preview'}
          </>
        )}
      </Button>
    </div>
  );
}
