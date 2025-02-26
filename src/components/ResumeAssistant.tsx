
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";
import { callAIAPI } from "@/utils/aiUtils";
import { Bot, Send, Settings, Loader2, Sparkles, MessageCircle, Check, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
}

interface ResumeAssistantProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveSettings = () => {
    localStorage.setItem("openai_api_key", apiKey);
    localStorage.setItem("openai_api_url", apiUrl);
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
      content: `You are a helpful career and resume assistant. Help users improve their resumes, provide career advice, and assist with grammar and phrasing.
      
Current resume information:
Name: ${personalInfo.fullName || "Not provided"}
Job Title: ${personalInfo.jobTitle || "Not provided"}
Skills: ${skills.join(", ") || "None provided"}
Education: ${education.map(e => `${e.degree} in ${e.field} from ${e.institution}`).join("; ") || "None provided"}
Work Experience: ${workExperience.map(w => `${w.position} at ${w.company}`).join("; ") || "None provided"}
      
Provide helpful, specific advice related to the user's query. If they ask for improvements or grammar checks, reference specific parts of their resume.`
    };

    try {
      const response = await callAIAPI([systemMessage, ...apiMessages], apiKey, apiUrl);
      
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

  const getQuickPrompts = () => [
    {
      title: "Resume Review",
      prompt: "Could you review my resume and suggest improvements?",
    },
    {
      title: "Grammar Check",
      prompt: "Can you check my resume for grammatical errors?",
    },
    {
      title: "Enhance Job Descriptions",
      prompt: "Help me enhance the description for my most recent job position.",
    },
    {
      title: "Career Advice",
      prompt: `Based on my experience as a ${personalInfo.jobTitle || "professional"}, what career paths should I consider?`,
    },
    {
      title: "Missing Skills",
      prompt: "What important skills might be missing from my resume?",
    },
    {
      title: "ATS Optimization",
      prompt: "How can I optimize my resume for ATS (Applicant Tracking Systems)?",
    },
  ];

  const getTemplatePrompts = () => [
    {
      title: "Highlight Achievements",
      prompt: "I need help turning my job duties into achievement statements with metrics.",
    },
    {
      title: "Professional Summary",
      prompt: "Write a compelling professional summary for my resume that highlights my key strengths.",
    },
    {
      title: "Career Change Statement",
      prompt: `I'm transitioning from ${workExperience[0]?.position || "my current role"} to a new field. Help me craft a statement explaining this career change.`,
    },
    {
      title: "Skills Section Enhancement",
      prompt: "Reorganize and enhance my skills section to be more impactful.",
    },
    {
      title: "Education Highlighting",
      prompt: "Help me better highlight my educational background in a way that's relevant to my target jobs.",
    },
    {
      title: "Cover Letter Points",
      prompt: "Based on my resume, suggest key points I should include in my cover letter.",
    },
  ];

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
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-4">
              {messages
                .filter((msg) => msg.role !== "system")
                .map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "assistant"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.timestamp && (
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <p>Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="pt-2 pb-4">
            <div className="flex gap-2">
              <Textarea
                ref={textAreaRef}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="resize-none"
                rows={2}
              />
              <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quick" className="flex-1 space-y-4 p-4 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            {getQuickPrompts().map((quickPrompt, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => {
                  setInput(quickPrompt.prompt);
                  setActiveTab("chat");
                  setTimeout(() => {
                    textAreaRef.current?.focus();
                  }, 100);
                }}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{quickPrompt.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">{quickPrompt.prompt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 space-y-4 p-4 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            {getTemplatePrompts().map((template, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => {
                  setInput(template.prompt);
                  setActiveTab("chat");
                  setTimeout(() => {
                    textAreaRef.current?.focus();
                  }, 100);
                }}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{template.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">{template.prompt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>API Settings</DialogTitle>
            <DialogDescription>
              Configure your OpenAI-compatible API settings. Your API key is stored locally in your browser.
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
          </div>
          <DialogFooter>
            <Button type="submit" onClick={saveSettings}>
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
