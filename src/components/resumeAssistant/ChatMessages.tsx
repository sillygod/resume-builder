
import { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/types/resumeAssistantTypes";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "nearest" 
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto pr-2 min-w-0">
      <div className="space-y-4 w-full min-w-0">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((message, index) => (
            <div
              key={index}
              className={`flex w-full min-w-0 ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === "assistant"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                } break-words overflow-hidden`}
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-sm prose-slate max-w-none dark:prose-invert text-sm break-words">
                    <ReactMarkdown 
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="mb-2 last:mb-0 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-2 last:mb-0 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">{children}</code>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-sm break-words overflow-wrap-anywhere">
                    {message.content}
                  </div>
                )}
                {message.timestamp && (
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg p-3 bg-secondary text-secondary-foreground break-words overflow-hidden">
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
