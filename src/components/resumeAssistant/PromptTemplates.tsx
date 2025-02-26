
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PromptTemplate {
  title: string;
  prompt: string;
}

interface PromptTemplatesProps {
  templates: PromptTemplate[];
  onSelect: (prompt: string) => void;
}

export function PromptTemplates({ templates, onSelect }: PromptTemplatesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {templates.map((template, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => onSelect(template.prompt)}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">{template.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground line-clamp-3">{template.prompt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
