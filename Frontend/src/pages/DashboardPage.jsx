import { useEffect, useRef, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ChatMessage from "../components/ChatMessage";
import PromptBox from "../components/PromptBox";

import api from "../services/api";

const DashboardPage = () => {

  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "# Hello 👋\nHow can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // AUTO SCROLL

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // SEND MESSAGE

  const sendPrompt = async (prompt) => {

    if (!prompt.trim()) return;

    const userMessage = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      setLoading(true);

      const { data } = await api.post(
        "/chat",
        {
          message: prompt,
        }
      );

      const aiMessage = {
        role: "ai",
        content: data.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // NEW CHAT

  const handleNewChat = () => {

    setMessages([
      {
        role: "ai",
        content: "# Hello 👋\nHow can I help you today?",
      },
    ]);
  };

  return (
    <DashboardLayout
      handleNewChat={handleNewChat}
    >

      <div className="flex flex-col h-screen">

        {/* CHAT AREA */}

        <div className="flex-1 overflow-y-auto px-4 md:px-6 pt-24 md:pt-8 pb-32">

          <div className="max-w-4xl mx-auto space-y-6 w-full">

            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                isAI={msg.role === "ai"}
                message={msg.content}
              />
            ))}

            {loading && (
              <ChatMessage
                isAI={true}
                message={"Typing..."}
              />
            )}

            <div ref={chatEndRef} />

          </div>

        </div>

        {/* FIXED INPUT */}

        <div className="fixed bottom-0 left-0 md:left-[280px] right-0 bg-[#020617] border-t border-white/10 z-40">

          <PromptBox sendPrompt={sendPrompt} />

        </div>

      </div>

    </DashboardLayout>
  );
};

export default DashboardPage;