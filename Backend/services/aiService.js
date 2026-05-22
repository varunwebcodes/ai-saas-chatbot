import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

console.log(process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateAIResponse = async (message) => {
  try {
    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    return chatCompletion.choices[0].message.content;

  } catch (error) {
    console.log(error);
    throw error;
  }
};