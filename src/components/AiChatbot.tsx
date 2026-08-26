import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, ArrowRight, RefreshCw, Smartphone, Layers, ShieldCheck } from 'lucide-react';
import { Product, ChatMessage } from '../types';

interface AiChatbotProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ products, onSelectProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceflowMode, setVoiceflowMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Hello! I am Mochi, your AI Squishy Specialist 🍡✨. Ask me about our ultra slow-rise butter sticks, Nice Cube solid gels, dim sum steamers, GCash / PayMongo payments, or how to sell your squishies!',
      timestamp: 'Just now',
      quickActions: [
        { label: '🧈 Slowest rise squishy?', action: 'What is your slowest rising squishy?' },
        { label: '🧊 Nice Cube details', action: 'Tell me about the NeeDoh Nice Cube' },
        { label: '📱 How to pay with GCash', action: 'How does PayMongo and GCash checkout work?' },
        { label: '🛍️ How to sell squishies', action: 'How can I post and sell my squishy collection?' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-6)
        })
      });

      const data = await res.json();
      const botReply = data.reply || 'I love squishies! How can I help you choose the best stress-relief toy today? ✨';

      // Find any matched products to recommend directly in chat
      let recommended: Product[] = [];
      const lower = text.toLowerCase();
      if (lower.includes('butter') || lower.includes('salted')) {
        recommended = products.filter(p => p.id === 'salted-butter-stick');
      } else if (lower.includes('cube') || lower.includes('needoh') || lower.includes('solid')) {
        recommended = products.filter(p => p.id === 'needoh-nice-cube');
      } else if (lower.includes('cheese')) {
        recommended = products.filter(p => p.id === 'swiss-cheese-cube');
      } else if (lower.includes('dim sum') || lower.includes('bao')) {
        recommended = products.filter(p => p.id === 'dim-sum-bao-steamer');
      } else if (lower.includes('animal') || lower.includes('glitter') || lower.includes('fish')) {
        recommended = products.filter(p => p.id === 'glitter-sea-animals');
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProducts: recommended.length > 0 ? recommended : undefined,
        quickActions: [
          { label: '🧈 Show Butter Foam', action: 'Tell me about the Salted Butter stick' },
          { label: '🧊 Show Nice Cube', action: 'Tell me about the Nice Cube' },
          { label: '🥟 Show Dim Sum Bao', action: 'Tell me about the Dim Sum Steamer' },
          { label: '📱 GCash Payment Guide', action: 'How does PayMongo and GCash checkout work?' }
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'The 4oz Salted Butter Stick (12s slow-rise) and NeeDoh Nice Cube (solid gel) are our top bestsellers! Both support fast PayMongo & GCash checkout with direct delivery across the Philippines. 🍡✨',
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            id="btn-open-ai-chatbot"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:shadow-rose-600/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg animate-pulse">
              🍡
            </div>
            <div className="text-left hidden sm:block pr-1">
              <span className="block text-xs font-extrabold tracking-wide">Mochi AI Assistant</span>
              <span className="block text-[10px] text-pink-200">Gemini &amp; Voiceflow Ready</span>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-slate-900"></span>
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div
          id="ai-chatbot-window"
          className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] sm:max-w-[420px] h-[580px] max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white animate-fade-in"
        >
          {/* Top Bar */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-xl shadow-md">
                🍡
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-white font-serif">Mochi AI Assistant</h4>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-1.5 py-0.2 rounded-full font-bold">Online</span>
                </div>
                <p className="text-[10px] text-slate-400">Powered by Gemini AI • Voiceflow compatible</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setVoiceflowMode(!voiceflowMode)}
                className={`p-1.5 rounded-lg text-xs transition-colors ${voiceflowMode ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800'}`}
                title="Voiceflow Integration Guide"
              >
                VF
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voiceflow Integration Info Banner (if toggled) */}
          {voiceflowMode && (
            <div className="bg-purple-950/90 border-b border-purple-800/80 p-3 text-[11px] text-purple-200 space-y-1">
              <p className="font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Voiceflow Chatbot Widget Integration
              </p>
              <p>To connect your Voiceflow Assistant ID, paste the script snippet into <code>index.html</code> or toggle Gemini AI.</p>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-rose-600 text-white rounded-br-none'
                      : 'bg-slate-800 border border-slate-700/80 text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Embedded Product Card Recommendation (if any) */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 block">Recommended Squishy:</span>
                      {msg.recommendedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            onSelectProduct(prod);
                            setIsOpen(false);
                          }}
                          className="bg-slate-900 border border-slate-700 hover:border-amber-400 p-2 rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors"
                        >
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-white text-[11px] truncate">{prod.name}</h5>
                            <span className="text-amber-400 font-bold text-xs font-serif">₱{prod.price}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>

                {/* Quick Action Pills (if present on bot messages) */}
                {msg.quickActions && msg.sender === 'bot' && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickActions.map((qa, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(qa.action)}
                        className="bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors cursor-pointer"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 bg-slate-800/60 p-3 rounded-2xl w-36">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-400" />
                <span className="text-[11px]">Mochi is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              id="ai-chatbot-input"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Mochi about squishies, GCash, or selling..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
