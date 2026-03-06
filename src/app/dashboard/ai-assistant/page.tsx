'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCpu } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';

export default function AIAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m your Bharat Credits AI assistant. I can help you with farming practices, carbon credit generation, biomass pricing, and more. How can I help you today?' },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response || 'Sorry, I could not process that.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
        <p className="text-gray-400">Powered by Gemini AI — get farming and carbon credit advice.</p>
      </div>

      <div className="glass-card p-6 flex flex-col" style={{ height: 'calc(100vh - 220px)' }}>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-white/5 border border-white/10 text-gray-300'}`}>
                {msg.role === 'assistant' && <FiCpu className="inline mr-2 text-emerald-400" />}
                {msg.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-sm text-gray-400">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about farming, carbon credits, pricing..."
            className="flex-1 px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 outline-none focus:border-emerald-400/50"
          />
          <button onClick={sendMessage} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}