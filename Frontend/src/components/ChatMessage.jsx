import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Copy } from "lucide-react";

const ChatMessage = ({
  message,
  isAI,
}) => {

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className={`flex ${
        isAI
          ? "justify-start"
          : "justify-end"
      }`}
    >

      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 whitespace-pre-wrap relative
        
        ${
          isAI
            ? "bg-white/5 border border-white/10"
            : "bg-cyan-500"
        }
      `}
      >

        {/* COPY BUTTON */}

        <button
          onClick={() =>
            copyToClipboard(message)
          }
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
        >
          <Copy size={16} />
        </button>

        {/* MARKDOWN */}

        <div className="prose prose-invert max-w-none">

          <ReactMarkdown
            components={{
              code({
                inline,
                className,
                children,
                ...props
              }) {

                const match =
                  /language-(\w+)/.exec(
                    className || ""
                  );

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                    {...props}
                  >
                    {String(children).replace(
                      /\n$/,
                      ""
                    )}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-black/30 px-1 py-0.5 rounded"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message}
          </ReactMarkdown>

        </div>

      </div>

    </div>
  );
};

export default ChatMessage;