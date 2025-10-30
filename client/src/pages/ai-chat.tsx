import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, ArrowLeft, Newspaper } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import africaMapImage from "@assets/africa_map.png";
import aiBackgroundImage from "@assets/stock_images/ai_data_analysis_cha_b8d02db4.jpg";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI investment advisor for African markets. I can help you with:\n\n• Investment opportunities across 54 African countries\n• Market analysis and trends\n• Platform features and how to use Panafrica Invest\n• Risk assessment and portfolio strategies\n• Specific questions about African economies\n\nWhat would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/ai-chat", {
        message: input.trim(),
        conversationHistory: messages.slice(-5),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <img
                src={africaMapImage}
                alt="Africa Continent"
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none">
                  Panafrica Invest
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  Powered by AI
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <Link href="/news">
              <Button variant="ghost" size="sm" data-testid="button-news-link">
                <Newspaper className="h-4 w-4 mr-2" />
                News
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" data-testid="button-dashboard">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16 flex flex-col">
        <div
          className="relative bg-cover bg-center border-b"
          style={{ backgroundImage: `url(${aiBackgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
          <div className="relative max-w-4xl mx-auto px-6 py-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 font-heading text-white">
              AI Investment Advisor
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Ask me anything about investing in African markets, platform features, or get
              personalized investment guidance
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                <Bot className="h-3 w-3 mr-1" />
                Powered by Groq AI
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                54 African Markets
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4" style={{ maxHeight: "calc(100vh - 400px)" }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <Card
                    className={`${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t pt-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about African markets, investment strategies, or platform features..."
                className="min-h-[60px] resize-none"
                disabled={isLoading}
                data-testid="input-chat-message"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[60px] w-[60px]"
                data-testid="button-send-message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are for informational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
