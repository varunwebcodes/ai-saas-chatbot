import { useState } from "react";

import { SendHorizontal } from "lucide-react";

const PromptBox = ({ sendPrompt }) => {

  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPrompt(prompt);

    setPrompt("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-white/10 bg-[#020617]"
    >

      <div className="max-w-4xl mx-auto flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3">

        <input
          type="text"
          placeholder="Ask anything..."
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          className="flex-1 bg-transparent outline-none"
        />

        <button className="bg-cyan-500 hover:bg-cyan-400 transition p-3 rounded-xl">

          <SendHorizontal size={18} />

        </button>

      </div>

    </form>
  );
};

export default PromptBox;