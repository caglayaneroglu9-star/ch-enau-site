"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, PhoneCall, Zap } from "lucide-react";
import chatbotConfig from "../config/chatbot.json";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isFallback?: boolean;
}

export default function Chatbot() {
  // Check if chatbot is enabled in the configuration
  if (!chatbotConfig.enabled) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: chatbotConfig.welcomeMessage,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const newUserMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Process matching reply with delay
    setTimeout(() => {
      const normalizedQuery = textToSend.toLowerCase().trim();
      
      // Keywords that prompt immediate redirection to engineers (complex issues)
      const complexKeywords = [
        "ariza", "arıza", "bozuldu", "yandı", "yandi", "kart", "pcb", "plc kartı", 
        "haberleşme", "habereşme", "ethercat drop", "modül", "safety", "güvenlik", 
        "acil stop", "stop hatası", "rejection", "fire", "senkron", "mismatch", 
        "türbülans", "vakum", "enkoder", "encoder", "cam profile", "kam profili", 
        "hata kodu", "error code"
      ];

      const isComplexQuery = complexKeywords.some(keyword => normalizedQuery.includes(keyword));
      
      let matchedResponse = "";
      let isFallback = false;

      if (isComplexQuery) {
        matchedResponse = "Girdiğiniz detaylar (arıza, elektronik kart, haberleşme kesintisi veya kritik emniyet hatası vb.) üst seviye karmaşık bir probleme işaret ediyor. Bu tür kritik durumlarda hatalı müdahaleleri önlemek adına yapay zeka yönlendirmesi yerine doğrudan kıdemli mühendislerimizle görüşmeniz hayati önem taşır. \n\nLütfen doğrudan iletişime geçin:\n- Çağlayan EROĞLU: +49 (0) 160 122 13 06 / +90 (533) 706 38 13\n- Hakan ÖZKAN: +90 (507) 413 96 75";
        isFallback = true;
      } else {
        // Find best match in training documents
        const bestMatch = chatbotConfig.trainingDocuments.find((doc) => {
          return doc.keywords.some((keyword) => {
            // Check if keyword is present in the query
            return normalizedQuery.includes(keyword.toLowerCase());
          });
        });

        if (bestMatch) {
          matchedResponse = bestMatch.response;
        } else {
          matchedResponse = chatbotConfig.fallbackMessage;
          isFallback = true;
        }
      }

      // Add bot message
      const botMsgId = `bot-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "bot",
          text: matchedResponse,
          timestamp: new Date(),
          isFallback,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center relative transition-all duration-300 shadow-2xl focus:outline-none border border-neon-cyan/40 hover:border-neon-cyan ${
          isOpen
            ? "bg-secondary-navy text-white hover:bg-primary-navy"
            : "bg-industrial-blue text-white hover:scale-105 shadow-[0_0_20px_rgba(0,102,204,0.4)]"
        }`}
        aria-label="Yapay Zeka Asistanı"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-fade-in" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 animate-fade-in" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-primary-navy animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* Chat Container Window */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-[350px] sm:w-[400px] h-[500px] rounded-2xl border border-white/10 bg-secondary-navy/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-slide-up z-50">
          {/* Header */}
          <div className="p-4 bg-primary-navy border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-industrial-blue border border-neon-cyan/30 flex items-center justify-center text-neon-cyan relative">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-primary-navy" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-white flex items-center gap-1">
                  {chatbotConfig.botName}
                  <Sparkles className="w-3 h-3 text-neon-cyan animate-pulse" />
                </h5>
                <p className="text-[10px] text-steel-gray font-medium">Aktif Destek Asistanı</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 rounded-lg text-steel-gray hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin scrollbar-thumb-white/5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-industrial-blue text-white rounded-br-none border border-neon-cyan/20"
                      : "bg-primary-navy/80 text-steel-gray rounded-bl-none border border-white/5"
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Timestamp & Routing Trigger helper if fallback */}
                <div className="flex items-center gap-1.5 mt-1 px-1">
                  <span className="text-[9px] text-white/30">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {msg.isFallback && (
                    <a
                      href="/contact"
                      className="text-[9px] text-neon-cyan hover:underline font-bold flex items-center gap-0.5"
                    >
                      <PhoneCall className="w-2.5 h-2.5" /> İletişime Geç
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="self-start max-w-[80%] flex flex-col items-start gap-1">
                <div className="bg-primary-navy/80 text-steel-gray p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-1.5">
                  <span className="text-xs text-white/40">Asistan yazıyor</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce delay-0" />
                    <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce delay-300" />
                  </span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Choice Chips */}
          <div className="px-4 py-2 border-t border-white/5 bg-primary-navy/30 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {chatbotConfig.quickChips.map((chipText) => (
              <button
                key={chipText}
                type="button"
                onClick={() => handleSendMessage(chipText)}
                className="text-[10px] font-bold text-steel-gray hover:text-white bg-primary-navy border border-white/5 hover:border-neon-cyan/40 px-2 py-1 rounded-full transition-all shrink-0 cursor-pointer"
              >
                {chipText}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-primary-navy border-t border-white/5 flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Sorunuzu buraya yazın..."
              className="flex-1 bg-secondary-navy border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-neon-cyan/50 placeholder-white/20 transition-colors"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-industrial-blue hover:bg-industrial-blue/90 border border-neon-cyan/20 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              aria-label="Gönder"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
