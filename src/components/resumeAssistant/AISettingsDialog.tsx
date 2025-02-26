
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Thermometer, Sliders } from "lucide-react";
import { AIModel, aiModels, AIConfigOptions } from "@/utils/aiUtils";

interface AISettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  apiUrl: string;
  setApiUrl: (url: string) => void;
  modelOptions: AIConfigOptions;
  setModelOptions: (options: AIConfigOptions) => void;
  customModel: string;
  setCustomModel: (model: string) => void;
  saveSettings: () => void;
}

export function AISettingsDialog({
  isOpen,
  onOpenChange,
  apiKey,
  setApiKey,
  apiUrl,
  setApiUrl,
  modelOptions,
  setModelOptions,
  customModel,
  setCustomModel,
  saveSettings
}: AISettingsDialogProps) {
  const handleModelChange = (value: string) => {
    const selectedModel = value as AIModel;
    const defaultValues = aiModels.find(model => model.id === selectedModel);
    
    if (defaultValues) {
      setModelOptions({
        ...modelOptions,
        model: selectedModel,
        temperature: defaultValues.defaultTemperature,
        maxTokens: defaultValues.maxTokens
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Assistant Settings</DialogTitle>
          <DialogDescription>
            Configure your OpenAI-compatible API settings and model preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apiUrl">API URL</Label>
            <Input
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.openai.com/v1/chat/completions"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">AI Model</Label>
            <Select value={modelOptions.model} onValueChange={handleModelChange}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>AI Models</SelectLabel>
                  {aiModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {modelOptions.model === "custom" && (
              <div className="mt-2">
                <Label htmlFor="customModel">Custom Model Identifier</Label>
                <Input
                  id="customModel"
                  placeholder="Enter custom model identifier"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature">Temperature: {modelOptions.temperature.toFixed(1)}</Label>
              <Thermometer className="h-4 w-4" />
            </div>
            <Slider
              id="temperature"
              min={0}
              max={2}
              step={0.1}
              value={[modelOptions.temperature]}
              onValueChange={(values) => setModelOptions({...modelOptions, temperature: values[0]})}
            />
            <p className="text-xs text-muted-foreground">
              Lower values make responses more deterministic, higher values make them more creative.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="maxTokens">Max Tokens: {modelOptions.maxTokens}</Label>
              <Sliders className="h-4 w-4" />
            </div>
            <Slider
              id="maxTokens"
              min={100}
              max={4000}
              step={100}
              value={[modelOptions.maxTokens]}
              onValueChange={(values) => setModelOptions({...modelOptions, maxTokens: values[0]})}
            />
            <p className="text-xs text-muted-foreground">
              Maximum length of the AI's response. Higher values allow for longer outputs.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={saveSettings}>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
