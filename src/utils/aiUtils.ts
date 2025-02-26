
import { toast } from "sonner";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export type AIModel = "gpt-3.5-turbo" | "gpt-4" | "claude-instant" | "claude-2" | "llama-2" | "mistral" | "custom";

export interface AIModelOption {
  id: AIModel;
  name: string;
  description: string;
  defaultTemperature: number;
  maxTokens: number;
}

export const aiModels: AIModelOption[] = [
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Good balance between speed and capabilities",
    defaultTemperature: 0.7,
    maxTokens: 1000
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "More advanced capabilities for complex tasks",
    defaultTemperature: 0.7,
    maxTokens: 2000
  },
  {
    id: "claude-instant",
    name: "Claude Instant",
    description: "Fast and efficient assistant from Anthropic",
    defaultTemperature: 0.7,
    maxTokens: 1000
  },
  {
    id: "claude-2",
    name: "Claude 2",
    description: "Advanced model from Anthropic",
    defaultTemperature: 0.7,
    maxTokens: 2000
  },
  {
    id: "llama-2",
    name: "LLaMa 2",
    description: "Open source model from Meta",
    defaultTemperature: 0.7,
    maxTokens: 1000
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Advanced open source model",
    defaultTemperature: 0.7,
    maxTokens: 1000
  },
  {
    id: "custom",
    name: "Custom",
    description: "Use a custom model identifier",
    defaultTemperature: 0.7,
    maxTokens: 1000
  }
];

export interface AIConfigOptions {
  model: AIModel | string;
  temperature: number;
  maxTokens: number;
}

export async function callAIAPI(
  messages: Message[], 
  apiKey: string, 
  apiUrl: string, 
  options: AIConfigOptions
): Promise<string> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: options.model,
        messages: messages,
        temperature: options.temperature,
        max_tokens: options.maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json() as ChatResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AI API:", error);
    toast.error("Failed to get AI response. Please check your API key, URL, and model selection.");
    return "";
  }
}
