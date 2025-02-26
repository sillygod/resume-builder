
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Settings, MessageCircle, Sparkles, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { callAIAPI, AIConfigOptions } from "@/utils/aiUtils";
import { Message, ResumeAssistantProps } from "@/types/resumeAssistantTypes";
import { getSystemPrompt, getQuickPrompts, getTemplatePrompts } from "@/utils/resumeAssistantUtils";
import { ChatMessages } from "./resumeAssistant/ChatMessages";
import { ChatInput } from "./resumeAssistant/ChatInput";
import { PromptTemplates } from "./resumeAssistant/PromptTemplates";
import { AISettingsDialog } from "./resumeAssistant/AISettingsDialog";

export function ResumeAssistant({
  personalInfo,
  workExperience,
  education,
  skills,
}: ResumeAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are a helpful career and resume assistant. Help users improve their resumes, provide career advice, and assist with grammar and phrasing.",
    },
    {
      role: "assistant",
      content: "Hello! I'm your resume assistant. I can help you with improving your resume, grammar checking, sentence rephrasing, and career advice. What would you like assistance with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");
  const [apiUrl, setApiUrl] = useState(localStorage.getItem("openai_api_url") || "https://api.openai.com/v1/chat/completions");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [modelOptions, setModelOptions] = useState<AIConfigOptions>({
    model: localStorage.getItem("ai_model") || "gpt-3.5-turbo",
    temperature: parseFloat(localStorage.getItem("ai_temperature") || "0.7"),
    maxTokens: parseInt(localStorage.getItem("ai_max_tokens") || "1000")
  });
  const [customModel, setCustomModel] = useState(localStorage.getItem("custom_model") || "");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const saveSettings = () => {
    localStorage.setItem("openai_api_key", apiKey);
    localStorage.setItem("openai_api_url", apiUrl);
    localStorage.setItem("ai_model", modelOptions.model);
    localStorage.setItem("ai_temperature", modelOptions.temperature.toString());
    localStorage.setItem("ai_max_tokens", modelOptions.maxTokens.toString());
    
    if (modelOptions.model === "custom" && customModel) {
      localStorage.setItem("custom_model", customModel);
    }
    
    setIsSettingsOpen(false);
    toast.success("Settings saved successfully");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!apiKey) {
      toast.error("Please set your API key in the settings");
      setIsSettingsOpen(true);
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create messages array for the API
    const apiMessages = [
      ...messages.filter(msg => msg.role !== "system").map(msg => ({ role: msg.role, content: msg.content })),
      { role: "user" as const, content: input }
    ];

    // Prepend system message with context about the resume
    const systemMessage = {
      role: "system" as const,
      content: getSystemPrompt({ personalInfo, workExperience, education, skills })
    };

    // Determine actual model to use (custom or predefined)
    const actualModel = modelOptions.model === "custom" && customModel ? customModel : modelOptions.model;

    try {
      const response = await callAIAPI(
        [systemMessage, ...apiMessages], 
        apiKey, 
        apiUrl, 
        { ...modelOptions, model: actualModel }
      );
      
      if (response) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    setActiveTab("chat");
    setTimeout(() => {
      textAreaRef.current?.focus();
    }, 100);
  };

  const quickPrompts = getQuickPrompts(personalInfo);
  const templatePrompts = getTemplatePrompts(workExperience);

  return (
    <Card className="w-full h-full shadow-md max-h-[800px] flex flex-col animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle>Resume Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Get advice on improving your resume, grammar, and professional language
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="quick">
              <Sparkles className="h-4 w-4 mr-2" />
              Quick Prompts
            </TabsTrigger>
            <TabsTrigger value="templates">
              <BookOpen className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col px-4 pt-4 pb-0 space-y-4 overflow-hidden">
          <ChatMessages messages={messages} isLoading={isLoading} />
          
          <ChatInput 
            input={input} 
            setInput={setInput} 
            sendMessage={sendMessage} 
            isLoading={isLoading} 
            handleKeyDown={handleKeyDown} 
          />
        </TabsContent>

        <TabsContent value="quick" className="flex-1 space-y-4 p-4 overflow-y-auto">
          <PromptTemplates templates={quickPrompts} onSelect={handlePromptSelect} />
        </TabsContent>

        <TabsContent value="templates" className="flex-1 space-y-4 p-4 overflow-y-auto">
          <PromptTemplates templates={templatePrompts} onSelect={handlePromptSelect} />
        </TabsContent>
      </Tabs>

      <AISettingsDialog 
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        apiKey={apiKey}
        setApiKey={setApiKey}
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        modelOptions={modelOptions}
        setModelOptions={setModelOptions}
        customModel={customModel}
        setCustomModel={setCustomModel}
        saveSettings={saveSettings}
      />
    </Card>
  );
}
