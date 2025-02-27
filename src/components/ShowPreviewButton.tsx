
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Download } from "lucide-react";

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
  return (
    <div className="flex items-center gap-2">
      <Button onClick={handlePreviewPdf} variant="outline" className="flex items-center gap-2">
        <Download className="w-4 h-4" /> Preview Download PDF
      </Button>
      <Button onClick={togglePreview} variant="outline" className="flex items-center gap-2">
        {showPreview ? (
          <>
            <EyeOff className="w-4 h-4" /> Hide Preview
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" /> Show Preview
          </>
        )}
      </Button>
    </div>
  );
}
