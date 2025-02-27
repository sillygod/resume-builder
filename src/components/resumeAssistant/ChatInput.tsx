
import React, { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ input, setInput, sendMessage, isLoading, handleKeyDown }, ref) => {
    return (
      <div className="border rounded-lg p-2 flex items-center gap-2 bg-background">
        <Textarea
          placeholder="Type your message..."
          className="flex-1 min-h-9 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={ref}
        />
        <Button
          type="submit"
          size="icon"
          className="h-9 w-9 flex-shrink-0"
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";
