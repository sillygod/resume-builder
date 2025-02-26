
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

export async function callAIAPI(messages: Message[], apiKey: string, apiUrl: string): Promise<string> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Default model, works with most OpenAI compatible APIs
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
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
    toast.error("Failed to get AI response. Please check your API key and URL.");
    return "";
  }
}
