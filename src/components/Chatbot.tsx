import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCv8J3cnATbOZ_oRcKlKVsZCk_SlnXaQvc");

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const response = result?.response?.text() || "No response from AI.";
      setMessages([...newMessages, { sender: "bot", text: response }]);
    } catch (error: any) {
      console.error("Chatbot error:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: `Error: Could not get a response. (${error.message || ""})` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating round button */}
      {!open && (
        <button
          className="fixed bottom-5 left-5 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform z-50"
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}

      {/* Chat window with slide-up animation */}
      <div
        className={`fixed bottom-5 left-5 w-96 bg-white shadow-2xl rounded-2xl border border-gray-300 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-t-2xl flex justify-between items-center">
          <span className="font-semibold">💬 Gemini Chat</span>
          <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="p-3 h-64 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-3 py-1 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {loading && <p className="text-gray-400 text-sm">Bot is typing...</p>}
        </div>

        {/* Input */}
        <div className="flex border-t">
          <input
            type="text"
            className="flex-1 p-2 outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="bg-blue-500 text-white px-4" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
